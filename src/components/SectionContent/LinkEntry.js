import React from "react";
import "./LinkEntry.css";

const getLocation = function(url) {
   const urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(url);
    return urlParts[1];

};


function LinkEntry({ title, url }) {
  return (
    <div className="songRow" onClick={()=>{window.open(url)}}>
      {/*<img className="songRow__album" src={track.album.images[0].url} alt="" />*/}
      <div className="songRow__info">
        <h1>{title}</h1>
        <p>
       {getLocation(url)}
        </p>
      </div>
    </div>
  );
}

export default LinkEntry;
