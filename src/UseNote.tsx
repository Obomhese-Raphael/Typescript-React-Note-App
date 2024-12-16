import { useOutletContext } from "react-router-dom"
import { Note } from "./App"

const UseNote = () => {
    return (
        useOutletContext<Note>()
    )
}

export default UseNote