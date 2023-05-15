import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService"; //this has our http request to login, signup, or to get the user out of local storage
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export default function LoginPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Making the POST request to /api/users/login on our express server
      await userService.login(state); //await ends after we recieve the token from the server, and store in localstorage... so after the user logs in and token is stored in local storage 
//then we call the handleSignUpOrLogin
      props.handleSignUpOrLogin(); // We call handleSignUpOrLogin, to decode that token from localstorage and store in our App component's state
      navigate("/");     // Route to wherever you want!
    } catch (err) {
      // Invalid user data (probably duplicate email)
      // this is from the throw block in the userService.login first then function
      setError(err.message);
    }
  }

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", width: "100vw" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color=" #8F8C67" textAlign="center">
          <Image src="https://i.imgur.com/jV50WYl_d.jpg?maxwidth=520&shape=thumb&fidelity=high" /> Log-in to your account
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Button
              color="brown"
              fluid
              size="large"
              type="submit"
              className="btn"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/signup">Sign Up</Link>
        </Message>
        {error ? <ErrorMessage error={error} /> : null}
      </Grid.Column>
    </Grid>
  );
}