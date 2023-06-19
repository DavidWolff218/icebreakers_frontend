import React, {useState} from "react";
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import AllUsers from "../components/allUsers";
import GameText from "../components/gameText";
import NavBar from "../components/navBar";
import { Row, Col } from "react-bootstrap";

const Room = (props) => {

  const [gameRound, setGameRound] = useState({
      currentPlayer: "",
      currentQuestion: {},
      votingQuestionA: "",
      votingQuestionB: "",
      reshufflingUsers: false,
      reshufflingQuestions: false,
      allUsers: []
  })
  // state = {
  //   currentPlayer: "",
  //   currentQuestion: "",
  //   votingQuestionA: "",
  //   votingQuestionB: "",
  //   reshufflingUsers: false,
  //   reshufflingQuestions: false,
  //   allUsers: [],
  //   timerRunning: false,
  //   timerSeconds: 5,
  //   timerIntervalID: "",
  // };

 const handleReceived = (resp) => {
    if (props.gameStarted === false) {
      props.startGame();
    }
    setGameRound({
      currentPlayer: resp.currentPlayer.username,
      currentQuestion: resp.currentQuestion,
      votingQuestionA: resp.votingQuestionA,
      votingQuestionB: resp.votingQuestionB,
      reshufflingUsers: resp.reshufflingUsers,
      reshufflingQuestions: resp.reshufflingQuestions,
      allUsers: resp.allUsers,
    });
  };

 const handleClick = () => {
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

 const startButton = () => {
    if (
      props.gameStarted === false &&
      props.currentUser.id === props.hostID
    ) {
      return (
        <div>
          <button className="startBtn" onClick={handleStartClick}>
            <h3 className="mainBtnText">START GAME</h3>
          </button>
        </div>
      );
    }
  };

  const hostButton = () => {
    if (props.currentUser.id === props.hostID) {
      return (
        <button className="MainBtn" onClick={handleClick}>
          <h3 className="mainBtnText">NEXT QUESTION</h3>
        </button>
      );
    } else {
      return null;
    }
  };
//can combine these two functions...or maybe not...will look into this more
 const playerButton = () => {
    if (props.currentUser.id === props.hostID) {
      return null;
    } else if (props.currentUser.username === gameRound.currentPlayer) {
      return (
        <button className="MainBtn" onClick={handleClick}>
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
        props.endGame();
        localStorage.removeItem("token");
        props.history.push(`/`);
      });
  };

 const resetUsersAndQuestionsShuffle = () => {
    setGameRound((prev) => ({
      ...prev,
      reshufflingUsers: false,
      reshufflingQuestions: false,
    })
    );
  };

const  resetUsersShuffle = () => {
    setGameRound((prev) => ({
      ...prev,
      reshufflingUsers: false,
    })
    );
  };

const  resetQuestionsShuffle = () => {
  setGameRound((prev) => ({
    ...prev,
    reshufflingQuestions: false,
  })
  );
  };

  //These three functions are all part of the voting feature, will implement again in future

// const runTimer = () => {
//     const intervalID = setInterval(() => {
//       if (this.state.timerSeconds > 0) {
//         this.setState({
//           timerSeconds: this.state.timerSeconds - 1,
//         });
//         this.setState({
//           timerIntervalID: intervalID,
//         });
//       } else {
//         this.resetTimer();
//       }
//     }, 1000);
//   };

// const  resetTimer = () => {
//     clearInterval(this.state.timerIntervalID);
//     if (this.state.timerSeconds === 0) {
//       this.timerSelect();
//       this.setState({
//         // timerRunning: false,
//         timerSeconds: 20,
//       });
//     } else {
//       this.setState({
//         // timerRunning: false,
//         timerSeconds: 20,
//       });
//     }
//   };

// const  timerSelect = () => {
//     console.log("timer");
//     const reqObj = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           room: this.props.match.params.id,
//           currentPlayer: this.state.currentPlayer,
//         },
//       }),
//     };
//     fetch(`http://localhost:3000/users/voting_timer/foo`, reqObj);
//   };

const  screenText = () => {
  console.log(props)
    if (props.gameStarted === true) {
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
          hostButton={hostButton}
          // handleVote={this.handleVote}
          // resetTimer={this.resetTimer}
          // runTimer={this.runTimer}
        />
      );
    }
    if (
      props.gameStarted === false &&
      props.currentUser.id === props.hostID
    ) {
      return (
        <h2 className="welcomeTextHost">
          As the <span className="welcomeTextHostSpan">host</span>, you can
          start the game whenever your party is ready!
        </h2>
      );
    } else if (props.gameStarted === false) {
      return (
        <h2 className="welcomeTextUser">
          The host,{" "}
          <span className="welcomeTextUserSpan">{props.hostName}</span>,
          will start the game soon!
        </h2>
      );
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
        <AllUsers
          users={gameRound.allUsers}
          gameStarted={props.gameStarted}
        />
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
            {screenText()}
            <Row className="seventy-five-row-seperator" />
            {startButton()}
          </Col>
        </ActionCableConsumer>
      </div>
    );
}

export default Room;
