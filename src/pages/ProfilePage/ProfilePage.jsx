import { useParams } from "react-router-dom" //this is a hook that will allows us to use params for the username
import { Grid } from "semantic-ui-react"

import PageHeader from "../../components/PageHeader/PageHeader"
import ProfileBio from "../../components/ProfileBio/ProfileBio"
import FavoritePlants from "../../components/FavoritePlants/FavoritePlants"
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay"



export default function ProfilePage() {

//username comes from whatever the params name is on the route /:userame
    const { username } = useParams();
    console.log(username);

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <PageHeader />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <ProfileBio />
                </Grid.Column>
             </Grid.Row>
             <Grid.Row>
                <Grid.Column>
                    <FavoritePlants />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column style={{ maxWidth: 750 }}>
                    <ProfilePostDisplay />
                </Grid.Column>
            </Grid.Row>
        </Grid>     
    )
}