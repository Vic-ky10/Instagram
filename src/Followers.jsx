import React, { useContext } from "react";
import { FollowersContext } from "./FollowersContext";
import "./Style-follow.css"
 function FollowersPage() {
   const { followers, removeFollower } = useContext(FollowersContext);

  return (
    <div className="followers-page">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          Followers{" "}
      <span className="followers-count">
            {followers.length}
          </span>
        </h3>
        {followers.length > 0 && (
          <span className="text-muted small">
            Following {followers.length} people
          </span>
        )}
      </div>

      {followers.length > 0 ? (
        followers.map((follower) => (
          <div
            className="follower-card d-flex justify-content-between align-items-center mb-3 p-2"
            key={follower.id}
          >
            <div className="d-flex align-items-center">
              <img
           className="rounded-circle follower-img"
                src={follower.userImage}
                alt={follower.username}
              />
              <div className="ms-3">
            <h6 className="mb-0">{follower.username}</h6>
                <small className="text-muted">@{follower.username}</small>
              </div>
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
          You don’t have any followers yet 
        </p>
      )}
    </div>
  );
}

export default FollowersPage;
