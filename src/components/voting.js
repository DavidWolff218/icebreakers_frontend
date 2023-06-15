import React, { Component } from "react";

export class voting extends Component {
  componentDidMount() {
    this.props.runTimer();
  }
  componentWillUnmount(){
    this.props.resetTimer()
  }

  render() {
    return (
      <div>
        <h3 className="currentPlayer">{this.props.currentPlayer}</h3>
        <h3 className="currentQuestion">
          <button
            onClick={() => this.props.handleVote(this.props.votingQuestionA.id)}
          >
            {this.props.votingQuestionA.content}
          </button>
        </h3>
        <h3 className="currentQuestion">
          <button
            onClick={() => this.props.handleVote(this.props.votingQuestionB.id)}
          >
            {this.props.votingQuestionB.content}
          </button>
        </h3>
        <h3>{this.props.timerSeconds}</h3>
      </div>
    );
  }
}

export default voting;
