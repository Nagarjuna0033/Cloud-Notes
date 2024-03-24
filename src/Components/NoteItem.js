import React, { useContext } from "react";
import "../Login.css";
import NotesContext from "../Context/Notes/NotesContext";
export default function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(NotesContext);
    const { deleteNotes } = context;

    const deleteNote = (id) => {
        deleteNotes(id);
    };

    return (
        <>
            <div className="mx-3 note-item">
                <div
                    className="card my-3 mx-3 note-item"
                    style={{ width: "35rem" }}
                >
                    <div className="card-body">
                        <h5 className="card-title">
                            {note.title ? note.title : "Title"}
                        </h5>
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-between">
                            <i
                                className="fa-solid fa-pen-to-square mx-3"
                                onClick={() => {
                                    updateNote(note);
                                }}
                            ></i>
                            <i
                                className="fa-solid fa-trash"
                                onClick={() => {
                                    deleteNote(note._id);
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
