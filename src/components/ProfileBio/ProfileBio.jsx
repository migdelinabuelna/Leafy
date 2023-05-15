import { Image, Grid, Segment } from "semantic-ui-react";


export default function ProfileBio({profileUser}){
    return (
        <Grid textAlign="center" columns={2} >
        <Grid.Row centered>
          <Grid.Column>
            <Image
              src={`${
                profileUser.photoUrl
                  ? profileUser.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              } `}
              size="small"
            />
          </Grid.Column>
          <Grid.Column textAlign="left" style={{ maxWidth: 900 }}>
            <Segment >
              <h3>{profileUser.username}</h3>
            </Segment>
            <Segment>
              <span> <h3>Bio:</h3> {profileUser.bio}</span>
            </Segment>
            <Segment> <h3>Favorite Plants: </h3>{profileUser.faveplants}</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}