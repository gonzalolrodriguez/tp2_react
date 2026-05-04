import React, { useReducer } from 'react';

// Estado inicial y reducer deben importarse desde el archivo de utilidades si se usan fuera
import { GlobalContext } from './GlobalContextContext';

// Provider
export function GlobalProvider({ children }) {
    // Reducer y estado inicial definidos aquí para mantener el provider funcional
    const initialState = { items: [] };
    function globalReducer(state, action) {
        switch (action.type) {
            case 'ADD_ITEM':
                if (action.payload === null) return { ...state, items: [] };
                return { ...state, items: [...state.items, action.payload] };
            case 'SET_ALL':
                return { ...state, items: action.payload };
            case 'EDIT_ITEM':
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, ...action.payload } : item
                    )
                };
            case 'DELETE_ITEM':
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload)
                };
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}
