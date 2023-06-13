import React from "react";

const allUsers = () => {
  
 const userColor = (userObj) => {
    if (userObj.is_active === true) {
      return <span><h5 className="userTrue">{userObj.username}</h5></span>
    } else {
      return <span><h5 className="userFalse">{userObj.username}</h5></span>
    }
  }
  
 const renderAllUsers = () => {
    
    let allUsersArray = this.props.users.sort((a, b) => a.id - b.id);
    
    return allUsersArray.map((userObj) => {
      return (
        <span className="eachUser" key={userObj.id}>
          {this.userColor(userObj)}
        </span>
      );
    });
  };

 const renderBox = () => {
    if (this.props.gameStarted === false) {
      return null
    } else {
    return <div className="allUsers">
      <h3><span className="allUsersTitle">Players</span></h3>
      <div className="allUsersList">{this.renderAllUsers()}</div>
    </div>;
  };
}

 
    return (
    <div>
      {this.renderBox()}
    </div>
    )
  
}

export default allUsers;
