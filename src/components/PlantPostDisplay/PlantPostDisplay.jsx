//THIS IS THE SECTION THAT ALL PLANT POSTS WILL DISPLAY ON OUR FEED PAGE
import PlantPostCard from "../PlantPostCard/PlantPostCard"
import { Card} from "semantic-ui-react";




export default function PlantPostDisplay({posts, deletePost, isProfile}) {
    return (
        <Card.Group itemsPerRow={4} stackable>
            {posts.map((post) => {
                return (
                    <PlantPostCard post={post} key={post._id} deletePost={deletePost} isProfile={isProfile}/>
                );
            })}
        </Card.Group>
    );
}
