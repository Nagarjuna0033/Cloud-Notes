import notesContext from "../Context/Notes/NotesContext";
import React, { useContext, useRef, useState } from "react";

import NoteItem from "./NoteItem";

export default function Note() {
    const context = useContext(notesContext);
    const [note, setNote] = useState({ id: "", title: "", description: "" });

    const { notes, editNotes } = context;

    const editRef = useRef(null);
    const close = useRef(null);
    const eDesc = useRef(null);

    const showEdit = (note) => {
        editRef.current.click();
        setNote({
            id: note._id,
            title: note.title,
            description: note.description,
        });
    };

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const updateNote = () => {
        if (note.description === "") {
            eDesc.current.focus();
            eDesc.current.style.borderBottom = "1px solid red";
        } else {
            eDesc.current.style.borderBottom = "1px solid grey";
            editNotes(note.id, note.title, note.description);
            close.current.click();
        }
    };

    return (
        <>
            <button
                // ref={editRef}
                type="button"
                ref={editRef}
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ display: "none" }}
            >
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-dialog">
                        <div className="modal-content   modal-display">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Update Notes
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <div className="input-group has-validation">
                                            <div className="form-floating">
                                                <input
                                                    style={{
                                                        border: "none",
                                                        borderBottom:
                                                            "1px solid white",
                                                        borderRadius: "0px",
                                                    }}
                                                    placeholder="Title"
                                                    type="text"
                                                    className="form-control no-border"
                                                    id="title"
                                                    name="title"
                                                    value={note.title}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="title">
                                                    Title
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group has-validation">
                                            <div className="form-floating">
                                                <textarea
                                                    style={{
                                                        border: "none",
                                                        borderBottom:
                                                            "1px solid white",
                                                        borderRadius: "0px",
                                                    }}
                                                    ref={eDesc}
                                                    placeholder="Note"
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    className="form-control no-border"
                                                    rows={7}
                                                    cols={50}
                                                    value={note.description}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="description">
                                                    Note
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    ref={close}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={updateNote}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Update Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {notes.map((notes) => {
                    return (
                        <NoteItem
                            updateNote={showEdit}
                            key={notes._id}
                            note={notes}
                        />
                    );
                })}
            </div>
        </>
    );
}
