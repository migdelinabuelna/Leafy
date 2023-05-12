// import AddCommentForm from "../AddCommentForm/AddCommentForm"

export default function CommentSection({commentSectionPopUp}) {
    return (
        <>
        {/* <AddCommentForm /> */}
         <div > 
         <h5>COMMENT SECTION - all of our comments will display here</h5> 
         <button onClick={commentSectionPopUp}> RETURN </button>
         </div>
         </>
    )
}