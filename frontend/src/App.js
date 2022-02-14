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
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
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
      <hr/>
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