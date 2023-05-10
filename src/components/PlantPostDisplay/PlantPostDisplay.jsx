//THIS IS THE SECTION THAT ALL PLANT POSTS WILL DISPLAY ON OUR FEED PAGE
import PlantPostCard from "../PlantPostCard/PlantPostCard"
import { Card } from "semantic-ui-react";

export default function PlantPostDisplay({posts, deletePost}) {
    return (
        <Card.Group itemsPerRow={1} stackable>
            {posts.map((post) => {
                return (
                    <PlantPostCard post={post} key={post._id} deletePost={deletePost}/>
                );
            })}
        </Card.Group>
    );
}