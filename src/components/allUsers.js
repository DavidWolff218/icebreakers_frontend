import React from "react";

const allUsers = (props) => {
  const renderAllUsers = () => {
    let allUsersArray = props.users.sort((a, b) => a.id - b.id);

    return allUsersArray.map((userObj) => {
      return (
        <span className="eachUser" key={userObj.id}>
          {/* not sure if this span needs to exist, will check later */}
          {/* {below used to be multi line conditional, not all done in className, making note in case any issues } */}
          { <h5 className={userObj.is_active ? "userTrue" : "userFalse"}>{userObj.username}</h5> }
        </span>
      );
    });
  };

  const renderBox = () => {
      return (
        <div className="allUsers">
          <h3>
            <span className="allUsersTitle">{props.windowText}</span>
          </h3>
          <div className="allUsersList">{renderAllUsers()}</div>
        </div>
      );
  };

  return <div>{renderBox()}</div>;
};

export default allUsers;
