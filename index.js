// Install lodash function: npm install --save lodash. This library is used to throttle/delay the video
import _ from 'lodash';

/*
        Order of execution
1. Constructor and render() runs at the same time at first
2. A few milliseconds pass
3. YTSearch tend kicks off, loading the state with videos
4. Because state has changed, App renders (aka, the render function is called)
*/


//This JSX gets transpiled to vanilla JS (For more info: http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=react%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&experimental=false&loose=false&spec=false&code=const%20App%20%3D%20function()%20%7B%0A%0A%2F%2F%20The%20boiler%20plate%20package%20(Babel%20and%20Webpack)%20translates%20this%20ES6%20code%20to%20something%20that%20the%20browser%20can%0A%2F%2F%20understand%0A%20%20%20%20return%20%3Cdiv%3E%20Sup%20%3C%2Fdiv%3E%0A%7D&playground=true)
// React was created to help you write cleaner code.

// Finds the react library, installed in the application as a dependency (it is installed in the
// "node_modules" folder), and assign it to the 'React' variable. Hence we have imported 'react' as a Javascript module into the file
// It goes to find the 'App' variable and assigns it to React.
// Now when the transpiler compiles the code, it would check that the 'React' variable exists. 
//'react' know how to nest components and bring them together, but has no idea how to render
// them to the DOM.  Use 'react-dom' to do this. 

// REFACTORING FROM FUNCTIONAL COMPONENT TO CLASS COMPONENT
// import React from 'react';

    //TO
import React, {Component} from 'react'; 

// We now have access to the react-dom library via ReactDOM 
import ReactDOM from 'react-dom';

// In order to get access to the search package we downloaded, we need to import it to this file.
// YTSearch is like a function (it accepts an object with the search term and the api key arguments). 
import YTSearch from 'youtube-api-search';

// Imports the default export from search_bar file
// Need a file reference as search_bar file is not a library like react or react-dom (in the node_module)
// file.
import SearchBar from './components/search_bar';

// './' means in the current directort
import VideoList from './components/video_list';

import VideoDetail from './components/video_detail';

//'Const' (which means the content doesn't change) and 'Let' are used in ES6 to declare classes.
// This API key allows us to make request to YouTube

//          ON TERMINAL (To download the package that lets u make youtube search request using the API key
//                       and the search term)
// npm install --save youtube-api-search ('--save' means please save the package to our Package.JSON file
//                                       (package.json file is a list of dependencies that the project has.))

const API_KEY = 'AIzaSyB2-FRrajFZ4BLKR9bb-LogU0_nzZ-Mftg';

/* Move this to the constructor so that the empty array can be populated with videos. 
// Passing in the object "{key:...}" and a second argument (a function that gets called with some response data). Since data would be
// changing over time, it sounds like using state would be a good idea (think data change = use of state). 
YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
    console.log(data);
});
*/
// STEP 1: Create a new component which should produce some HTML
//'const' is an ES6 syntax. It's similar to var but this time we're saying that the 
// value of 'App' isn't going to change
// 'App' is known as a component and it is a class as opposed to an instance of a class. 
// Think about App has a factory of the instances that gets rendered to the DOM. We need 
// to instantiate our components before passing it to the DOM. 

/*

// Old ES6 Syntax
const App = function() {
    return <div> Sup </div>;
}
*/
//                      OR

// New ES6 syntax

// Function-based component. This is useful for taking in information and spitting out JSx while Class-based component helps
// us keep track of state. 

// The most parent component (app in this case) must be responsible for fetching data. 

// REFACTORING FROM FUNCTIONAL COMPONENT TO CLASS COMPONENT

// const App = () => {
// Returns JSx
// The boiler plate package (Babel and Webpack) translates this ES6 code to something that the browser can
// understand
 //   return ( 
   //         <div>                                           {/* Wassup */}
                {/*Render SearchBar in the App component. Rem: Text (Wassup) was here formally
                which is already in a rendered form, hence the reason why you have to render the SearchBar 
                component here. Hence, the child component is 'SearchBar'. This instance of SearchBar automatically calls the
                constructor in the SearchBar component. */}
         //       <SearchBar />
         //    </div>
  //  );
