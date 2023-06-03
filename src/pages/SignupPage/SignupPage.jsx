import React from 'react'
//code given by semantic for our signup page and we had to adjust it our way
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useState } from 'react';
import userService from '../../utils/userService';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

import { useNavigate } from "react-router-dom"; //htis is a hook that allows you to navigate to a different route

export default function Signup({handleSignUpOrLogin}) {
  const navigate = useNavigate(); //this is a function that affects the route to change to 
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    bio: '',
    faveplants: ''
  })

  const [ profileImageFile, setProfileImageFile] = useState('')
  const [error, setError] = useState('') //this is going to be used in case we have an error
  //e is the event object. it will refferrence whatever input is typed in our form
  function handleChange(e) {
    setState({
        ...state, 
        [e.target.name]: e.target.value
        //e.target.name (es6 computed property syntax) is refferencing the name property on our input
        //that name property "username" happens to match the key name in our state above
        //we always want the property name in our for to match the key name in our state so we can use this syntax
    })
  }

  //file will need a different piece of state
  function handleFileInput(e) {
    //[0] this takes the first file the user uploads and sets it in state
    //we could look at this by console logging
    console.log(e.target.files)
    setProfileImageFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //we have to turn our data into formData if we are sending over a photo or file
    const formData = new FormData();
    formData.append('photo', profileImageFile); 
    // formData.append('username', state.username);
    // formData.append('email', state.email);
    // formData.append('password', state.password);
    // formData.append('confirmpassword', state.confirmpassword);
    // formData.append('bio', state.bio);
    // FormData.append('favplants', state.faveplants);

    //A shorter way to do the above is to use a for in loop
    //it allows us to loop over the state object and apply the field names and values
    for (let fieldName in state) {
        formData.append(fieldName, state[fieldName]) 
    } 
    // console.log(formData.forEach((item) => console.log(item))); //to check formData in console

    try { 
        await userService.signup(formData);
        handleSignUpOrLogin();
        navigate('/'); //this will navigate us to our home page
    } catch(err) {
      console.log(err.message, 'there was an error signing up')
      setError('Check your terminal for any errors')
    }
    
  }

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='brown' textAlign='center'>
          <Image src='https://i.imgur.com/jV50WYl_d.jpg?maxwidth=520&shape=thumb&fidelity=high' /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="email"
              type="email"
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
            <Form.Input
              name="confirmpassword"
              type="password"
              placeholder="Confirm Password"
              value={state.confirmpassword}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              placeholder="Share details about your plant collection"
              value={state.bio}
              onChange={handleChange}
            />
            <Form.TextArea
                label="favplants"
                name="faveplants"
                placeholder="What are your to three plants?"
                onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload your profile photo"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
            {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  )
}


