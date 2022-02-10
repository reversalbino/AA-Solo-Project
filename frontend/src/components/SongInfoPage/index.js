import React from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

function SongInfoPage() {
    const dispatch = useDispatch();
    // const [song, setSong] = useState(undefined);
    
    // async function test() {
    //     const id = 1;
    //     await setSong(dispatch(sessionActions.getSong(id)()));
    //     setSong(window.localStorage.getItem('data'))
    //     console.log('IN SONG DETAIL PAGE', song);
    // }
    
    // useEffect(() => {
    //     test();  
    // }, []);
    let song;

    dispatch(sessionActions.getSong(1)).then(result => {
        console.log('RESULT: ', result.file.data);
        song = result.file.data;
    });
    //const song = getSongFunction();
    
    // console.log(typeof getSongFunction, getSongFunction)
    
    // console.log(Object.keys(getSongFunction));

    console.log('SONG', song);

    return (
        <>
            <audio controls>
                <source src={song} type='/audio/mp3' />
            </audio>
        </>
    );
}

export default SongInfoPage;