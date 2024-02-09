import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./containers/login";
import Home from "./containers/home";
import Room from "./containers/room";
import CreateRoom from "./containers/createRoom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  const [roomInfo, setRoomInfo] = useState({
    currentUser: "",
    roomName: "",
    hostID: "",
    hostName: "",
    gameStarted: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // Send token to backend for verification
      fetch(`http://localhost:3000/verify_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
    //   .then(response => {
    //     if (response.ok) {
    //       // Token is valid
    //       console.log("Token is valid");
    //       // Perform any necessary actions, such as fetching user or room data
    //     } else {
    //       // Token is invalid or missing
    //       console.error("Token is invalid or missing");
    //       // Handle error or redirect user to login page
    //     }
    //   })
    //   .catch(error => {
    //     console.error("Error verifying token:", error);
    //     // Handle error
    //   });
    } 
  }, []);
  console.log("currentuser", roomInfo.currentUser)

  const setCreateRoom = (currentUser, roomName, hostID, hostName, gameStarted) => {
    setRoomInfo({
      currentUser: currentUser,
      roomName: roomName,
      hostID: hostID,
      hostName: hostName,
      gameStarted: gameStarted
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
            return <Login setCreateRoom={setCreateRoom} {...routeParams} />;
          }}
        />
        <Route
          exact
          path="/room/:id"
          render={(routeParams) => {
            return (
              <Room
                currentUser={roomInfo.currentUser}
                hostID={roomInfo.hostID}
                roomName={roomInfo.roomName}
                hostName={roomInfo.hostName}
                gameStartedWaiting={roomInfo.gameStarted}
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
