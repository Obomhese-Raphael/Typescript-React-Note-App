import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import UseNote from './UseNote'
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from "react-markdown"

interface NoteProps {
    onDelete: (id: string) => void
}
const Note = ({ onDelete }: NoteProps) => {
    const navigate = useNavigate()
    const note = UseNote()
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            direction="horizontal"
                            className="flex-wrap gap-2">
                            {
                                note.tags.map(tag => (
                                    <Badge key={tag.id} className="text-truncate flex-auto flex space-x-4">
                                        {tag.label}
                                    </Badge>
                                ))
                            }

                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                onDelete(note.id)
                                navigate("..")
                            }}
                        >Delete</Button>
                        <Link to="/">
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </>
    )
}

export default Note