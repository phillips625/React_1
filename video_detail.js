// We're going to be using a functional component here as we don't have to maintain a state
import React from 'react';

// const VideoDetail = (props) => {

const VideoDetail = ({video}) => {

// This if statement is include because of the error message when React tries to render a video property that hasn't been loaded
// yet by YouTube (remember, render function and the constructor in index.js runs at the same time - cos render just can't bloody wait for the constructor to be set first.)
// This is not something that you want to do very often and you always want to be able to locate the videos on a high level component     
    if (!video){
        // Because of the return statement, if the code enters the if statement, the rest of the code (const videoId = video.id.vi....) 
        // will not be ran.
        return <div>Loading...</div>
    }

    const videoId = video.id.videoId; 

    // const url = 'http://www.youtube.com/embed/' + videoId;
                // OR USING ES6 MAGICAL SYNTAC
    const url = `http://www.youtube.com/embed/${videoId}`;

    return (
        <div className = "video-detail col-md-8"> 
            <div className = "embed-responsive embed-responsive-16by9">

                {/*iframe points to the above const url*/} 
                <iframe className = "embed-responsive-item" src = {url}> </iframe>
            </div>

            <div className = "details"> 
                <div> 
                    {/*Use {} when referencing a JS variable*/}
                    {video.snippet.title}
                </div>
                <div> 
                    {video.snippet.description}
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;