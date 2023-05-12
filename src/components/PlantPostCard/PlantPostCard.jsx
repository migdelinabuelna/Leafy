//this is each individual plant post
import { Card, CardContent, Icon, Image } from "semantic-ui-react"
import CommentSection from "../CommentSection/CommentSection"
import { Link } from "react-router-dom"
import { useState } from "react"
import AddCommentForm from "../AddCommentForm/AddCommentForm"


export default function PlantPostCard({ post, deletePost }){
 
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
                    //   
                  }
                />
                <Link to={`/${post.user.username}`}>
                {post.user.username}
                </Link>
            </Card.Header>
          </Card.Content>
          <Card.Content extra textAlign={"right"}>
            <Icon name={"delete"} size="tiny" onClick={() => {deletePost(post._id)}}
             />
        </Card.Content>
        <Image src={`${post?.photoUrl}`} wrapped ui={false} onClick={commentSectionPopUp}/> 
        <Card.Content>
          <Card.Description>{post.caption}</Card.Description>
        </Card.Content>
        <Card.Content>
            <Card.Description> SWAPS? {post.swapstatus}</Card.Description>
        </Card.Content>
        <CardContent><AddCommentForm /></CardContent>
        </Card>
        {commentDisplay?
        <div style={{position: 'absolute', zIndex:3, width:'70vw', height:'100vh', backgroundColor:'tan', top:0, left:0}}> <CommentSection commentSectionPopUp={commentSectionPopUp}  />
         </div>:null}
        </>
    )
}
