import React from 'react'
import { Button, Comment, Header, Card } from "semantic-ui-react"

export default function CommentSection({post, commentSectionPopUp}) {
    return (
        <>
        <Card.Content center>
        {post.comments.length}
         
        
    <Header as='h3' dividing> COMMENTS </Header>

    <Comment.Group itemsPerRow={1} stackable>
    {post.comments.map((comment) => {

    return (
           <Comment>
                <Comment.Content>
                    <Comment.Author> {comment.username} </Comment.Author>
                    <Comment.Text>{comment.comment}</Comment.Text>
                </Comment.Content>
            </Comment> 
        )
    })}

    </Comment.Group>
         </Card.Content>
         <Button onClick={commentSectionPopUp}> RETURN </Button>
         </>
    )
}