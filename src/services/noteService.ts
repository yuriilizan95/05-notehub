import axios, { type AxiosResponse } from 'axios';
import type { 
  Note, 
  NewNotePayload, 
  FetchNotesParams, 
  FetchNotesResponse 
} from '../types/note';

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN


const apiClient = axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
        Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        accept: 'application/json',
    },
});

export const fetchNotes = async (
  params?: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await apiClient.get('/notes', {
    params: {
      page: params?.page ?? 1,
      search: params?.search || undefined,
      perPage: params?.perPage ?? 10,
    },
  });
  return response.data;
};

/**
 * Створення нової нотатки
 */
export const createNote = async (
  noteData: NewNotePayload
): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.post('/notes', noteData);
  return response.data;
};

/**
 * Видалення нотатки за її ID
 */
export const deleteNote = async (
  id: string
): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.delete(`/notes/${id}`);
  return response.data;
};