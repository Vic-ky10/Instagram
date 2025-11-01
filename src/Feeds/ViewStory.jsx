import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ViewStory() {

   const { id, next } = useParams();
   const [views, setViews] = useState(null);
   const navigate = useNavigate();
  



   useEffect(() => {
      fetch(`http://localhost:3000/stories/${id} `)
         .then((res) => res.json())
         .then((data) => setViews(data))
         .catch((err) => console.log(err))
    
   }, [id]);
   

   if (id > next || id <= 0) {
      navigate('/')
   };
   return (
     
             
      
      <div>    
         {views ? <div key={views.id} className=' d-flex justify-content-center align-items-center'>
            <Link to={`http://localhost:5173/story/${Number(id) - 1}/${next}`}><i className="bi bi-arrow-left-circle " style={{ fontSize: '2.5rem' }}></i> </Link>
                                  
            <img className=' story-image' src={views.storyImage} alt='story' />
            <Link to={`http://localhost:5173/story/${Number(id) + 1}/${next}`}><i className="bi bi-arrow-right-circle" style={{ fontSize: '2.5rem' }} ></i> </Link>

         </div> : <p>loading</p>}
      </div>
        
   )
}

export default ViewStory 