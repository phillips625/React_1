// This is an example of a functional component has it doesn't have classes. It is also simpler.

// This component here (video_list) has no need for state. It doesn't record any user interaction or re-render itself in any fashion,
// so we can make it a plain functional component. 

import React from 'react';
import VideoListItem from './video_list_item';

// The props (aka 'videos' in 'VideoList videos') we set in index.js would arrive here in VideoList as an argument (we call it
// props in this case). 
// NB: If we are using a class based component, use 'this.props'. 

// Also try to avoid using the "For Loop". Use 'Maps' instead. 

/////////////////// MAP EXAMPLE.
// var array = [1,2,3];
// array.map;           Result: function map() { [native code] }

// array.map (function (number) { return number * 2});         Result: [2, 4, 6]

// array.map (function (number) { return '<div>' + number + '</div>'});      Result:  ["<div>1</div>", "<div>2</div>", "<div>3</div>"]

const VideoList = (props) => {

// For each video element, we get a function that gets called.
// 'const videoItems' saves a reference to the property name that gets returned. 'const videoItems ' equals the result of the mapping
// function. 'videoItems' is an array of video 
    const videoItems = props.videos.map((video) => {
        // return <VideoListItem video = {video: video} />;
            // OR
        // Instance of VideoListItem (which sets the constructor in VideoListItem to {video})
        // '{video.etag}' provides a key for each element in our list (hence removes the console error). 
        // etag' is a unique identifier property which is found in the browser console. Click 'Network', click 'Search?part..',
        // click 'Preview', click 'Items' dropdown menu. 
        // ALWAYS ADD A KEY TO EACH LIST ITEM
        return (
            <VideoListItem 
            // We're taking props that comes from app and we're passing to VideoListItem. We're passing all the videos 
            // from props argument into the VideoListItem
            onVideoSelect = {props.onVideoSelect}

            key = {video.etag} 
            video = {video} />
        );
    });

    // This would give an array of videos
    // const videos = props.videos;  

    return (
        // ul because it's going to be returning a list of videos. 'className' is the equivalent of class (in CSS). This is done to avoid naming conflict with the class (in component). 
        // Use bootstrap to call class names col-md-4 and list-group.
        <ul className = "col-md-4 list-group">

            {/*This prints out the length of any videos (array) that get passing in here.
            "{props.videos.length}" is a test to confirm that we're communicating successfully 
            from index.js down to video_list.js */}
            {/* {props.videos.length} */}

            {/* We use curly braces since we're referencing a Javascript variable. JS know that 'videoItems' is an array 
            , so JS would render each video with an li. */}

            {videoItems}

        </ul>
    );
};

// Export this component so that other files can use it as well.
export default VideoList;