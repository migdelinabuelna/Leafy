import React from 'react'
//code given by semantic for our signup page and we had to adjust it our way
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { useState } from 'react';


export default function Signup() {
//set up our state

const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
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

function handleSubmit() {}

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
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
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


