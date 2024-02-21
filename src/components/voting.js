import React from "react";

const voting = (props) => {

  //These three functions are all part of the voting feature, will implement again in future
  // moved here from room.js, may need to put some functionality back there, just cleaning room right now
  
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

  // componentDidMount() {
  //   this.props.runTimer();
  // }
  // componentWillUnmount(){
  //   this.props.resetTimer()
  // }

  //need to correct ^^ when re-intergrting coting feature

  //  const handleVote = (vote) => {
  //     const reqObj = {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         user: {
  //           room: match.params.id,
  //           vote_id: vote,
  //           currentPlayer: gameRound.currentPlayer,
  //         },
  //       }),
  //     };
  //     fetch(`http://localhost:3000/users/voting/foo`, reqObj);
  //   };
//^^ this belongs in the room component

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

    //^^^^^this come from gameText component, at the top of the renderGameText func

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
