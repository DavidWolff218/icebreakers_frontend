import React from "react";
import Voting from "./voting";

const gameText = (props) => {
  const renderGameText = () => {
    let player = this.props.currentPlayer;
    if (this.props.votingQuestionA) {
      return (
        <Voting
          currentPlayer={this.props.currentPlayer}
          votingQuestionA={this.props.votingQuestionA}
          votingQuestionB={this.props.votingQuestionB}
          hostButton={this.props.hostButton}
          handleVote={this.props.handleVote}
          timerRunning={this.props.timerRunning}
          runTimer={this.props.runTimer}
          timerSeconds={this.props.timerSeconds}
          resetTimer={this.props.resetTimer}
        />
      );
    } else {
      return (
        <div>
          <h3 className="currentPlayer">{player}</h3>
          <h3 className="currentQuestion">
            {this.props.currentQuestion.content}
          </h3>
          <br></br>
          {this.props.playerButton()}
          {this.props.hostButton()}
        </div>
      );
    }
  };

  const callReset = (resetFunc) => {
    setTimeout(resetFunc, 2000);
  };

  const gameText = () => {
    if (
      this.props.reshufflingQuestions &&
      this.props.reshufflingUsers === true
    ) {
      this.callReset(this.props.resetUsersAndQuestionsShuffle);
      return <h3>Reshuffling Questions and Users...</h3>;
    } else if (this.props.reshufflingUsers === true) {
      this.callReset(this.props.resetUsersShuffle);
      return <h3>Reshuffling Users...</h3>;
    } else if (this.props.reshufflingQuestions === true) {
      this.callReset(this.props.resetQuestionsShuffle);
      return <h3>Reshuffling Questions...</h3>;
    } else {
      return renderGameText();
    }
  };


    return <div>{gameText()}</div>;
  
}

export default gameText;
