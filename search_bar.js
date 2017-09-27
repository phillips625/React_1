// You need to do this everytime your code contains JSx
//import React from 'react';
import React, {Component} from 'react';

    /*
// SearchBar component.
// This is a FUNCTIONAL COMPONENT i.e a function that accepts arguments and JSx is returned. 

const SearchBar = () => {

    // This is the same as <input></input>. This would generates an HTML input that users can write 
    // stuff in. 
    return <input />;
};
    */

// Use CLASS COMPONENT so that a component can remember what happened to it since it's been rendered.
// This means: define a new class called SearchBar, and give it access to all of the functionality
// in React.Component. 
// Every class based component must have a render method. Also, a class based component allows 
// components to communicate with each other. Class components require a render function and must 
// return JSx otherwise you get an error. 
// Learn when to use a functional vs a class component.

/*
class SearchBar extends React.Component{

    // OR
Initialise like so:
import React, {Component} from 'react';
*/

/*
// We use 'class component' instead of a 'functional component' in order to add more functionality to the searchbar.
    class SearchBar extends React.Component{


        // This is the render function. 
        render() {

            // This means: create an input element, pass it a property 'onChange' with a value of this.onInputChange. This is how you
            // successfully pass an event handler to the element you want to watch for an event change. The event handler would be 
            // trigger when an event occurs. Specifically, we want to watch for the Change (from 'onChange') event on the input. onChange
            // is specifcally a 'react property' (find more info on the react documentation). 
            return <input onChange={this.onInputChange} />;
        }

        // Whenever a user uses a web app, they trigger events (e.g moving the mouse around, click on an element,etc) all the time
        // In this example, we want to know when a user types something and what it is that they typed.
        // Event Handler. Handling events in react has 2 steps. 
        // 1 Declare an event handler. This is a function that would be ran whenever an event occurs. 
        // 2 We pass the event handler to the element we want to monitor for events. In this case, we want to know when the user 
        // changes a text in the 'input' element.

        // The event handler is a method in the class. Use proper naming convention for naming event handlers. 'on' or 'handle'. 'Input' is the name of the element. 'change'
        // is the action that you want performed. AKA "whenever the input changes, run the code here".  

        //'event' is an object that encapsulates the event that occured (on 'input' in this case). It describes the
        // context or the information that occured. 
        onInputChange(event) {
            // Just to get to know a bit more about event objects.
            //console.log(event);

            console.log(event.target.value);
        }

    }
*/
///////////////////////////////////////////////////////////////////////////////////
        // Cleaned up Version of the above code

// Class-based component
        class SearchBar extends Component{

        // State is used to record and react to user events. Anytime a component is called, the render function is 
        // automatically called. This is how you initialize state in a class based component. Functional components do not
        // have states - only classed based components do. The constructor is automatically called whenever a new instance of 
        // the class is created. The constructor is set up inside our class for initialising variables, states, etc
            constructor(props) {

                // "super" calls the parent method in parent class "Component". 
                super(props);

                // We initialise 'state' by creating a new object and assigning it to this.state. The object we pass contains
                // properties (e.g term ) that we want to record on the state. In this case, we want to record the 'term' 
                // property on 'state'. 'term' aka 'search term'. Whenever the user updates the input, this is the property that 
                // would be updated. The only time we manually change state is when it's in the constructor. 
                // this.state.term is set to an empty string. 
                // The initial state is an empty string. 
                this.state = {term: ''};
            }

            render() {

                // return <input onChange={(event) => console.log(event.target.value)} />;

                        // OR
                // You can drop the bracket around the 'event' argument since it's the only one argument in this case.
                // " event => console.log(event.target.value) " is the input handle, which is a function. The result is passed
                // into the property "onChange" inside the JSx tag. 

                // this.setState({  }) contains the new state we want to give our component. 
                // this.setState({  }) changes the state of the SearchBar component. Pass in object as a 'term' and the new value 
                // value of the input. 
                return (
                    // Classname, search-bar, is basically the class name with a -. This makes styling easier
                    <div className = "search-bar">  
                        {/* Use div for styling. */}  

                        {/* Whenever we change the value of the input element, the event handler function
                        " {event => this.setState({ term: event.target.value})} " runs. We set the state using 
                        "this.setState({ term: event.target.value})" with the new value of the input "term: event.target.value".
                        Whenever we call "this.setState({ term: event.target.value})", it causes our components to re-render and
                        pushes all the information from the 'render' method unto the DOM. */}      
                        <input 

                             /* Whenever we reference/calling a javascript variable inside of JSx, use '{}'.
                            Everytime the component re-renders, we get the updated this.state.term in the DOM. Whenever you want
                            to update your component, think in terms of state.*/

                            /* If you take "onChange={event => this.setState({ term: event.target.value})}" out,
                            input wouldn't let you type anything. "value =  {this.state.term}" tells the input that
                            the value has been provided. Therefore "<input " is now a "controlled component". So the value of 
                            input would be solely dependent on the value of state.  
                               */
                            value =  {this.state.term}

                            /*When the user types in the search bar on the browser, only the value of the state change, not the input.
                            Only when the value has been set to the new value of the state does the component re-render. */ 
                            /* onChange={event => this.setState({ term: event.target.value})} */

                            /* Whenever the input changes, onChange will call onInputChange with the new value from the input with 
                            the new input value (accessed by event.target.value)*/
                            onChange={event => this.onInputChange(event.target.value)} 
                        />
                        
                                {/* value :  {this.state.term} */} 
                    </div>
                );
            }

            // Here, you want to set the state with the term and we also want to call the call-back we get from index.js
            onInputChange(term) {
                this.setState({term});
                // This calls the onSearchTermChange property in index.js with a new search term, which calls the searching function
                // (videoSearch in index.js), which goes ahead to fetch a new list of videos. 
                this.props.onSearchTermChange(term);
            }
        }

// Export the SearchBar component from the file
// To make sure that the code that what we export from this file is the 'SearchBar' component, use the code 
// below. Now any file that imports search_bar.js would get the 'SearchBar' component.
export default SearchBar;

