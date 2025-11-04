import React, { useEffect, useState } from 'react'


function Post() {

  const [posts, setPosts] = useState([])

  useEffect(() => {

    fetch('/api/posts')
      .then((response) =>
        response.json()
      )
      .then((data) => setPosts(data))
      .catch((err) => console.log(err.message))

  }, [])


  return (
    <div>



      {posts.map((post) => (
        <div className='m-3' key={post.id}>
          <div className='d-flex align-items-center gap-2'>
            <img
              className="rounded-circle dp"
              src={post.userImage}
              alt={`${post.username}'s profile`}
            />
            <h5>{post?.username}</h5>
          </div>
          <img className="image " src={post.postImage} alt="post image" />

          <div className="post-actions d-flex gap-3 mt-2">
            <div className="d-flex gap-4">
              <i className="bi bi-heart fs-4"></i>
              <i className="bi bi-chat fs-4"></i>
              <i className="bi bi-send fs-4"></i>
            
              <i className="bi bi-bookmark fs-4"></i>
            </div>
          </div>
          <div className="post-info mt-2">
            <div className="fw-bold">{post.Likes} likes</div>
            <div>
              <span className="fw-bold">{post.username}</span> {post.caption}
            </div>
          </div>
        </div>


      ))}
    </div>
  )
}

export default Post