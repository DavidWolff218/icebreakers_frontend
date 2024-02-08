import React, { useEffect } from "react";
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import AllUsers from "../components/allUsers";
import GameText from "../components/gameText";
import NavBar from "../components/navBar";
import { Row, Col } from "react-bootstrap";
import WaitingRoom from "../components/waitingRoom";
import useGameState from "../hooks/useGameState";
import EndGameModal from "../modals/endGameModal";

const Room = (props) => {
  // const [gameStarted, setGameStarted] = useState(false);
  // keeping this here for Reference, originally used in useEffect conditional (false),
  // handleReceived(if/true, else/if/false for gameStarted trigger/1st play), waitingText(if/false, elseif/false),
  // and in return statment ternary for screentText or waiting Text

  const {
    gameRound,
    setGameRound,
    handleReceived,
    hostEnd,
    resetUsersAndQuestionsShuffle,
    resetQuestionsShuffle,
    resetUsersShuffle,
  } = useGameState();

  useEffect(() => {
    //here to load inital waiting room of players, only runs if game hasn't officially started
    if (!props.gameStartedWaiting) {
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
    }
  }, []);

  useEffect(() => {
    //this is only for users and not host
    if (hostEnd) {
      setTimeout(() => {
        localStorage.removeItem("token");
        props.history.push(`/`);
      }, 5000);
    }
  }, [hostEnd]);
  //getting a warning from react about not including props.history in the dependency array..ignoring that

  const handleNextClick = async () => {
    try {
      const reqObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            room: props.match.params.id,
            currentPlayerID: gameRound.currentPlayerID,
          },
          question: {
            id: gameRound.currentQuestion.id,
          },
        }),
      };
      const resp = await fetch(
        `http://localhost:3000/users/select/foo`,
        reqObj
      );
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleStartClick = async () => {
    try {
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
      const resp = await fetch(`http://localhost:3000/users/start/foo`, reqObj);
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    //props.currentUser is to track the individual user on their device, gameRound tracks whose turn it is
    if (
      props.currentUser.id === props.hostID ||
      props.currentUser.id === gameRound.currentPlayerID
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

  const logoutBtn = async () => {
    let id = props.currentUser.id;
    if (gameRound.currentPlayerID === id) {
      handleNextClick();
      // also worked with await here, but with that it keeps the player name in the lobby till the following turn. having both execute back to back makes it look all at once
    }
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
    try {
      await fetch(`http://localhost:3000/users/${id}`, reqObj);
      localStorage.removeItem("token");
      props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const endGameBtn = async () => {
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
    await fetch(`http://localhost:3000/rooms/${id}`, reqObj);
    try {
      localStorage.removeItem("token");
      props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
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

  const waitingText = () => {
    if (!props.gameStartedWaiting) {
      return (
        <WaitingRoom
          hostID={props.hostID}
          hostName={props.hostName}
          currentUserId={props.currentUser.id}
          handleStartClick={handleStartClick}
          users={gameRound.allUsers}
        />
      );
    } else if (props.gameStartedWaiting) {
      return "you will be added in the next round";
    }
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
      {hostEnd && <EndGameModal />}
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
          {/* This conditional is to check if the game is active for the current player window, shortened it from gameRound.currentQuestion && Object.keys(gameRound.currentQuestion).length > 0 */}
          {gameRound.currentPlayer ? screenText() : waitingText()}
          <Row className="seventy-five-row-seperator" />
          {/* this ^^^ kept after removing startbutton from here to keep css in order */}
        </Col>
      </ActionCableConsumer>
    </div>
  );
};

export default Room;
