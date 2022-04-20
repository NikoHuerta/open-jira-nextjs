import { FC, ReactNode, useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from '.';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';

export interface EntriesState {
   entries: Entry[];
}

interface Prop {
   children: ReactNode;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [],
}


export const EntriesProvider:FC<Prop> = ({ children }) => {

   const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
   const { enqueueSnackbar } = useSnackbar();

   const addNewEntry = async (description: string) => {
      
      const { data } = await entriesApi.post<Entry>('/entries', { description });
      dispatch({ type: '[Entry] - Add-Entry', payload: data });
   }

   const updateEntry = async ({ _id, description, status }: Entry, showSnackBar = false) => {
      
      try {
         const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description: description, status });
         dispatch({ type: '[Entry] - Update-Entry', payload: data });

         if(showSnackBar) {
            enqueueSnackbar('Entry updated', 
            {  variant: 'success',
               autoHideDuration: 3000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
               }
            });
         }
      } catch (e) {
         console.log({e});
      }
   }

   const removeEntry = async (entry: Entry) => {
         
         try {
            const { data } = await entriesApi.delete(`/entries/${ entry._id }`);
            dispatch({ type: '[Entry] - Remove-Entry', payload: entry });
            enqueueSnackbar('Entry Deleted', 
            {  variant: 'warning',
               autoHideDuration: 3000,
               anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'right',
               }
            });
            
         } catch (e) {
            console.log({e});
         }  
   }

   const refreshEntries = async () => {
      const { data } = await entriesApi.get<Entry[]>('/entries');
      dispatch({ type: '[Entry] - Load-Entries', payload: data });
   }

   useEffect(() => {
     refreshEntries();
   }, []);
   


   return (
   <EntriesContext.Provider value={{
       ...state,

       //Methods
       addNewEntry,
       updateEntry,
       removeEntry,
   }}>
       { children }
   </EntriesContext.Provider>
   )
}