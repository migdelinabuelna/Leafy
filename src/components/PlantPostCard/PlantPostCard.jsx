//this is each individual plant post
import { Card, CardContent, Icon, Image, } from "semantic-ui-react"
import CommentSection from "../CommentSection/CommentSection"
import { Link } from "react-router-dom"
import { useState } from "react"
import AddCommentForm from "../AddCommentForm/AddCommentForm"

export default function PlantPostCard({ post, deletePost, handleAddComment }){
    const [commentDisplay, setCommentDisplay] = useState (false)//the boolean goes in here without the strings cause otherwise it is just a string
    function commentSectionPopUp(){
        setCommentDisplay(!commentDisplay) //! means we want the oppostite 
    }

    return ( 
        <>
        <Card raised>
          <Card.Content textAlign="center">
            <Card.Header>
                <Image
                  size="large"
                  avatar
                  src={
                    post.user.photoUrl  // is there is a photo url...
                      ? post.user.photoUrl // we are using that url....
                      : "https://react.semantic-ui.com/images/wireframe/square-image.png" 
                  }
                />
                <Link to={`/${post.user.username}`}>{post.user.username}</Link>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <div class="ui brown left ribbon label">WILLING TO TRADE? {post.swapstatus} </div>
              <Card.Content extra textAlign={"right"}>
                <Icon name={"delete"} size="tiny" onClick={() => {deletePost(post._id)}}/>
              </Card.Content>
          </Card.Content>         
          <Image src={`${post?.photoUrl}`} wrapped ui={false} /> 
          <Card.Content>
            <Card.Description>{post.caption}</Card.Description>
          </Card.Content>
          <Card.Content onClick={commentSectionPopUp}>
            <Card.Description><a>COMMENT SECTION</a></Card.Description>
          </Card.Content>
          <CardContent>
            <AddCommentForm post={post} handleAddComment={handleAddComment}/>
          </CardContent>
        </Card>
        {commentDisplay?
        <div style={{position: 'absolute', zIndex:3, width:'70vw', height:'100vh', backgroundColor:'white', top:0, left:0}}> <CommentSection post={post} commentSectionPopUp={commentSectionPopUp} handleAddComment={handleAddComment} />
         </div>:null}
        </>
    )
}
