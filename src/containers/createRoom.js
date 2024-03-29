import React, { useState } from "react";
import icebreakersv8 from "../logo/icebreakersv8.png";
import { Container, Row, Col } from "react-bootstrap";
import  ErrorModal from '../modals/errorModal'

const CreateRoom = ({setCreateRoom, history}) => {

  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState("Could Not Create Room")

  const [createForm, setCreateForm] = useState({
    room_name: "",
    password: "",
    username: "",
  });

  const handleModal = () => {
    setShowError(false)
  }

  const handleChange = (event) => {
    event.persist();
    setCreateForm((prev) => ({
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
      body: JSON.stringify({ room: createForm }),
    };
    //add condtional below if needed for rendering error on screen
    try {
      const resp = await fetch("http://localhost:3000/rooms", reqObj);
      if (!resp.ok) {
        const errorData = await resp.json();
        setErrorText(errorData.error || "Could not create room")
        setShowError(true)
        return
      }
      const data = await resp.json();
      localStorage.setItem("token", data.jwt);
      setCreateRoom(
        data.user,
        data.room.room_name,
        data.room.host_id,
        data.room.host_name,
        data.room.game_started
      );
      setCreateForm({ room_name: "", password: "", username: "" });
      history.push(`/room/${data.room.id}`);
    } catch (error) {
      setErrorText(error || "Could Not Create Room")
      setShowError(true)
      return
    }
  };

  const renderForm = () => {
    return (
      <form className="create-room-form" onSubmit={handleSubmit}>
        <label className="form-label">Create Room Name</label>
        <br></br>
        <input
          className="form-input"
          id="rname"
          name="room_name"
          value={createForm.room_name}
          onChange={handleChange}
        />
        {/* {" "} not sure why this was here, but keeping it just in case...*/}
        <br></br>
        <label className="form-label">Create Password</label>
        <br></br>
        <input
          className="form-input"
          id="pword"
          name="password"
          type="password"
          value={createForm.password}
          onChange={handleChange}
        />
        <br></br>
        <label className="form-label">Create Player Name</label>
        <br></br>
        <input
          className="form-input"
          id="uname"
          name="username"
          type="text"
          value={createForm.username}
          onChange={handleChange}
        />
        <br></br>
        <button className="form-btn" type="submit">
          Create your Room
        </button>
        <br></br>
      </form>
    );
  };

  return (
    <Container>
      <Row className="boot-home-logo">
        <img className="img-fluid" src={icebreakersv8} alt="icebreakers logo" />
      </Row>
      <Row>
      { showError && <ErrorModal handleClose={handleModal} errorText={errorText}/>}
        <Col className="col" />
        <Col className="max-width-400 col-10 align-self-center">
          {renderForm()}
        </Col>
        <Col className="col" />
      </Row>
    </Container>
  );
};

export default CreateRoom;
