import { Button } from "semantic-ui-react"

export default function CommentSection({commentSectionPopUp}) {
    return (
        <>
         <div > 
         <h5>COMMENT SECTION - all of our comments will display here</h5> 
         <Button onClick={commentSectionPopUp}> RETURN </Button>
         </div>
         </>
    )
}