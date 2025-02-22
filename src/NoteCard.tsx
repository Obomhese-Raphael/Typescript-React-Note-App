import { Badge, Card, CardBody, Stack } from "react-bootstrap";
import { Tag } from './App';
import styles from "./NoteCard.module.css"
import { Link } from "react-router-dom";

interface SimplifiedNote {
    tags: Tag[];
    title: string;
    id: string;
}
const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <CardBody>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-7">{title}</span>
                    {
                        tags.length > 0 && (
                            <Stack
                                direction="horizontal"
                                className="justify-content-center flex-wrap gap-2">
                                {
                                    tags.map(tag => (
                                        <Badge key={tag.id} className="text-truncate">
                                            {tag.label}
                                        </Badge>
                                    ))
                                }
                            </Stack>
                        )
                    }
                </Stack>
            </CardBody>
        </Card>
    )
}

export default NoteCard