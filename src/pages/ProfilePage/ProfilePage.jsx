import { useParams } from "react-router-dom" //this is a hook that will allows us to use params for the username
import { Grid } from "semantic-ui-react"
import { useState, useEffect } from 'react';
import PageHeader from "../../components/PageHeader/PageHeader"
import ProfileBio from "../../components/ProfileBio/ProfileBio"
import PlantPostDisplay from "../../components/PlantPostDisplay/PlantPostDisplay";
// we import this in order to call the getProfile function that makes the api call to the backend 
import userService from "../../utils/userService"

export default function ProfilePage({handleLogout, loggedUser, handleAddComment }) {

    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});


//username comes from whatever the params name is on the route /:userame
    const { username } = useParams();
    console.log(username);

    //we have to have the use effect for when our page loads 
    useEffect(() => {
        async function getProfile() {
            try {
                //username is coming from our useParams, whatever is in the url
                const data = await userService.getProfile(username);

                // setLoading(false); //after we are done loading
                setPosts(data.posts) //posts and user is coming from res in profilePage function in users.js
                setProfileUser(data.user)

            } catch(err){
                console.log('ERROR WITH PROFILE PAGE')
                setError('PROFILE DOES NOT EXIST')
            }
        }
        getProfile(); //we are using in inside the use effect because we wont be using this page anywhere else
    }, [])

async function handleAddComment(postId, comment) {
    try {
        const data = await postApi.addComment(postId, comment);
        getPosts()
    } catch(err) {
        console.log(err, 'THERE WAS A PROBLEM WITH ADDING A COMMENT')
    }
}


    return (
        <Grid>
            <Grid.Row centered>
                <Grid.Column>
                    <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column centered style={{ maxWidth: 600 }}>
                    <ProfileBio profileUser={profileUser}/>
                </Grid.Column>
             </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 800 }}>
                    <PlantPostDisplay posts={posts} isProfile={true} handleAddComment={handleAddComment}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>     
    )
}