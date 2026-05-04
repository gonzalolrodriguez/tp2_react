import { useContext } from 'react';
import { GlobalContext } from './GlobalContextContext';

// Custom hook para usar el contexto
export function useGlobalContext() {
    return useContext(GlobalContext);
}

// Exportar acciones
export const actions = {
    ADD_ITEM: 'ADD_ITEM',
    EDIT_ITEM: 'EDIT_ITEM',
    DELETE_ITEM: 'DELETE_ITEM'
};
