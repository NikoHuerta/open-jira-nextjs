import { UIState } from './';


type UIActionType = 
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - Set isAddingEntry', payload: boolean }
    | { type: 'UI - Set isDragging' , payload: boolean}


export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch(action.type) {

        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            }
        
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false
            }
        
        case 'UI - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload
            }

        case 'UI - Set isDragging':
            return {
                ...state,
                isDragging: action.payload
            }

        default:
            return state;
    }
}