import {Label, Note} from '../types.ts';

export type StackParamList = {
  Main: undefined;
  NewNote: {type: string; labelName: string | null};
  UpdateNote: {note: Note; labelName: string | null; pNote: Note | null};
  Setting: undefined;
  Feedback: undefined;
  Help: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Reminders: undefined;
  CreateLabel: undefined;
  Archive: undefined;
  Bin: undefined;
  NotesByLabel: {label: Label};
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
