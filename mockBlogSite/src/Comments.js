import Comment from "./Comment";
import { useState, useEffect } from "react";

export default function Comments(props) {
    const [comments, setComments] = useState();
    const { postId, showingComments } = props;

    useEffect(() => {
        async function loadComments() {
            if (showingComments === true) {
                try {
                    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                    if (!response.ok) {
                        throw new Error(`${response.status} ${response.statusText}`);
                    }
                    const comments = await response.json();
                    setComments(comments);
                    console.log(comments);
                } catch (e) {
                    console.error('oops', e);
                }
            }
        }
        loadComments();
    }, [showingComments, postId]);

    return (
        showingComments?
        <div className="commentContainer">
            {comments?.map((comment, i) => {
                return (
                    <Comment key={i} name={comment.name} body={comment.body} />
                );
            })}
        </div >: <></>

    );

}
