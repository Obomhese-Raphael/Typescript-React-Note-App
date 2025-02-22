import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"
import NoteList from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
  id: string
}

export type Tag = {
  id: string
  label: string
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])


  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes: RawNote[]) => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes: NoteData[]) => {
      return prevNotes.map((note: NoteData) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
        } else {
          return note;
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes: NoteData[]) => prevNotes.filter(note => note.id !== id));
  }

  const addTag = (tag: Tag) => {
    // TODO: Implement Adding tags
    setTags((prev: Tag[]) => [...prev, tag])
  };

  const updateTag = (id: string, label: string) => {
    // TODO: Implement updating a tag
    setTags((prev: Tag[]) => {
      return prev.map(tag => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    })
  };

  const deleteTag = (id: string) => {
    // TODO: Implement deleting a tag
    setTags((prev: Tag[]) => {
      return prev.filter(tag => tag.id !== id);
    });
  };

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path="edit"
            element={<EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags} />}
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  )
}

export default App;