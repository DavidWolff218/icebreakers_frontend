import React, { useState } from "react";
import icebreakersv8 from "../logo/icebreakersv8.png";
import { Container, Row, Col } from "react-bootstrap";

const Login = (props) => {
  //check for users not fully filling in fields. need to implement checks
  const [loginForm, setLoginForm] = useState({
    room_name: "",
    password: "",
    username: "",
  });

  // const handleChange = (event) => {
  //   // setRoom({...room,[event.target.name]: event.target.value})
  // };
  //keeping this as reference for another way to update state...not sure about potential side effects of event.persist below
  //updated state to be more clear loginForm vs room

  const handleChange = (event) => {
    event.persist();
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ room: loginForm }),
    };
    fetch("http://localhost:3000/", reqObj)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.user) {
          localStorage.setItem("token", resp.jwt);
          props.setCreateRoom(
            resp.user,
            resp.room.room_name,
            resp.room.host_id,
            resp.room.host_name
          );
          props.history.push(`/room/${resp.room.id}`);
        } else {
          alert(resp.error);
        }
      });
    setLoginForm({
      room_name: "",
      password: "",
      username: "",
    });
  };

  const renderForm = () => {
    return (
      <form className="create-room-form" onSubmit={handleSubmit}>
        <label className="form-label">Enter Room Name</label>
        <br></br>
        <input
          className="form-input"
          name="room_name"
          value={loginForm.room_name}
          onChange={handleChange}
        />
        <br></br>
        <label className="form-label">Enter Password</label>
        <br></br>
        <input
          className="form-input"
          name="password"
          type="password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <br></br>
        <label className="form-label">Create Player Name</label>
        <br></br>
        <input
          className="form-input"
          name="username"
          value={loginForm.username}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-btn" type="submit">
          Join a Room
        </button>
      </form>
    );
  };

  return (
    <Container>
      <Row className="boot-home-logo">
        <img className="img-fluid" src={icebreakersv8} alt="icebreakers logo" />
      </Row>
      <Row>
        <Col className="col" />
        <Col className="max-width-400 col-10 align-self-center">
          {renderForm()}
        </Col>
        <Col className="col" />
      </Row>
    </Container>
  );
};

export default Login;