// };


            // TO  
 class App extends Component {

     constructor(props) {
         super(props);

    // this.state would contain a list of videos/objects
         this.state = { 
             videos: [],
             selectedVideo: null
        };            // This is 'this.state.videos' 
        
        /// This calls the 'videoSearch(term)' function below
        this.videoSearch('surfboards');

      // Whenever the App first boots up, we get an instance of app on the screen, the constructor would run right away, then we
  // immediately kick-off a search using YTSearch with the term 'surfboards'. The call-back function data would be called with the 
  // list of videos.  

    // Move this to the constructor so that the empty array can be populated with videos. 

    // The instant the component is rendered, it kick off a search and when the search is complete,
    // it updates the values of "this.setState({videos});" with the new list of videos.
     
     //   YTSearch({key: API_KEY, term: 'surfboards'}, function(data) {
                        // OR

        ///////Replaced by the Call back function below.//////
       /* YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
            // Here is where you update the state with a new list of videos. 
            
            // This only works if the property's key and value are the same. 
            //this.setState({videos: videos});
                // OR
            // this.setState({videos});  // Short form ES6 syntax
                        // OR
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
        */
     }

    // Call back function. 'term' is basically whatever the user types into the input. This is where the Youtube search is done
    videoSearch(term) {
        /////// Same as the code in the constructor (changed 'surfboards' to term)
            YTSearch({key: API_KEY, term: term}, (videos) => {
            // Here is where you update the state with a new list of videos. 
            
            // This only works if the property's key and value are the same. 
            //this.setState({videos: videos});
                // OR
            // this.setState({videos});  // Short form ES6 syntax
                        // OR
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

// You would think render() doesn't kick off until the constructor is set, but render() in reality runs at the same time as the 
// constructor.
// Render is called when state is updated or changes. 
     render() {
         // Debounced version of video search. Throttling video search. 'debounce' makes sure that we 
         // can only get a version of a video once every 300 ms.
                const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

// Returns JSx
// The boiler plate package (Babel and Webpack) translates this ES6 code to something that the browser can
// understand
         return ( 
            <div>                                           {/* Wassup */}
                {/*Render SearchBar in the App component. Rem: Text (Wassup) was here formally
                which is already in a rendered form, hence the reason why you have to render the SearchBar 
                component here. Hence, the child component is 'SearchBar'. This instance of SearchBar automatically calls the
                constructor in the SearchBar component. */}

                {/* SearchBar calls Property name, 'onSearchTermChange', (it would do so with a string (term)) 
                is passed a function where the term will call videoSearch(term), which calls the above function (which
                does a youtube search and everyone is happy). videoSearch method is passed down into SearchBar. */}

                {/*<SearchBar onSearchTermChange = {term => this.videoSearch(term)}/>*/}

                {/*Passing videoSearch to onSearchTermChange property*/}
                <SearchBar onSearchTermChange = {videoSearch}/>

                    {/*Picks the first video*/} 
               {/* <VideoDetail video = {this.state.videos[0]}/> */}

                <VideoDetail video = {this.state.selectedVideo}/>
                
                {/*Passing data/videos from the parent component (aka App) to the child component, VideoList. 
                Passing data like this: videos = {this.state.videos}, is refered to as passing props. The data we're 
                passing from 'App' to 'VideoList videos' is referred to as a 'prop'. We're essentially passing prop 'videos'
                into VideoList. Anytime the App component re-renders (aka due to update in state), VideoList would get the new 
                videos as well.  
                */}
                <VideoList 
                    // onVideoSelect function. selectedVideo is an CALL-BACK FUNCTION argument. selectedVideo updates the App's state with the selected
                    // video (WHICH IS COUNTER INTUITIVE). It takes a video, selectedVideo, and updates the state in this.setState({selectedVideo}).
                    // onVideoSelect is passed as a property to videoList
                    onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
                    videos = {this.state.videos}/>
             </div>
     );
    }
 };

// STEP 2: Take this component's HTML and put it on the page (in the DOM)

// React, pls render my element to the DOM. Even though React is a dependency (which was added when we
// ran "NPM install", we have to explicitly say that we want access to React).
// React.render(App);

// Use ReactDOM instead since you want to touch the DOM directly
// This is passing App class, but we need to pass an instance of App
// ReactDOM.render(App);

// This now creates an instance of App and passes it to ReactDOM.render. The code after the 
// comma tells ReactDOM where on the page 'App' should be rendered to. 
// 'document.querySelector('.container')' goes to find div with the class (think css) 'container' and
// renders the App instance there. 

// The '</>' in <App/> creates an instance of the App class
ReactDOM.render(<App/>, document.querySelector('.container'));










/*

CHALLENGE: Must kill npm server for it to work

SOLUTION: 

In the 'webpack.config.js' file, you can add in another section to the config object like the following:

    var config = {
      ....rest of the stuff in this file
      devServer: {
        historyApiFallback: true,
        watchOptions: { poll: true }
      }
    };

Add in that 'watchOptions' part and you should be good to go.


*/	