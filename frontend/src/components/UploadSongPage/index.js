import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";

import * as sessionActions from '../../store/session'

import './index.css';

function UploadSongPage() {
    let file = undefined;
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    // const [file, setFile] = useState(undefined);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors([]);
        return dispatch(sessionActions.uploadSong({ name, file }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                File
                <input
                    type="file"
                    value={file}
                    onChange={(e) => file = e.target.value}
                    required
                />
            </label>
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadSongPage