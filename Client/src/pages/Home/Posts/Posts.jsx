import React, { useState, useEffect } from 'react'
import { useOutletContext } from "react-router-dom";
import SinglePostWindow from './SinglePostWindow';
import Filters from '../../../components/Filters'
import AddWindow from '../../../components/AddWindow';
import styles from '../../../css/posts.module.css'

function Posts() {

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isAddPostWindowShow, setIsAddPostWindowShow] = useState(false);
  const [currentSelectedPost, setCurrentSelectedPost] = useState(null);
  const [isGotPosts, setIsGotPosts] = useState(false);

  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getPosts(`users/${currentUser.id}/posts`);
  }, [])

  function getPosts(url) {
    generalDataAndTools.getItemsFunc(url, setFilteredPosts, setIsGotPosts, setAllPosts);
  }

  return (
    <div className={styles.postsContainer}>
      <div className={styles.filterDiv}>
      <Filters setFilteredItems={setFilteredPosts} allItems={allPosts} /></div>
      <div className={styles.postsMain}>
        <button onClick={() => setIsAddPostWindowShow(true)}>Add Post ➕</button>
        {!isGotPosts && <p>Loading...</p>}
        {isGotPosts && <div className={styles.allPosts}>
          {filteredPosts.map((post) =>
            <div key={post.id} className={styles.singlePost} onClick={() => setCurrentSelectedPost(post)}>
              <p> Id: {post.id}</p>
              <p className={styles.postTitle}>{post.title}</p>
            </div>)}
        </div>}
        {currentSelectedPost && <SinglePostWindow generalDataAndTools={{ ...generalDataAndTools }} post={currentSelectedPost} setCurrentSelectedPost={setCurrentSelectedPost} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} allPosts={allPosts} setAllPosts={setAllPosts} currentUserEmail={currentUser.email} />}
        {isAddPostWindowShow &&
          <AddWindow setIsAddWindowShow={setIsAddPostWindowShow} baseItem={{
            userId: currentUser.id,
            title: '',
            body: ''
          }} propertiesArr={["title", "body"]} url={`posts`} setFilteredItems={setFilteredPosts} setAllItems={setAllPosts} />
        }
        </div>
    </div>
  )
}

export default Posts