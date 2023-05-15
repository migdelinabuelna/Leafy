import React from 'react'
import { Button, Comment, Header } from "semantic-ui-react"
import { Grid } from "semantic-ui-react"

export default function CommentSection({post, commentSectionPopUp}) {
    return (
        <>
<Grid centered> 
    <Grid.Row> 
        <Header as='h3' dividing >{post.comments.length} COMMENTS </Header>
    </Grid.Row>
    <Grid.Row>
        <Comment.Group >
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
    </Grid.Row>
    <Grid.Row>        
        <Button onClick={commentSectionPopUp}> RETURN </Button>
    </Grid.Row>
</Grid>
         </>
    )
}