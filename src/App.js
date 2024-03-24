import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NotesState from "./Context/Notes/NotesState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import UserState from "./Context/User/UserState";
import Alert from "./Components/Alert";
// import UserContext from "./Context/User/UserContext";
// import { useContext } from "react";

function App() {
    // const alertContext = useContext(UserContext);
    // const { alertMsg, changeAlert } = alertContext;

    return (
        <>
            <UserState>
                <NotesState>
                    <Navbar />
                    <Alert />
                    <div className="container my-3">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="About" element={<About />} />
                            <Route path="Login" element={<Login />} />
                            <Route path="Signup" element={<Signup />} />
                        </Routes>
                    </div>
                </NotesState>
            </UserState>
        </>
    );
}

export default App;
