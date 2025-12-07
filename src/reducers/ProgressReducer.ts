import type { ProgressAction,ProgressState } from "../types";

export function ProgressReducer(state:ProgressState,action:ProgressAction):ProgressState{
    switch(action.type){
        case 'COMPLETE-LECTURE':
            if(action.payload === undefined) return state;
            return{
                ...state,
                completed:state.completed.includes(action.payload)
                ? state.completed
                : [...state.completed,action.payload]
            };
            case 'SET-CURRENT-LECTURE':
                return{
                    ...state,
                    currentLecture: action.payload,
                };
        case 'RESET-PROGRESS':
            return{
                completed:[],
                currentLecture: undefined,
            };
        default:
            return state;
    }
}
