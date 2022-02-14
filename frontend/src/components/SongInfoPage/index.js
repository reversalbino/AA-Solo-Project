import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../../store/session';

import './index.css';

function SongInfoPage() {
    const dispatch = useDispatch();
    const [songs, setSongs] = useState([]);

    const userIsLoaded = useSelector((state) => state.session.user);
    const userId = userIsLoaded?.id;

    // async function getAllSongs() {
    //     await dispatch(sessionActions.getAllUserSongs(userId)).then(result => {
    //         setSongs(result.songs)
    //     });
    // }

    useEffect(() => {
        //getAllSongs();

        (async () => {
            await dispatch(sessionActions.getAllUserSongs(userId)).then(result => {
                setSongs(result.songs);   
            });
        }) ();
    }, [dispatch, userId]);

    function play(e) {
        let play = e.target.innerText === '▶';
        let song = document.getElementById(`song-${e.target.id}`);
        e.target.innerText = play ? '❚❚' : '▶';
        //e.target.play();
        play ? song.play() : song.pause();
    }

    function mute(e) {
        // let audio = e.target.parentNode.children[1];
        let audio = document.querySelector('audio');
        audio.volume = e.target.value / 100;
        // let volume = document.querySelector("#volume-control");
        // console.log(volume);

        // volume.addEventListener("change", function (e) {
        //     audio.volume = e.currentTarget.value / 100;
        // })
    }

    async function deleteSong(e) {
        let songId = e.target.id;

        await dispatch(sessionActions.deleteSong(songId)).then(result => {
            console.log('RESULT: ', result);
        });
    }

   

    return (
        <>
            <input type="range" step='5' value='50' id="volume-control" onChange={e => mute(e)}></input>
            <div className='songs'>
                {songs.map(song => {
                    return (
                        <div className='individual-song' key={song?.id}>
                            <p className='song-info'>{song.name}<br />BY<br />{song.User.username}</p>

                            {/* <ReactAudioPlayer
                                className='audioplayer'
                                src={song?.url}
                                controls
                                
                                volume={0.5}
                            /> */}
                            <img src={song.picture_url || 'https://images.prismic.io/milanote/f98c1fa182f20a22c8889b93c6ab72a17ff59d0d_thumbnail.jpg?auto=compress,format'} alt='album-logo' className='song-image'/>
                            <audio id={`song-${song.id}`} preload='auto'>
                                <source src={song.url}/>
                                No audio
                            </audio> 
                            <button className='play-button' id={song.id} onClick={e => play(e)}>&#9654;</button>
                            {/* <button className='play-button' id={song.id} onClick={e => mute(e)}></button> */}
                            <button className='delete-button' id={song.id} onClick={e => deleteSong(e)}>Delete</button>
                            {/* <button className='play-button' id={song.id} onClick={e => skip(e)}>Skip</button>
                            <div className="hp_slide">
                                <div className="hp_range"></div>
                            </div> */}

                        </div>
                )
            })}
            </div>
        </>
    );
}

export default SongInfoPage;