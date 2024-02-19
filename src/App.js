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
    gameStarted: false,
  });
  console.log("APP GAME STARTED", roomInfo.gameStarted)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const resp = await fetch(`http://localhost:3000/verify_token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data.room) {
              //this can handle both the user and the host, but run into issues if the host has button when refreshes
              setRoomInfo({
                currentUser: data.user,
                roomName: data.room.room_name,
                hostID: data.room.host_id,
                hostName: data.room.host_name,
                gameStarted: data.room.game_started,
              });
            }
          } else {
            console.error("Token is invalid or missing");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyToken();
  }, []);
  
  const setCreateRoom = (
    currentUser,
    roomName,
    hostID,
    hostName,
    gameStarted
  ) => {
    setRoomInfo({
      currentUser: currentUser,
      roomName: roomName,
      hostID: hostID,
      hostName: hostName,
      gameStarted: gameStarted,
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
          render={(routeParams) =>
            roomInfo.currentUser ? (
              <Room
                currentUser={roomInfo.currentUser}
                hostID={roomInfo.hostID}
                roomName={roomInfo.roomName}
                hostName={roomInfo.hostName}
                gameStarted={roomInfo.gameStarted}
                {...routeParams}
              />
            ) : null
          }
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
