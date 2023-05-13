import { Image, Grid, Segment } from "semantic-ui-react";


export default function ProfileBio({profileUser}){
    return (
        <Grid textAlign="center" columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Image
              src={`${
                profileUser.photoUrl
                  ? profileUser.photoUrl
                  : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              } `}
              avatar
              size="small"
            />
          </Grid.Column>
          <Grid.Column textAlign="left" style={{ maxWidth: 800 }}>
            <Segment >
              <h3>{profileUser.username}</h3>
            </Segment>
            <Segment>
              <span> Bio: {profileUser.bio}</span>
            </Segment>
            <Segment> Favorite Plants: {profileUser.faveplants}</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
}