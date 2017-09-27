// This is an example of a functional component has it doesn't have classes. It is also simpler.
import React from 'react';

// VideoListItem is intended to show each video (a thumbnail and a title) aka props contains one video at a time.
//'props' is an object. 
/*
const VideoListItem = (props) => {

    //Pulls of the video from the const object. Rem, the video_list.js file, we passed the video as 'video = {video}'
    // from 'return <VideoListItem key = {video.etag} video = {video} />;'.
    const video = props.video;
*/

        //OR

// Getting the video property (video = ..) from video_list.js. 
// {video} is equivalent to const video = props.video;. 
// {video} means that you're saying the object has a property of video, so please grab that video and assign it to a new 
// variable called video ('VIDEO' in 'const VIDEO = props.video;'). 
// 'video, onVideoSelect' pulls multiple properties off the props object

/*
    const VideoListItem = ({video, onVideoSelect}) => {
        // OR
    const VideoListItem = ({props}) => {
        const video = props.video;
        const onVideoSelect = props.onVideoSelect;
*/

const VideoListItem = ({video, onVideoSelect}) => {

// This is the response we're getting from youtube
const imageUrl = video.snippet.thumbnails.default.url;

// Checking what's in video out of curiosity
 //   console.log(video);

 // Prints out video for each video prop that enters the loop
 //   return <li>Video</li>

 // Here, we're going to add a whole bunch of mark-ups.
  return (
      // Use bootstrap to arrange the etags

      // Event, 'onClick = {() => }', is trigger when the user click on li, onVideoSelect() function is called
    <li onClick = {() => onVideoSelect(video) } className = "list-group-item">
        <div className = "video-list media">
            <div className = "media-left">
                {/*This img is for the thumbnail*/}
                  {/* Use {} in {imageUrl} because we're referencing a JS variable (imageUrl) inside our JSx */}
                <img className = "media-object" src = {imageUrl}/>
            </div>

            <div className = "media-body">
                {/*This is for the title of the video*/}
                <div className = "media-heading">{video.snippet.title}</div>
            </div>
        </div>
    </li>
  );
};

export default VideoListItem;