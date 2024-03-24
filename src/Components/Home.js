import React, { useContext, useState, useEffect, useRef } from "react";
import Note from "./Note.js";
import NotesContext from "../Context/Notes/NotesContext.js";
import Spinner from "./Spinner.js";
import Error from "./Error.js";
import { useNavigate } from "react-router-dom";
import "../Login.css";

export default function Home() {
    const navigate = useNavigate();
    const notesContext = useContext(NotesContext);
    const { notes, addNote, getNotes, isLoad } = notesContext;

    const [note, setNote] = useState({ title: "", description: "" });

    const descInput = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const addNotes = (e) => {
        e.preventDefault();
        if (note.description === "") {
            descInput.current.focus();
            descInput.current.style.borderBottom = "1px solid red";
        } else {
            addNote(note.title, note.description);
            setNote({ title: "", description: "" });
            descInput.current.style.borderBottom = "1px solid grey";
        }
    };

    return (
        <>
            <div className="d-flex justify-content-evenly col">
                <div
                    className="text-center note-form my-3"
                    style={{ width: 150 + "vh" }}
                >
                    <h3>Add your notes</h3>
                    <form className="form-floating">
                        <div className="mb-3">
                            <div className="input-group has-validation">
                                <div className="form-floating">
                                    <input
                                        style={{
                                            border: "none",
                                            borderBottom: "1px solid white",
                                            borderRadius: "0px",
                                            backgroundColor: "#f2f2f2",
                                        }}
                                        placeholder="Title"
                                        type="text"
                                        className="form-control no-border"
                                        id="title"
                                        name="title"
                                        value={note.title}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="title">Title</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="input-group has-validation">
                                <div className="form-floating">
                                    <textarea
                                        style={{
                                            border: "none",
                                            borderBottom: "1px solid white",
                                            borderRadius: "0px",
                                        }}
                                        placeholder="Note"
                                        ref={descInput}
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="form-control no-border"
                                        rows={7}
                                        cols={50}
                                        value={note.description}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="description"
                                        className="desc"
                                    >
                                        Note
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={addNotes}>
                            Save
                        </button>
                    </form>
                </div>
                <div
                    className="d-flex flex-column note-display my-3 "
                    style={{ width: 190 + "vh" }}
                >
                    <div className="text-center my-3">
                        <h3>Your Notes</h3>
                    </div>
                    {isLoad ? (
                        !(Object.keys(notes).length === 0) ? (
                            <Note />
                        ) : (
                            <Error
                                errName="Notes not found"
                                errDesc="Add notes to display"
                            />
                        )
                    ) : (
                        <Spinner />
                    )}
                </div>
            </div>
        </>
    );
}
