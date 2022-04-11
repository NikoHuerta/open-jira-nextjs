import { types } from '../../types';
import { UIState } from './';

interface actions {
    type: string;
    payload?: object;
}

export const uiReducer = (state: UIState, action: actions): UIState => {

    switch(action.type) {
        case types.openSidebar:
            return {
                ...state,
                sideMenuOpen: true
            }
        
        case types.closeSidebar:
            return {
                ...state,
                sideMenuOpen: false
            }

        default:
            return state;
    }
}