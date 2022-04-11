import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from '.';
import { types } from '../../types';

export interface UIState {
   sideMenuOpen: boolean;
}

interface Prop {
    children: ReactNode;
}

const UI_INITIAL_STATE: UIState = {
   sideMenuOpen: false,
}


export const UIProvider:FC<Prop> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => { 
        dispatch({ type: types.openSidebar });
    };
    
    const closeSideMenu = () => {
        dispatch({ type: types.closeSidebar });
    };

   return (
    <UIContext.Provider value={{
        ...state,

        //Methods
        openSideMenu,
        closeSideMenu,
    }}>
        { children }
    </UIContext.Provider>
   )
}
