import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../../store/session';
import SingleSongPage from '../SingleSongPage';

import './index.css';

export function changeVolume(e) {
    let audio = document.querySelector('audio');
    audio.volume = e.target.value / 100;
}



function SongInfoPage() {
    const dispatch = useDispatch();
    const [songs, setSongs] = useState([]);

    const userIsLoaded = useSelector((state) => state.session.user);
    const userId = userIsLoaded?.id;

    useEffect(() => {
        if(userIsLoaded) {
            (async () => {
                await dispatch(sessionActions.getAllUserSongs(userId)).then(async result => {
                    setSongs(result.songs);
                });
            }) ()
        };
    }, [dispatch, userId, userIsLoaded]);

    return (
        <>
            {userIsLoaded && 
                <>
                    < div id = "volume-slider" >
                        <i className="fa fa-volume-down"></i>
                            <input type='range' onChange={e => changeVolume(e)}id='colume-control'></input>
                        <i className="fa fa-volume-up"></i>
                    </div >
                    <div className='songs'>
                        {songs.map(song => {
                            return (
                                <SingleSongPage userSong={song} key={song.id}/>
                            )
                        })}
                    </div>
                </>
            }
            {!userIsLoaded && 
                <h1>Please Log In To See Your Songs</h1>
            }
        </>
    );
}

export default SongInfoPage;