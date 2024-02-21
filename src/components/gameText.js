import React from "react";
// import Voting from "./voting";

const gameText = ({
  currentPlayer,
  currentQuestion,
  playerButton,
  reshufflingUsers,
  reshufflingQuestions,
  resetQuestionsShuffle,
  resetUsersAndQuestionsShuffle,
  resetUsersShuffle,
}) => {
  const renderGameText = () => {

   
    return (
      <div>
        <h3 className="currentPlayer">{currentPlayer}</h3>
        <h3 className="currentQuestion">{currentQuestion.content}</h3>
        <br></br>
        {playerButton()}
      </div>
    );
    // }
  };

  const callReset = (resetFunc) => {
    setTimeout(resetFunc, 2000);
  };

  const gameText = () => {
    if (reshufflingQuestions && reshufflingUsers) {
      callReset(resetUsersAndQuestionsShuffle);
      return <h3>Reshuffling Questions and Users...</h3>;
    } else if (reshufflingUsers) {
      callReset(resetUsersShuffle);
      return <h3>Reshuffling Users...</h3>;
    } else if (reshufflingQuestions) {
      callReset(resetQuestionsShuffle);
      return <h3>Reshuffling Questions...</h3>;
    } else {
      return renderGameText();
    }
  };

  return <div>{gameText()}</div>;
};

export default gameText;
