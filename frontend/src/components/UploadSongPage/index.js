import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { useHistory } from "react-router-dom";

import * as sessionActions from '../../store/session'

import './index.css';

function UploadSongPage() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [pictureURL, setPictureURL] = useState('');
    const [file, setFile] = useState(undefined);
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const userIsLoaded = useSelector((state) => state.session.user);
    const userId = userIsLoaded?.id;
    console.log(userId);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(file);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'd17vu1ba')

        fetch('https://api.cloudinary.com/v1_1/reversealbino/video/upload',{
            method:'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const newSong = {
                name,
                url: data.secure_url,
                public_id: data.public_id,
                picture_url: pictureURL,
                userId
            }

            setErrors([]);
            return dispatch(sessionActions.uploadSong(newSong))
            .then(response => {
                if(response) {
                    history.push('/songs');
                }
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        });
        

        
    };

    return (
        <>
            {userIsLoaded &&  
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
                        Picture
                        <input
                            type="text"
                            value={pictureURL}
                            onChange={(e) => setPictureURL(e.target.value)}
                        />
                    </label>
                    <label>
                        File
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                    </label>
                    <button type="submit">Upload</button>
                </form>} 
            {!userIsLoaded && <p>PLEASE LOG IN TO PERFORM THIS ACTION</p>}
        </>
    );
}

export default UploadSongPage