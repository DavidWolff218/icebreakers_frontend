import React from "react";

const voting = (props) => {
  // componentDidMount() {
  //   this.props.runTimer();
  // }
  // componentWillUnmount(){
  //   this.props.resetTimer()
  // }

  //need to correct ^^ when re-intergrting coting feature

  return (
    <div>
      <h3 className="currentPlayer">{props.currentPlayer}</h3>
      <h3 className="currentQuestion">
        <button onClick={() => props.handleVote(props.votingQuestionA.id)}>
          {props.votingQuestionA.content}
        </button>
      </h3>
      <h3 className="currentQuestion">
        <button onClick={() => props.handleVote(props.votingQuestionB.id)}>
          {props.votingQuestionB.content}
        </button>
      </h3>
      <h3>{props.timerSeconds}</h3>
    </div>
  );
};

export default voting;
