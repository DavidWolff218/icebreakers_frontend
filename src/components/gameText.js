import React from "react";
// import Voting from "./voting";

const gameText = (props) => {
  const renderGameText = () => {
    let player = props.currentPlayer;
    // if (props.votingQuestionA) {
    //   return (
    //     <Voting
    //       currentPlayer={props.currentPlayer}
    //       votingQuestionA={props.votingQuestionA}
    //       votingQuestionB={props.votingQuestionB}
    //       hostButton={props.hostButton}
    //       handleVote={props.handleVote}
    //       timerRunning={props.timerRunning}
    //       runTimer={props.runTimer}
    //       timerSeconds={props.timerSeconds}
    //       resetTimer={props.resetTimer}
    //     />
    //   );
    // } else {
      return (
        <div>
          <h3 className="currentPlayer">{player}</h3>
          <h3 className="currentQuestion">
            {props.currentQuestion.content}
          </h3>
          <br></br>
          {props.playerButton()}
          {props.hostButton()}
        </div>
      );
    // }
  };

  const callReset = (resetFunc) => {
    setTimeout(resetFunc, 2000);
  };

  const gameText = () => {
    if (
      props.reshufflingQuestions &&
      props.reshufflingUsers === true
    ) {
      callReset(props.resetUsersAndQuestionsShuffle);
      return <h3>Reshuffling Questions and Users...</h3>;
    } else if (props.reshufflingUsers === true) {
      callReset(props.resetUsersShuffle);
      return <h3>Reshuffling Users...</h3>;
    } else if (props.reshufflingQuestions === true) {
      callReset(props.resetQuestionsShuffle);
      return <h3>Reshuffling Questions...</h3>;
    } else {
      return renderGameText();
    }
  };


    return <div>{gameText()}</div>;
  
}

export default gameText;
