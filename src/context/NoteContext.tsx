import { createContext } from 'react';
import {Label, Note, Reminder} from '../types';

export interface NoteContextType {
    notes: Note[];
    binNotes: Note[];
    archivedNotes: Note[];
    reminderNotes: Reminder[];
    labels: Label[];
    handleAddNote: (note: Note) => void;
    handleUpdateNote: (note: Note) => void;
    handleAddLabels: (name: string) => void;
    handleEmptyBin: () => void;
    handleDeleteNotes: (ids: string[]) => void;
    handleArchiveNotes: (ids: string[]) => void;
    handleAddNoteToLabel: (note: Note, labelId: string) => void;
    handleDeleteLabels: (labelId : string) => void;
}

const defaultValue: NoteContextType = {
    notes: [],
    binNotes: [],
    archivedNotes: [],
    reminderNotes: [],
    labels: [],
    handleAddNote: () => {},
    handleUpdateNote: () => {},
    handleAddLabels: () => {},
    handleEmptyBin: () => {},
    handleDeleteNotes: () => {},
    handleArchiveNotes: () => {},
    handleAddNoteToLabel: () => {},
    handleDeleteLabels: () => {},
};

const NoteContext = createContext<NoteContextType>(defaultValue);

export default NoteContext;
