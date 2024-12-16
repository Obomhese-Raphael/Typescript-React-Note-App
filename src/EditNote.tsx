import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"
import UseNote from "./UseNote"

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void,
    onAddTag: (tag: Tag) => void,
    availableTags: Tag[],
}

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
    const note = UseNote();
    return (
        <div>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onSubmit={data => onSubmit(note.id, data)}
                onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </div>
    )
}

export default EditNote