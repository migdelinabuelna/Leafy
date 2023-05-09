import PageHeader from "../../components/Header/Header"
import AddPlantForm from "../../components/AddPlantForm/AddPlantForm"
import PlantPostDisplay from "../../components/PlantPostDisplay/PlantPostDisplay"

import { useState } from 'react';
import { Grid } from "semantic-ui-react"

//this will import all the functions from postApi, and attach to an object call postApi
import * as postApi from '../../utils/postApi';

export default function FeedPage(){

    const [posts, setPosts] = useState([]); //array of objects (posts)

async function handleAddPost(post) {
    try{
        const responseData = await postApi.create(post); //this is calling the create function in the postApi utils folder
        console.log(responseData, "response from the server");
    } catch (err) { 
        console.log(err, "error in add post");
    }
}


    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column> 
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddPlantForm handleAddPost={handleAddPost}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <PlantPostDisplay />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}