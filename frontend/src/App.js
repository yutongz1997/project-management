import {useEffect, useState} from "react";
import NavigationBar from "./components/NavigationBar";

import './App.css';


function App() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        (async () => {
            await fetch('/api/users/1?name=Todd')
                .then(res => res.json())
                .then(data => setUserData(data))
                .catch(err => console.log(err));
        })();
    }, []);

    return (
        <div>
            <NavigationBar />
            <h1>Hello React app!</h1>
            <p>#1 User - Name: {userData.name}, Email: {userData.email}, Date of Birth: {userData.birth}</p>
        </div>
    );
}

export default App;
