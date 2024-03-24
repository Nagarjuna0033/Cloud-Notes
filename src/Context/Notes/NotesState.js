import { useContext, useState } from "react";
import NotesContext from "./NotesContext";

import UserContext from "../User/UserContext";
const NotesState = (props) => {
    const getNoteApi = process.env.REACT_APP_GET_NOTES;
    const addNoteApi = process.env.REACT_APP_ADD_NOTES;

    const alertContext = useContext(UserContext);
    const { changeAlert } = alertContext;
    const notesInit = [];

    const host = "http://localhost:5000";

    const [notes, setNotes] = useState(notesInit);
    const [isUpdate, setUpdate] = useState(false);
    const [isLoad, setLoad] = useState(false);

    const changeUpdate = (flag) => {
        setUpdate(flag);
    };

    const getNotes = async () => {
        try {
            const response = await fetch(getNoteApi, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authToken: localStorage.getItem("token"),
                },
            });
            const res = await response.json();

            setNotes(res);
            setLoad(true);
        } catch (error) {
            console.log(error);
        }
    };

    // function to add note

    const addNote = async (title, description) => {
        try {
            const response = await fetch(addNoteApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authToken: localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description }),
            });
            const res = await response.json();

            setNotes(notes.concat(res));
            changeAlert({
                alertType: "success",
                alertMsg: "Notes Added",
            });
        } catch (error) {
            changeAlert({
                alertType: "danger",
                alertMsg: "Problem Occured",
            });
        }
    };

    const deleteNotes = async (id) => {
        const url = `${host}/notes/delete/${id}`;
        try {
            // eslint-diable-next-line
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",

                    authToken: localStorage.getItem("token"),
                },
            });

            const newNotes = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(newNotes);
            changeAlert({
                alertType: "success",
                alertMsg: "Deleted Notes",
            });
        } catch (error) {
            changeAlert({
                alertType: "danger",
                alertMsg: "Problem Occured",
            });
        }
    };

    const editNotes = async (id, title, description) => {
        const url = `${host}/notes/edit/${id}`;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",

                    authToken: localStorage.getItem("token"),
                },
                body: JSON.stringify({ title, description }),
            });
            setUpdate(false);
            // eslint-diable-next-line
            const res = await response.json();

            let tempNote = JSON.parse(JSON.stringify(notes));

            // let tempNote = notes;

            for (let index = 0; index < tempNote.length; index++) {
                if (tempNote[index]._id === id) {
                    tempNote[index]._id = id;
                    tempNote[index].title = title;
                    tempNote[index].description = description;
                    break;
                }
            }

            setNotes(tempNote);
            changeAlert({
                alertType: "success",
                alertMsg: "Updated Notes",
            });
        } catch (error) {
            changeAlert({
                alertType: "danger",
                alertMsg: "Problem occured",
            });
        }
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                addNote,
                deleteNotes,
                getNotes,
                isUpdate,
                changeUpdate,
                isLoad,
                editNotes,
            }}
        >
            {props.children}
        </NotesContext.Provider>
    );
};

export default NotesState;
