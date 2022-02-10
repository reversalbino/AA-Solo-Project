import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

function SongInfoPage() {
    const dispatch = useDispatch();
    const [song, setSong] = useState(undefined);
    
    async function test() {
        const id = 1;
        await setSong(dispatch(sessionActions.getSong(id)));
        setSong(window.localStorage.getItem('data'))
        console.log('IN SONG DETAIL PAGE', song);
    }
    
    useEffect(() => {
       
        test();
        
    }, [])

    return (
        <>
            <audio controls>
                <source src={song} type='/audio/mp3' />
            </audio>
        </>
    )
}

export default SongInfoPage;