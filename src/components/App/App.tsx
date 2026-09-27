import { useState } from 'react';
import Loader from '../Loader/Loader';
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm"
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { keepPreviousData, useQuery } from '@tanstack/react-query';


import css from "./App.module.css"
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../services/noteService';
import type { FetchNotesResponse } from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import { useDebounce } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox';




export default function App() {

  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateNote, setIsCreateNote] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300)

const {
    data,
    isLoading,
    isError,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', { page, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });
  
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
      
        <SearchBox value={search} onSearch={(newSearch) => {
          setSearch(newSearch);
          setPage(1); 
        }} />
		{data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          page={page}
          onPageChange={setPage}
        />
      )}
        {<button
          onClick={() => {
              setIsModalOpen(true);
              setIsCreateNote(true);
        }}
          className={css.button}>Create note +</button>}
      </header>
      
      {isLoading && <Loader/>}
    {isError && <ErrorMessage/>}

    {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>{isCreateNote && <NoteForm onCancel={() => setIsModalOpen(false)}/>}</Modal>
        )}
    {!isError && data?.notes && <NoteList notes={data.notes} />}
</div>
  )
}
