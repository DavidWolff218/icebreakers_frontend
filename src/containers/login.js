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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ room: loginForm }),
    };
    try {
      const resp = await fetch("http://localhost:3000/", reqObj);
      const data = await resp.json();
      if (resp.ok) {
        localStorage.setItem("token", data.jwt);
        console.log("login data return", data)
        props.setCreateRoom(
          data.user,
          data.room.room_name,
          data.room.host_id,
          data.room.host_name,
          data.room.game_started
        );
        setLoginForm({
          room_name: "",
          password: "",
          username: "",
        });
        props.history.push(`/room/${data.room.id}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("here", error);
    }
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
