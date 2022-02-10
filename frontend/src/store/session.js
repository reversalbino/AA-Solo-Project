// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_SONG = 'session/setSong';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

const setSong = () => {
    return {
        type: SET_SONG
    }
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async(dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    dispatch(removeUser());

    return response;
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const uploadSong = (song) => async () => {
    const { name, file } = song;
    console.log(file)
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify({
            name,
            file
        })
    });

    const data = await response.json();
    return data;
}

export const getSong = (id) => async (dispatch) => {
    console.log('SONG ID: ', id);
    let response = null;
    try {
        await fetch(`/api/songs/${+id}`)
        .then(temp => temp.json()).then(please => {
            response = please
        });
        console.log("============RIGHT AFTER RESPONSE==============")
    } catch(e) {
        console.log('COULD NOT EVEN START LOOKING');
    }

    console.log('=============GOT THE SONG==============', response.song.name);
    

    const data = response.song;
    console.log('=============SONG DATA============', data)
    setSong(data)
    window.localStorage.setItem('file', data.file.data);
    return data;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        case SET_SONG:
            newState = Object.assign({}, state);
            newState.song = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;