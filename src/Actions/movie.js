import fetch from "node-fetch";

import config from "../config";
let {key = "", baseEndPoint = "", responseHandler} = config;

export function getPopularMovie(page = 1){
    return (dispatch) => {
        //https://api.themoviedb.org/3/movie/popular?api_key=fc7424d6c38073f984212eaf501c3a54&language=en-US&page=1
        fetch(`${baseEndPoint}/3/movie/popular?api_key=${key}&language=en-US&page=${page}`)
        .then(responseHandler)
        .then((response) => {
            //let {results = []} = response;
            dispatch({
                type : "GET_POPULAR_MOVIE",
                movies : response
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function getWeeklyTrendingMovie(page = 1){
    return (dispatch) => {
        //https://api.themoviedb.org/3/movie/popular?api_key=fc7424d6c38073f984212eaf501c3a54&language=en-US&page=1
        fetch(`${baseEndPoint}/3/trending/movie/week?api_key=${key}&language=en-US&page=${page}`)
        .then(responseHandler)
        .then((response) => {
            //let {results = []} = response;
            dispatch({
                type : "GET_POPULAR_MOVIE",
                movies : response
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function searchMovies(query = "", page = 1,  adult = false){
    return (dispatch) => {
        //https://api.themoviedb.org/3/search/movie?api_key=fc7424d6c38073f984212eaf501c3a54&language=en-US&query=${query}&page=1&include_adult=false
        fetch(`${baseEndPoint}/3/search/movie?api_key=${key}&language=en-US&page=${page}&query=${query}&include_adult=${adult}`)
        .then(responseHandler)
        .then((response) => {
            let {results = []} = response;
            dispatch({
                type : "GET_POPULAR_MOVIE",
                movies : response
            })
            if(results.length == 0){
                dispatch({
                    type: "SEARCH_RESULT",
                    noresult: true 
                })
            } else {
                dispatch({
                    type: "SEARCH_RESULT",
                    noresult: false 
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}


export function getMovieDetail(id = ""){
    if(id){
        return (dispatch) => {
            //https://api.themoviedb.org/3/movie/{movie_id}?api_key=fc7424d6c38073f984212eaf501c3a54&language=en-US
            fetch(`${baseEndPoint}/3/movie/${id}?api_key=${key}&language=en-US`)
            .then(responseHandler)
            .then((response) => getCasts(id, response))
            .then(({response, casts}) => {
                response["casts"]= casts                
                dispatch({
                    type : "GET_MOVIE_DETAIL",
                    detail : response
                })
            })
            .catch((error) => {
                console.log(error);
            })
        } 
    }
}

function getCasts(id, response){
    //https://api.themoviedb.org/3/movie/335983/credits?api_key=fc7424d6c38073f984212eaf501c3a54
    return fetch(`${baseEndPoint}/3/movie/${id}/credits?api_key=${key}`)
    .then(responseHandler)
    .then((casts) => {
        return Promise.resolve({casts, response});
    })
    .catch((error) => {
        return Promise.resolve({response});
    })
}