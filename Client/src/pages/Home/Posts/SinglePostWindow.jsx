import {React, useState} from 'react'
import {useNavigate } from "react-router-dom";
import UpdateWindow from '../../../components/UpdateWindow'
import styles from '../../../css/posts.module.css'
function SinglePostWindow({ generalDataAndTools, post, setCurrentSelectedPost, filteredPosts, setFilteredPosts, allPosts, setAllPosts }) {
    const [currentUpdated, setCurrentUpdated] = useState(null);
    const [currentPost,setCurrentPost]=useState(post)
    const navigate = useNavigate();

    function deletePost(post) {
        (async () => {
            await generalDataAndTools.deleteItemFunc(`posts/${post.id}`, post, filteredPosts, setFilteredPosts, allPosts, setAllPosts);
            setCurrentSelectedPost(null);
        })();
    }

    return (
        <div className={styles.back}>
            <div className={styles.singlePostWindow}>
                <p onClick={() => setCurrentSelectedPost(null)} className={styles.xButton}>❌</p>
                <p>Post Id: {currentPost.id}</p>
                <p>Title: {currentPost.title}</p>
                <p>Body: {currentPost.body}</p>
                <button onClick={() => deletePost(currentPost)}>🗑️</button>
                <button onClick={() => setCurrentUpdated(currentPost)}>✏️</button>
                <button onClick={() => navigate(`${currentPost.id}/comments`)}>comments</button>
            </div>
            {currentUpdated && <UpdateWindow url={`posts/${currentUpdated.id}`} oldItem={currentUpdated} setOldItem={setCurrentUpdated} filteredItems={filteredPosts} setFilteredItems={setFilteredPosts} allItems={allPosts} setAllItems={setAllPosts} propertiesArr={['title', 'body']} setItemInAdditionalWindow= {setCurrentPost}/>}
        </div>
    )
}

export default SinglePostWindow;