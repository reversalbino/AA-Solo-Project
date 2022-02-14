import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UploadSongPage from "./components/UploadSongPage";
import SongInfoPage from './components/SongInfoPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.getAllSongs()).then(() => setIsLoaded(true));

    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <div>
              <video id="background-video" autoPlay loop muted>
                <source src='https://res.cloudinary.com/reversealbino/video/upload/v1644841749/video/upload/background_video_hiz3fa.mp4' type="video/mp4" />
              </video>
              <div id='homepage-text'>
                <h2>"Fortune favors the bold" -Aristotle</h2>
                <h1>BE BOLD.</h1>
              </div>
              <hr id='separator'/>
              <div id='intro'>
                <h3>Your shower has heard you sing enough. It's the world's turn</h3>
                <button id='get-started'><a href='/signup'>Get Started</a></button>
              </div>
            </div>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs/upload">
            <UploadSongPage />
          </Route>
          <Route path="/songs">
            <SongInfoPage />
          </Route>
        </Switch>
      )}
      <div id='homepage'>
        <div id='top-and-bottom'>
          <div id='top'>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;