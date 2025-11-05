import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Story() {
  
  const[stories , setStories] = useState([])
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch('/api/stories')
    .then((res)=> res.json())
    .then((data) => setStories(data))
    .catch((err) => console.log(err))
  },[]);
  let next = 0;

  return (
    <div className='story d-flex overflow-y-hidden m-3 ms-4' >
      <div className="d-none">
        {next=stories.length}
      </div>
      {stories.length > 0 ? (
         stories.map((story) => (
              <div  key={story.id} className='mx-1'>
                <div className="gradiant-border">
                    
                      <img className ="rounded-circle story-dp"src={story.userImage} alt="story.id"
                      onClick={()=> {navigate(`story/${story.id}/${next}`)  }} />
                </div>
               
                <p className='text-truncate' style={{width :"50px"}} >{story.username}</p>
                </div>
         ))
      ):(
        <p>Loading ...</p>
      ) }
    </div>
  )
}

export default Story