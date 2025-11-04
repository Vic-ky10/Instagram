import React, { useEffect, useState } from 'react'
import Sidebar from './SideBar/Sidebar'
import Feed from './Feeds/Feed'
import Suggestion from './Suggestions/Suggestion'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
    
    const [dark, setDark] = useState(() => {
  const savedTheme = localStorage.getItem("darkMode");
  return savedTheme === "true";
});

  const darkMode = () => { 
  setDark((prev) => {
  const newTheme = !prev;
  localStorage.setItem("darkMode", newTheme); // store the new one
  return newTheme;
});
 }

  useEffect(() => {
    document.body.className = dark ? 'dark-col' : 'light-col'
  },[dark])


  return (
    <>
      <div className={dark ? 'dark-col' : 'light-col'}>


        <div className="app-container  ">
          <div className="sidebar-section">
            <Sidebar darkMode={darkMode} dark={dark} />
          </div>
          <div className="feed-section">
            <Feed />
          </div>
          <div className="suggestion-section">
            <Suggestion />
          </div>
        </div>


        {/* // for mobile// */}

        <div className="bottom-nav">
          <i className="bi bi-house" style={{ color: dark ? 'white' : 'black' }} ></i>
          <i className="bi bi-search" style={{ color: dark ? 'white' : 'black' }}></i>
          <i className="bi bi-plus-square" style={{ color: dark ? 'white' : 'black' }}></i>
          <i className="bi bi-camera-reels" style={{ color: dark ? 'white' : 'black' }}></i>
          <div  onClick={darkMode} style={{ cursor: 'pointer' }}>
            {dark ? (<i className="bi bi-sun-fill"></i> ) : (<i className="bi bi-moon-fill"></i>)}
          </div>
          <div

            style={{ color: dark ? 'white' : 'black' }}
            onClick={() => navigate('/profile')}
          >
            <i className="bi bi-person-circle" style={{ color: dark ? 'white' : 'black' }}> </i> Profile
          </div>
        </div>

      </div>

    </>
  )
}

export default App