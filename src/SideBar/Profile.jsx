import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FollowersContext } from "../FollowersContext";
import './Profile.css'
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("posts"); 
  const { followers, removeFollower } = useContext(FollowersContext);
 const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("/api/profile")
      .then((data) => setProfile(data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleOnChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put("/api/profile", profile)
      .then(() => alert("Profile updated ✅"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-container">
      {profile ? (
          <>
        
          <div className="profile-header text-center my-4">
             <button className='btn btn-outline-danger top-left-btn ms-5'  onClick={() => navigate('/')}>Home</button>
            <img
              className="rounded-circle profile-pic"
              src={profile.userImage}
              alt="Profile"
            />
            <h2 className="mt-2">{profile.username}</h2>
            <p className="text-muted">@{profile.username}</p>

            <div className="d-flex justify-content-center gap-3 my-3">
              <button
            className={`btn ${
              activeTab === "posts" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
           </button>
              <button
               className={`btn ${
                  activeTab === "followers" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("followers")}
              >
                Followers ({followers.length})
              </button>
              <button
                className={`btn ${
                  activeTab === "following" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("following")}
              >
                Following
              </button>
            </div>

          

            <div className="d-flex flex-column align-items-center mt-3">
              <input
                className="form-control my-2"
                type="text"
              value={profile.username}
                name="username"
              onChange={handleOnChange}
                style={{ maxWidth: "300px" }}
              />
              <input
                className="form-control my-2"
                type="text"
             value={profile.userImage}
                name="userImage"
            onChange={handleOnChange}
                style={{ maxWidth: "300px" }}
          />
              <button className="btn btn-success" onClick={handleUpdate}>
                Update Profile
              </button>
            </div>
          </div>

         
          <div className="tab-content mt-4">
            {activeTab === "posts" && (
              <div className="text-center text-muted">No posts </div>
            )}

            {activeTab === "followers" && (
              <div className="followers-tab mt-3">
                {followers.length > 0 ? (
               followers.map((follower) => (
                    <div
                      className="d-flex justify-content-between align-items-center p-2 border-bottom"
                      key={follower.id}
                    >
                      <div className="d-flex align-items-center">
                     <img
                          className="rounded-circle follower-img"
                          src={follower.userImage}
                      
                        />
              <h6 className="ms-3 mb-0">{follower.username}</h6>
                      </div>
                      <button
                   className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFollower(follower.id)}
                  >
                        Unfollow
                   </button>
                    </div>
              ))
                ) : (
                  <p className="text-muted text-center">
                    You don’t have any followers 
                  </p>
                )}
              </div>
            )}
            {activeTab === "following" && (
              <div className="text-center text-muted"> No following</div>
            )}
          </div>
        </>
      ) : (
                 <p className="text-center">Loading...</p>
      )}
     </div>
  );
}

export default Profile;
