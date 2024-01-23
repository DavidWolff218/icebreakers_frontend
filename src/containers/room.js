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
    const fetchUsers = async () => {
      try {
        const roomId = props.match.params.id;
        const resp = await fetch(
          `http://localhost:3000/users/by_room/${roomId}`
        );
        const data = await resp.json();
        setGameRound({
          allUsers: data.allUsers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const endGame = () => {
    setGameStarted(false);
  };

  const handleReceived = (resp) => {
    if (gameStarted) {
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
      return;
    } else if (!resp.room.game_started) {
      //used for updating lobby of users as new ones come in
      setGameRound({
        allUsers: resp.allUsers,
      });
      return;
    } else if (resp.room.game_started) {
      //runs after host starts game
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
      //use this to trigger rerender of room text from waiting room to game
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
    if (
      props.currentUser.id === props.hostID ||
      props.currentUser.username === gameRound.currentPlayer
    ) {
      return (
        <button className="MainBtn" onClick={handleNextClick}>
          <h3 className="mainBtnText">NEXT QUESTION</h3>
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
      <div>
        {/* moved allUsers component to inside here, before was in a conditional in return. does mess with css, need to fix */}
        <AllUsers windowText={"Players"} users={gameRound.allUsers} />
        <br></br>
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
      </div>
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
