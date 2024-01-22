import React, { useState, useEffect } from "react";
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import AllUsers from "../components/allUsers";
import GameText from "../components/gameText";
import NavBar from "../components/navBar";
import { Row, Col } from "react-bootstrap";
import WaitingRoom from "../components/waitingRoom";

const Room = (props) => {


  const [gameStarted, setGameStarted] = useState(false);

  const [gameRound, setGameRound] = useState({
    currentPlayer: "",
    currentQuestion: {},
    votingQuestionA: "",
    votingQuestionB: "",
    reshufflingUsers: false,
    reshufflingQuestions: false,
    allUsers: [],
    //   timerRunning: false,
    //   timerSeconds: 5,
    //   timerIntervalID: "",
    // ^^ to be used for voting feature
  });

  useEffect(() => {
    const roomId = props.match.params.id;
    fetch(`http://localhost:3000/users/by_room/${roomId}`)
    .then(resp => resp.json())
    .then(resp => setGameRound({
      allUsers: resp.allUsers
    }))
  }, [])

 


 
  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };


  const handleReceived = (resp) => {

    if (gameStarted){
      setGameRound({
        currentPlayer: resp.currentPlayer.username,
        currentQuestion: resp.currentQuestion,
        votingQuestionA: resp.votingQuestionA,
        votingQuestionB: resp.votingQuestionB,
        reshufflingUsers: resp.reshufflingUsers,
        reshufflingQuestions: resp.reshufflingQuestions,
        allUsers: resp.allUsers,
        // add voting timer stuff here 
      });
      return
    }
    // console.log("resp", resp)
    else if (!resp.room.game_started) {
      console.log("1", resp)
      setGameRound({
        allUsers: resp.allUsers
      })
      return
    }
    //can recieve from backend the users when a new one is made for lobby. problem in logic as game shouldnt start. need to rework
     else if (resp.room.game_started) {
      console.log("2")
      
      // ^^ need to investigate this further and what triggers start of game and why
      setGameRound({
        currentPlayer: resp.currentPlayer.username,
        currentQuestion: resp.currentQuestion,
        votingQuestionA: resp.votingQuestionA,
        votingQuestionB: resp.votingQuestionB,
        reshufflingUsers: resp.reshufflingUsers,
        reshufflingQuestions: resp.reshufflingQuestions,
        allUsers: resp.allUsers,
        // add voting timer stuff here 
      });
      setGameStarted(true);
    }
  };

  const handleNextClick = () => {
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          room: props.match.params.id,
          currentPlayer: gameRound.currentPlayer,
        },
        question: {
          id: gameRound.currentQuestion.id,
        },
      }),
    };
    fetch(`http://localhost:3000/users/select/foo`, reqObj);
  };

  const handleStartClick = () => {
    const reqObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          room: props.match.params.id,
        },
      }),
    };
    fetch(`http://localhost:3000/users/start/foo`, reqObj);
  };

  //  const handleVote = (vote) => {
  //     const reqObj = {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           room: props.match.params.id,
  //           vote_id: vote,
  //           currentPlayer: gameRound.currentPlayer,
  //         },
  //       }),
  //     };
  //     fetch(`http://localhost:3000/users/voting/foo`, reqObj);
  //   };

  const playerButton = () => {
    //use to have this function seperated into two for the host and player. host will always get button
    if (props.currentUser.id === props.hostID) {
      return (
        <button className="MainBtn" onClick={handleNextClick}>
          <h3 className="mainBtnText">NEXT QUESTION</h3>
        </button>
      );
    } else if (props.currentUser.username === gameRound.currentPlayer) {
      return (
        <button className="MainBtn" onClick={handleNextClick}>
          <h3 className="playerBtnText">NEXT QUESTION</h3>
        </button>
      );
    } else {
      return null;
    }
  };

  const logoutBtn = () => {
    let id = props.currentUser.id;
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          id: id,
        },
      }),
    };
    fetch(`http://localhost:3000/users/${id}`, reqObj)
      .then((resp) => resp.json())
      .then((user) => {
        localStorage.removeItem("token");
        props.history.push(`/`);
      });
  };

  const endGameBtn = () => {
    let id = props.match.params.id;
    const reqObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        room: {
          id: id,
        },
      }),
    };
    fetch(`http://localhost:3000/rooms/${id}`, reqObj)
      .then((resp) => resp.json())
      .then((room) => {
        endGame();
        localStorage.removeItem("token");
        props.history.push(`/`);
      });
  };

  const resetUsersAndQuestionsShuffle = () => {
    setGameRound((prev) => ({
      ...prev,
      reshufflingUsers: false,
      reshufflingQuestions: false,
    }));
  };

  const resetUsersShuffle = () => {
    setGameRound((prev) => ({
      ...prev,
      reshufflingUsers: false,
    }));
  };

  const resetQuestionsShuffle = () => {
    setGameRound((prev) => ({
      ...prev,
      reshufflingQuestions: false,
    }));
  };

  const screenText = () => {
    return (
      <GameText
        currentPlayer={gameRound.currentPlayer}
        currentQuestion={gameRound.currentQuestion}
        votingQuestionA={gameRound.votingQuestionA}
        votingQuestionB={gameRound.votingQuestionB}
        reshufflingUsers={gameRound.reshufflingUsers}
        reshufflingQuestions={gameRound.reshufflingQuestions}
        // timerRunning={this.state.timerRunning}
        // timerSeconds={this.state.timerSeconds}
        resetUsersShuffle={resetUsersShuffle}
        resetQuestionsShuffle={resetQuestionsShuffle}
        resetUsersAndQuestionsShuffle={resetUsersAndQuestionsShuffle}
        playerButton={playerButton}
        // handleVote={this.handleVote}
        // resetTimer={this.resetTimer}
        // runTimer={this.runTimer}
      />
    );
  };

  return (
    <div>
      <NavBar
        room={props.roomName}
        logoutBtn={logoutBtn}
        endGameBtn={endGameBtn}
        currentUser={props.currentUser.id}
        host={props.hostID}
        player={props.currentUser.username}
      />

      <br></br>
     
      {/* //for the active game window players, logic now in room since reusing allUsers component in waiting room   */}
     
        {/* moved allusers and waiting room to inside actioncableconsumer...not sure if this has any side effects */}
         {gameStarted ? (
        <AllUsers
          windowText={"Players"}
          users={gameRound.allUsers}
        />
      ) : null}
       <ActionCableConsumer
        channel={{
          channel: "UsersChannel",
          room: props.match.params.id,
        }}
        onReceived={handleReceived}
      >
        <br></br>
        <Col className="align-self-center">
          <Row className="seventy-five-row-seperator" />
          {/* this displays the gameplay text (questions, players, button etc) or the waiting room */}
          {gameStarted ? (
            screenText()
          ) : (
            <WaitingRoom
              hostID={props.hostID}
              hostName={props.hostName}
              currentUserId={props.currentUser.id}
              handleStartClick={handleStartClick}
              users={gameRound.allUsers}
            />
          )}
          <Row className="seventy-five-row-seperator" />
          {/* this ^^^ kept after removing startbutton from here to keep css in order */}
        </Col>
      </ActionCableConsumer>
    </div>
  );
};

export default Room;
