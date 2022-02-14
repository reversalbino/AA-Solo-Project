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

export const demoLogin = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST', 
        body: JSON.stringify({
            credential: 'demo',
            password: 'demo12'
        })
    });

    const data = await response.json();
    dispatch(setUser(data.user));

    return response;
}

export const uploadSong = (song) => async () => {
    const { name, url, public_id, picture_url, userId } = song;
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify({
            name,
            url,
            public_id,
            picture_url,
            userId
        })
    });

    const data = await response.json();
    return data.created;
}

export const getSong = (id) => async (dispatch) => {
    let response = await csrfFetch(`/api/songs/${+id}`)
    .then(temp => temp.json()).then(please => {
        response = please
    });

    

    const data = response.song;
    setSong(data)
    window.localStorage.setItem('file', data.file.data);
    return data;
}

export const getAllUserSongs = (userId) => async() => {
    let response = await csrfFetch(`/api/songs/user/${+userId}`);
    let data = await response.json();

    return data;
}

export const getAllSongs = () => async() => {
    
}

export const deleteSong = (songId) => async() => {
    let response = await csrfFetch(`/api/songs/delete/${+songId}`, {
        method: 'DELETE'
    });

    let data = await response.json();

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