import React, { Component } from 'react';
import axios from 'axios'

export default  class App extends Component {
 constructor(props) {
   super(props) 

   this.state = {
     text: '',
     movies: [],
  
  
   }
   this.handleMovie = this.handleMovie.bind(this);
   this.handleTextChange = this.handleTextChange.bind(this);
 }
handleMovie(){
  
  if (this.state.text === ''){
    alert("pick a movie")
    return false;
  }

    axios({ url: `https://www.omdbapi.com/?s=${this.state.text}&apiKey=27eb6a37`})
   .then((response) => {
     if (response.data.Search) {
      this.setState({movies: response.data.Search})
     } else {
       alert('no result found')
     }
     
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
    <div className='container'>
    <div className="col-md-10">
     <h1 className='header text-center'>Find your Favorite Movies</h1>
     <input className="w-75 search" value={this.state.text} onChange={this.handleTextChange} placeholder="type movie here"/>
     <button className="btn btn-info w-25"   alert="movie not found"onClick={this.handleMovie}>Search Movies</button>
     <div className='card'>
         <h3 className="text-center header-3 text-primary">Movie Results</h3>
         <ul>
        {this.state.movies.map((movie, ndx, array)=> {
                return <FindItems
                  key={ ndx }
                  movie={ movie }
                  text={ '' }/>

              })}
            </ul>
         </div>
     </div>
   </div>
 );
 }
}


 class FindItems extends Component {
    constructor (props){
      super (props);
      this.state = {
        isClicked: false,
         movie:{} 
   
   
       }
      this.movieItems = this.movieItems.bind(this);
      this.movieTitles = this.movieTitles.bind(this);
    }

  movieItems(event){
  this.setState({movies: event.target.name });
  }

  movieTitles(){
    axios({ url: `https://www.omdbapi.com/?i=${this.props.movie.imdbID}&apiKey=27eb6a37`})
    .then((response) => {
     this.setState({ movie: response.data, isClicked: !this.state.isClicked })
    })
    .catch( function(error){
    })
 
     }
  
     render() {
      return (
        (!this.state.isClicked) ?
          <div className='col-sm-12'>
            <div className='card'>
              <div>
                <li>
                  <div className='media-left'>
                    <img src={this.props.movie.Poster} alt="description" className='media-object img-rounded' />
                  </div>
                  <div className='media-body'>
                    <div className='text-info'> Movie Title: {this.props.movie.Title} </div>
                    <button href='#' className='btn btn-info btn-centered' onClick={this.movieTitles}>Click for more info</button>
                  </div>
                  </li>
              </div>
            </div>
          </div>
          :
            <div className='card'>
              <h4 className="card-header text-center text-info text-bold"> Movie Title: {this.props.movie.Title} </h4>
              <div className='media'>
                <div className='media-right'><br />
                  <img src={this.props.movie.Poster} alt="description" className='media-object img-rounded' /><br />
                </div>
                <div className='media-body'><br />
                  <div className='text-warning'> Year: {this.props.movie.Year}</div>
                  <div className='text-primary'>Actors: {this.state.movie.Actors}</div>
                  <div className='text-danger'>Plot: {this.state.movie.Plot}</div>
                  <div className='text-success'>BoxOffice: {this.state.movie.BoxOffice}</div>
                  <div className='text-active'>Runtime: {this.state.movie.Runtime}</div>
                  <div className='text-success'>Director: {this.state.movie.Director}</div>
                  <div className='text-danger'>Awards: {this.state.movie.Awards}</div>
                  <div className='text-primary'>Genre: {this.state.movie.Genre}</div>
                  <div className='text-primary'>Rated: {this.state.movie.Rated}</div>
                  <div className='text-primary'>Language: {this.state.movie.Language}</div>
                  <div className='text-primary'>Country: {this.state.movie.Country}</div>
                  <div className='text-primary'>Production: {this.state.movie.Production}</div>
                  <div className='text-primary'>Released: {this.state.movie.Released}</div>
                  <button href='#' className='btn btn-info btn-centered' onClick={this.movieTitles}>Less info</button>
                </div>
              </div>
            </div>
   )
   } 
   }   



   //name="search" name="go"