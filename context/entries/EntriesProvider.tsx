import { FC, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EntriesContext, entriesReducer } from './';

import { Entry } from '../../interfaces';
import { NewEntry } from '../../components/ui/NewEntry';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {

            _id: uuidv4(),
            description: 'Pendiente: Hisdiia jjsdjsh UDI askdyen',
            status: 'pending',
            createdAt: Date.now()
                 
        },
        {

            _id: uuidv4(),
            description: 'En Progreso: Hisdiia jjsdjsh UDI askdyen',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
                 
        },
        {

            _id: uuidv4(),
            description: 'Terminadas: Hisdiia jjsdjsh UDI askdyen',
            status: 'finished',
            createdAt: Date.now() - 100000,
                 
        },


    ],
}


export const EntriesProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    

    const addNewEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({type: '[Entry] AddEntry' , payload: newEntry})
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] Entry-Updated', payload : entry })
    }




    return (
        <EntriesContext.Provider value={{
            ...state,

            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};