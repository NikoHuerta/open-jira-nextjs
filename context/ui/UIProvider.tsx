import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from '.';
import { types } from '../../types';

export interface UIState {
   sideMenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;
}

interface Prop {
    children: ReactNode;
}

const UI_INITIAL_STATE: UIState = {
   sideMenuOpen: false,
   isAddingEntry: false,
   isDragging: false
}


export const UIProvider:FC<Prop> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => { 
        dispatch({ type: 'UI - Open Sidebar' });
    };
    
    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' });
    };

    const setIsAddingEntry = (isAdding: boolean) => {
        dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });
    };

    const setIsDragging = (isDragging: boolean) => {
        dispatch({ type: 'UI - Set isDragging', payload: isDragging });
    }


   return (
    <UIContext.Provider value={{
        ...state,

        //Methods
        openSideMenu,
        closeSideMenu,
        
        setIsAddingEntry,

        setIsDragging,
    }}>
        { children }
    </UIContext.Provider>
   )
}
