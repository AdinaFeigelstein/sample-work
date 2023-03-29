import Comments from "./Comments";
import { useState } from "react";


export default function Post(props) {
    const [showingComments, setShowingComments] = useState();
    const { title, body, postId } = props;

    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{body}</p>
            <button className="commentButton" onClick={() => {
                setShowingComments(!showingComments);
            }}>{showingComments ? 'Hide Comments' : 'Show Comments'}</button>

            <Comments postId={postId} showingComments={showingComments} />
        </div>
    );
}