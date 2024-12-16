import { Button, Col, Form, Modal, Row, Stack, FormControl } from 'react-bootstrap';
import { Tag } from './App';

interface EditTagsModalProps {
    show: boolean;
    availableTags: Tag[];
    handleClose: () => void;
    onDeleteTag: (id: string) => void;
    onUpdateTag: (id: string, label: string) => void
}

const EditTagsModal = ({ availableTags, handleClose, show, onUpdateTag, onDeleteTag }: EditTagsModalProps) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <FormControl
                                        type='text'
                                        value={tag.label}
                                        onChange={e => onUpdateTag(tag.id, e.target.value)}
                                    />
                                </Col>
                                <Col xs={"auto"}>
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => onDeleteTag(tag.id)}
                                    >
                                        &times;
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditTagsModal