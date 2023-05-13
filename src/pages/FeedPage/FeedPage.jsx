//PAGES FOLDER IS WHERE WE KEEP OUR STATE SO THAT WE CAN EASILY PASS IT DOWN TO COMPONENTS WHERE THE STATE WILL BE RENDERED
//PAGE FOLDER ALSO HOLDS ANY PAGES THAT WE CREATED ROUTES TO IN APP.jsx


import PageHeader from "../../components/PageHeader/PageHeader"
import AddPlantForm from "../../components/AddPlantForm/AddPlantForm"
import PlantPostDisplay from "../../components/PlantPostDisplay/PlantPostDisplay"

import { useEffect, useState } from 'react';
import { Grid } from "semantic-ui-react"

//this will import all the functions from postApi, and attach to an object call postApi
import * as postApi from '../../utils/postApi';

export default function FeedPage({ loggedUser, handleLogout}){

    const [posts, setPosts] = useState([]); //array of objects (posts)

    //CRUD= THIS IS POST/CREATE
async function handleAddPost(post) {
    try{
        const responseData = await postApi.create(post); //this is calling the create function in the postApi utils folder
        console.log(responseData, "response from the server");
        setPosts([responseData.data, ...posts]);
    } catch (err) { 
        console.log(err, "error in add post");
    }
}

//REMEMBER WE GET AN API CALL, WE UPDATE THE STATE
//WE WILL BE GETTING AND RENDERING OUT ALL OF THE POSTS ON OUR FEED PAGE

//CRUD THIS IS OUR GET/READ
async function getPosts() {
    try {
        const response = await postApi.getAll(); //THIS MAKES THE API CALL postApi.js/ getAll function
        console.log(response, "data"); //WE HAVE TO LOOK AT THE RESPONSE BEFORE UPDATING STATE. WE NEED TO KNOW WHAT IS IN THE OBJECT
        setPosts(response.posts); //UPDATE THE STATE 
                //RESPONSE = OBJECT --> POSTS= ARRAY
    } catch (err) {
        console.log(err.message, " WE HAVE A PROBLEM GETTING THE POSTS");
    }
}

//this use effect calls on the function getAll inside our utils/postApi.js
useEffect(() => { //notice the anonymous function 
//this use effect runcs once when our feed component loads
    getPosts();
}, []); 

//THIS IS WHERE WE WILL BE CREATING OUR DELETE 
async function deletePost(postId) {
    try {
        const data = await postApi.deletePost(postId);
// after we come back from the back end
        getPosts() //call on the getPosts function again to return the new array or objects
    
    } catch(err) {
    console.log(err, 'WE HAD A PROBLEM DELETING THE POST')
    }
}

async function handleAddComment(postId, comment) {
    try {
        const data = await postApi.addComment(postId, comment);
        getPosts()
    } catch(err) {
        console.log(err, 'THERE WAS A PROBLEM WITH ADDING A COMMENT')
    }
}


    return (
        
        <Grid centered>
            <Grid.Row>
                <Grid.Column> 
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <AddPlantForm handleAddPost={handleAddPost}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <PlantPostDisplay posts={posts} deletePost={deletePost} handleAddComment={handleAddComment}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}