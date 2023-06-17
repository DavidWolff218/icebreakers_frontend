import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./containers/login";
import Home from "./containers/home";
import Room from "./containers/room";
import CreateRoom from "./containers/createRoom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  //go through and condense and cleanup code on next pass

  const [gameStarted, setGameStarted] = useState(false);

  const [roomInfo, setRoomInfo] = useState({
    currentUser: "",
    roomName: "",
    hostID: "",
    hostName: "",
  });

  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };

  const setCreateRoom = (currentUser, roomName, hostID, hostName) => {
    setRoomInfo({
      currentUser: currentUser,
      roomName: roomName,
      hostID: hostID,
      hostName: hostName,
    });
  };

  const setLogin = (currentUser, roomName, hostID, hostName) => {
    setRoomInfo({
      currentUser: currentUser,
      roomName: roomName,
      hostID: hostID,
      hostName: hostName,
    });
  };

  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          render={(routeParams) => {
            return <Home {...routeParams} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={(routeParams) => {
            return <Login setLogin={setLogin} {...routeParams} />;
          }}
        />
        <Route
          exact
          path="/room/:id"
          render={(routeParams) => {
            return (
              <Room
                currentUser={roomInfo.currentUser}
                startGame={startGame}
                endGame={endGame}
                gameStarted={gameStarted}
                hostID={roomInfo.hostID}
                roomName={roomInfo.roomName}
                hostName={roomInfo.hostName}
                {...routeParams}
              />
            );
          }}
        />
        <Route
          exact
          path="/create_room"
          render={(routeParams) => {
            return (
              <CreateRoom setCreateRoom={setCreateRoom} {...routeParams} />
            );
          }}
        />
      </div>
    </Router>
  );
};

export default App;
