//this is each individual plant post
import { Card, Icon, Image } from "semantic-ui-react"
// import Comments from "../CommentSection/CommentSection"

export default function PlantPostCard({ post, deletePost }){
    return (
        <Card raised>

          <Card.Content textAlign="center">
            <Card.Header>
                {/* <Image
                  size="large"
                  avatar
                  src={
                    post.user.photoUrl  // is there is a photo url...
                      ? post.user.photoUrl // we are using that url....
                      : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    //   
                  }
                /> */}
                {post.user.username}
            </Card.Header>
          </Card.Content>
        <Image src={`${post?.photoUrl}`} wrapped ui={false} /> 
        <Card.Content>
          <Card.Description>{post.caption}</Card.Description>
        </Card.Content>
        <Card.Content>
            <Card.Description>TRADE? {post.swapstatus}</Card.Description>
        </Card.Content>
        <Card.Content extra textAlign={"right"}>
            <Icon name={"delete"} size="small" onClick={() => {deletePost(post._id)}}
             />
        </Card.Content>
        </Card>
    )
}
