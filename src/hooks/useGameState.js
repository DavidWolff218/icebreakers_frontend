import {useState} from "react"

const useGameState = (props) => {

  //moved from .room, used to handle anything recieved from backend or updating state

  const [hostEnd, setHostEnd] = useState(false)

  const [gameRound, setGameRound] = useState({
    currentPlayer: "",
    currentPlayerID: "",
    currentQuestion: {},
    votingQuestionA: "",
    votingQuestionB: "",
    reshufflingUsers: false,
    reshufflingQuestions: false,
    allUsers: [],
    gameActive: false,
    //   timerRunning: false,
    //   timerSeconds: 5,
    //   timerIntervalID: "",
    // ^^ to be used for voting feature
  });

  const handleReceived = (resp) => {
    
    if (resp.endGame) {
      //this resp only exists when the host ends game
      setHostEnd(true)
    } else if (resp.room && resp.room.game_started && resp.currentQuestion) {
      //for use when game has started and players is active in game, resp.currentQuestion filters out players joining midgame
      setGameRound({
        currentPlayer: resp.currentPlayer.username,
        currentPlayerID: resp.currentPlayer.id,
        currentQuestion: resp.currentQuestion,
        votingQuestionA: resp.votingQuestionA,
        votingQuestionB: resp.votingQuestionB,
        reshufflingUsers: resp.reshufflingUsers,
        reshufflingQuestions: resp.reshufflingQuestions,
        allUsers: resp.allUsers,
        gameActive: resp.room.game_started
        // add voting timer stuff here
      });
      return;
    } else if (resp.room && !resp.room.game_started) {
      console.log("DOES THIS ACTUALLY HIT??")
      //used for updating lobby of users as new ones come in
      setGameRound({
        allUsers: resp.allUsers,
      });
      return;
    } 
  };


//also took these from room.js..not sure if keeping here
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

  return {
    gameRound,
    setGameRound,
    handleReceived,
    hostEnd,
    resetUsersAndQuestionsShuffle,
    resetQuestionsShuffle,
    resetUsersShuffle
  }

}

export default useGameState