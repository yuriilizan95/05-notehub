export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping' | string;

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNotePayload {
  title: string;
  content: string;
  tag?: NoteTag;
}

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteFormProps {
  onSubmit?: (values: NewNotePayload) => void;
  onCancel: () => void;
}

export interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}