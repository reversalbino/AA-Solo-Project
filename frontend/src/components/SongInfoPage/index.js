import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

function SongInfoPage() {
    // const dispatch = useDispatch();
    // const [song, setSong] = useState(undefined);

    

    // async function test() {
    //     const id = 1;
    //     await dispatch(sessionActions.getSong(id)).then(result => {
    //         console.log('RESULT: ', result.file.data);
    //         setSong(result.file.data);
    //     });
    //     setSong(window.localStorage.getItem('data'))
    //     console.log('IN SONG DETAIL PAGE', song);
    // }

    // useEffect(() => {
    //     test();
    // }, []);

    // const blob = new Blob([67, 58, 92, 102, 97, 107, 101, 112, 97, 116, 104, 92, 76, 105, 116, 116, 108, 101, 32, 71, 114, 97, 115, 115, 32, 83, 104, 97, 99, 107, 45, 32, 69, 100, 105, 116, 46, 109, 112, 51], { type: "audio/mp3" });
    // const url = window.URL.createObjectURL(blob);

    // console.log('BLOB: ', blob)
    // console.log('URL: ', url);

    //const song = getSongFunction();

    // console.log(typeof getSongFunction, getSongFunction)

    // console.log(Object.keys(getSongFunction));

    // dispatch(sessionActions.getSong(1)).then(result => {
    //     console.log('RESULT: ', result.file.data);
    //     //setSong(result.file.data);
    // });

    // const song = 

    
    // let song = [67, 58, 92, 102, 97, 107, 101, 112, 97, 116, 104, 92, 76, 105, 116, 116, 108, 101, 32, 71, 114, 97, 115, 115, 32, 83, 104, 97, 99, 107, 45, 32, 69, 100, 105, 116, 46, 109, 112, 51];
    // console.log('SONG', song);







    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Create an empty three-second stereo buffer at the sample rate of the AudioContext
    var myArrayBuffer = audioCtx.createBuffer(2, audioCtx.sampleRate * 3, audioCtx.sampleRate);

    // Fill the buffer with white noise;
    // just random values between -1.0 and 1.0
    for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
        // This gives us the actual array that contains the data
        var nowBuffering = myArrayBuffer.getChannelData(channel);
        for (var i = 0; i < myArrayBuffer.length; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]
            nowBuffering[i] = Math.random() * 2 - 1;
        }
    }

    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer
    var source = audioCtx.createBufferSource();

    // set the buffer in the AudioBufferSourceNode
    source.buffer = myArrayBuffer;

    // connect the AudioBufferSourceNode to the
    // destination so we can hear the sound
    source.connect(audioCtx.destination);

    // start the source playing
    source.start();






    return (
        <>
            <audio controls autoPlay>
                <source src='1' type='/audio/mp3' />
            </audio>
        </>
    );
}

export default SongInfoPage;