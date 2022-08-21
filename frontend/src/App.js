import {useState} from "react";

import './App.css';


function App() {
    const [message, setMessage] = useState('');
    fetch('/api/hello')
        .then(response => response.text())
        .then(data => setMessage(data));
    return (
        <div>
            <h1>Hello React app!</h1>
            <p>From the backend: {message}</p>
        </div>
    );
}

export default App;
