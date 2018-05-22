import React, { Component } from 'react';
import axios from 'axios'

export default  class App extends Component {
 constructor(props) {
   super(props) 

   this.state = {
     text: '',
     movies: []
  
   }
   this.handleMovie = this.handleMovie.bind(this);
   this.handleTextChange = this.handleTextChange.bind(this);
 }
handleMovie(){
    axios({ url: `https://www.omdbapi.com/?s=${this.state.text}&apiKey=27eb6a37`})
   .then((response) => {
     this.setState({movies: response.data.Search})
   })

   .catch( function(error){
   })
 }
 //componentWillMount
 handleTextChange(event) {
  this.setState({text: event.target.value });
 }


 render() {
   return (
    
   <div>
     <h1>Find your Favorite Movies</h1>
     <input name="search" value={this.state.text} onChange={this.handleTextChange}/>
     <button name="go" onClick={this.handleMovie}>Search Movies</button>
     <div>
         <h3>Movie Results</h3>
         <ul>
        {this.state.movies.map((movie, ndx, array)=> {
                return <FindItems
                  key={ ndx }
                  movie={ movie }
                  text={ '' }
                />
           })}
         </ul>
         
     </div>
   </div>
 );
 }
}


 class FindItems extends Component {
    constructor (props){
      super (props);
      this.state = {
   movie:{Rated: "click pic", Released:'click pic', Actors:'click pic' }
       }
      this.movieItems = this.movieItems.bind(this);
      this.movieTitles = this.movieTitles.bind(this);
    }

  movieItems(event){
    console.log("this");
  this.setState({movies: event.target.name });
  }

  movieTitles(){
    axios({ url: `https://www.omdbapi.com/?i=${this.props.movie.imdbID}&apiKey=27eb6a37`})
    .then((response) => {
      this.setState({movie: response.data})
      console.log(this.state.movie.Rated)
    })
    .catch( function(error){
    
    })
     }
  
  render() {
    return(

      <div>
      <div>
   <button href='#' onClick={this.movieTitles}><img src= {this.props.movie.Poster} alt="description" /></button>
    </div>
    <div id='center'> <li> {`${this.props.movie.Title} Year: ${this.props.movie.Year} Type: ${this.state.movie.Type}  Rated: ${this.state.movie.Rated} 
    Released: ${this.state.movie.Released} Actors: ${this.state.Actors}`} </li></div>
      </div>
    
    
      );
    }
}
 

//tt1981115