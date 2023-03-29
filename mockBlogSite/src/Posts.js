import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "./Post";

export default function Posts() {
    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { userID } = useParams();


    useEffect(() => {
        const abortController = new AbortController();
        (async function loadPosts() {
            try {
                setLoading(true);
                setError(null);
                setPosts();
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`, { signal: abortController.signal });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const posts = await response.json();
                setPosts(posts);
            } catch (e) {
                if (e.name !== 'AbortError') {
                    setError(`Failed to load blog ${userID} - ${e.message}`);
                }
            } finally {
                setLoading(false);
            }
        })();
        // loadPosts();
        return () => {
            abortController.abort();
        }
    }, [userID]);

    return (
        <>

            <div id="postContainer">
            {loading && <div>Loading...</div>}
            {error && <div className="error">{error}</div>}
                {posts?.map((post, i) => {
                    return (
                        <Post key={i} title={post.title} body={post.body} postId={post.id} />
                    );
                })}
            </div >
        </>
    );
}