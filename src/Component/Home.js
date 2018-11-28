import React , {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {Grid} from "@material-ui/core";
import Search from '@material-ui/icons/Search';
import InfiniteScroll from 'react-infinite-scroller';

import Layout from "../Layout";
import MovieCard from "./MovieCard";
import {getPopularMovie, getWeeklyTrendingMovie, searchMovies} from "../Actions/movie";

class Index extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMobile : false,
            type: "popular",
            searchParam: ""
        }

        this._searchMovie = this.searchMovie.bind(this);
        this._onSearch = this.onSearch.bind(this);
    }

    componentWillMount(){
        if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)){
            this.setState({isMobile: true})
        } else {
            this.setState({isMobile: false});
        }
        let {match : {params : {query = ""}= {}} ={}} = this.props;
        let {location : {pathname = ""} = {}} = this.props;
        let type = "popular";
        if(pathname.includes("/trending")){
            type = "trending";
        } else if(pathname.includes("/search")){
            type = "search";
        }
        this.setState({type: type, searchParam: query});
    }

    componentDidMount(){
        let {type = "popular"} = this.state;

        if(type == "popular"){
            this.props.getPopularMovie();
            this._getNextMovie = this.props.getPopularMovie;
        } else if(type == "search"){
            let {match : {params : {query = ""}= {}} ={}} = this.props;
            this.props.searchMovies(query, 1);
            this._getNextMovie = this.props.searchMovies.bind(this, query);
        } else {
            this.props.getWeeklyTrendingMovie();
            this._getNextMovie = this.props.getWeeklyTrendingMovie;
        }
    }

    searchMovie(event){
        let {keyCode} = event;
        if(keyCode == 13){
            window.location.href = `/movies/search/${event.target.value}`;
        }
    }

    onSearch(event){
        this.setState({searchParam : event.target.value});
    }

    getLabel(){
        let {type = "popular"} = this.state;
        let html = "Popular";
        
        if(type == "popular"){
            html = "Popular";
        } else if(type == "search"){
            html = "Search";
        } else {
            html = "Trending";
        }
        return html;
    }
    
    render(){
        let {
            props : {movies = {}, movies : {noresult = false} = {}},
            state : {isMobile = false, type = "popular", searchParam = ""} = {}
        } = this;
        return <Layout>
            <div className = "search-area">
                 <Search className = "search-icon" />
                <input className = "search-input" type = "text" placeholder = "Search Movies" onKeyUp = {this._searchMovie} onChange = {this._onSearch} value = {searchParam}/>
            </div>
            <div style={{width: isMobile ? "100%" : "80%", margin: 'auto'}}>
                <h2 className = "title">{this.getLabel()} Movies </h2>
                <MovieCard movies = {movies} isMobile = {isMobile} classes = "movie-grid" getMoreData = {this._getNextMovie}/>
                {type == "search" && noresult ? <p> No result found !!</p> : ""}
            </div>
        </Layout>
    }
}

const mapStateToProps = (state) => {
    let {movies = {}} = state
    return {
        movies
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPopularMovie: (page = 1) => {
          dispatch(getPopularMovie(page));
      },
      getWeeklyTrendingMovie: (page =1) => {
        dispatch(getWeeklyTrendingMovie(page));
      },
      searchMovies: (query = "", page = 1) => {
          dispatch(searchMovies(query, page));
      }
    };
}
  
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));