import { FC, ReactNode, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from '.';
import { Entry } from '../../interfaces';

export interface EntriesState {
   entries: Entry[];
}

interface Prop {
   children: ReactNode;
}

const ENTRIES_INITIAL_STATE: EntriesState = {
   entries: [
      {
       _id: uuidv4(),
       description: 'Pendiente: Et sit elit aliquip nisi reprehenderit minim.',
       status: 'pending',
       createdAt: Date.now(),
      }, {
       _id: uuidv4(),
       description: 'En Progreso: Fugiat duis cillum consequat proident.',
       status: 'in-progress',
       createdAt: Date.now() - 1000000,
      }, {
        _id: uuidv4(),
        description: 'Terminado: Sunt proident anim id et veniam excepteur irure eu ea.',
        status: 'finished',
        createdAt: Date.now() - 100000,
      }
    ],
}


export const EntriesProvider:FC<Prop> = ({ children }) => {

   const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

   return (
   <EntriesContext.Provider value={{
       ...state
   }}>
       { children }
   </EntriesContext.Provider>
   )
}