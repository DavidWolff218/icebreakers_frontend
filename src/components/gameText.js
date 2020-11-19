import React, { Component } from "react";
import Voting from "./voting";

export class gameText extends Component {
  renderGameText = () => {
    let player = this.props.currentPlayer;
    if (this.props.votingQuestionA) {
      return (
        <Voting
          currentPlayer={this.props.currentPlayer}
          votingQuestionA={this.props.votingQuestionA}
          votingQuestionB={this.props.votingQuestionB}
          hostButton={this.props.hostButton}
          handleVote={this.props.handleVote}
          timer={this.props.timer}
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

  callReset = (resetFunc) => {
    setTimeout(resetFunc, 2000);
  };

  gameText = () => {
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
      return this.renderGameText();
    }
  };

  render() {
    return <div>{this.gameText()}</div>;
  }
}

export default gameText;
