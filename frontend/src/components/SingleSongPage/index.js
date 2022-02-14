import React from 'react';
//import { play, deleteSong } from '../SongInfoPage';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import './styles.css';

function SingleSongPage(userSong) {
    let song = userSong.userSong;
    const dispatch = useDispatch();

    function play(e) {
        let play = e.target.innerText === '▶';
        let song = document.getElementById(`song-${e.target.id}`);
        e.target.innerText = play ? '❚❚' : '▶';
        //e.target.play();
        play ? song.play() : song.pause();
    }

    async function deleteSong(e) {
        let songId = e.target.id;

        await dispatch(sessionActions.deleteSong(songId));
    }

    return (
        <div id='individual-song' key={song?.id}>
            <p className='song-info'>{song.name}</p>
            {song.picture_url && <div className='song-image-holder' style={{backgroundImage: `url('${song.picture_url}')`, backgroundSize: 'cover'}}></div>}
            {!song.picture_url && <div className='song-image-holder' style={{ backgroundImage: `url('https://images.prismic.io/milanote/f98c1fa182f20a22c8889b93c6ab72a17ff59d0d_thumbnail.jpg?auto=compress,format')`, backgroundSize: 'cover'}}></div>}
                {/* <img src={song.picture_url || 'https://images.prismic.io/milanote/f98c1fa182f20a22c8889b93c6ab72a17ff59d0d_thumbnail.jpg?auto=compress,format'} className='song-image' alt='album-logo' /> */}
            {/* </div> */}
            <audio id={`song-${song.id}`} preload='auto'>
                <source src={song.url} />
                No audio
            </audio>
            <div className='buttons'>
                <button className='delete-button' id={song.id} onClick={e => deleteSong(e)}>Delete</button>
                <button className='play-button' id={song.id} onClick={e => play(e)}>&#9654;</button>
            </div>

        </div>
    )
}

export default SingleSongPage;