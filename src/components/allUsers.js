import React from "react";

const allUsers = (props) => {
  const renderAllUsers = () => {
    let allUsersArray = props.users.sort((a, b) => a.id - b.id);

    return allUsersArray.map((userObj) => {
      return (
        <span className="eachUser" key={userObj.id}>
          {/* not sure if this span needs to exist, will check later */}
          {/* removed function call below and doing all in one line. tested and works, but noting in case problems later */}
          {userObj.is_active ? (
            <h5 className="userTrue">{userObj.username}</h5>
          ) : (
            <h5 className="userFalse">{userObj.username}</h5>
          )}
        </span>
      );
    });
  };

  const renderBox = () => {
    if (props.gameStarted === false) {
      return null;
    } else {
      return (
        <div className="allUsers">
          <h3>
            <span className="allUsersTitle">Players</span>
          </h3>
          <div className="allUsersList">{renderAllUsers()}</div>
        </div>
      );
    }
  };

  return <div>{renderBox()}</div>;
};

export default allUsers;
