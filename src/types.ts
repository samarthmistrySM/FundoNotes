export interface BaseNote {
  id: string;
  title: string;
}

export interface TextNote extends BaseNote {
  type: 'note';
  description: string;
}

export interface DrawNote extends BaseNote {
  type: 'draw';
  image: string;
  path: any[];
}

export interface ListNote extends BaseNote {
  type: 'list';
  items: {
    id: number;
    text: string;
    checked: boolean;
  }[];
}

export interface ImageNote extends BaseNote {
  type: 'image';
  image: string;
  description: string;
}

export interface Reminder extends  BaseNote{
  description: string;
  type: 'reminder';
  reminder: string;
}

export interface LabelNote extends BaseNote {
  type: 'label';
  title: string;
  note: Note;
  label: string;
}

export type Note = TextNote | ListNote | DrawNote | ImageNote | Reminder | LabelNote;

export interface Label {
  id: string;
  name: string;
  notes: string[];
}
