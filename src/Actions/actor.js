import fetch from "node-fetch";

import config from "../config";
let {key = "", baseEndPoint = "", responseHandler} = config;

export function getActorDetail(id = ""){
    if(id){
        return (dispatch) => {
            //https://api.themoviedb.org/3/person/37632?api_key=fc7424d6c38073f984212eaf501c3a54&language=en-US
            fetch(`${baseEndPoint}/3/person/${id}?api_key=${key}&language=en-US`)
            .then(responseHandler)
            .then((response) => getCasts(id, response))
            .then(({response, movies = []}) => {
                response["movies"]= movies                
                dispatch({
                    type : "GET_ACTOR_DETAIL",
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
    //https://api.themoviedb.org/3/person/37632/movie_credits?api_key=fc7424d6c38073f984212eaf501c3a54&language=en-US
    return fetch(`${baseEndPoint}/3/person/${id}/movie_credits?api_key=${key}&language=en-US`)
    .then(responseHandler)
    .then((movies) => {
        return Promise.resolve({movies, response});
    })
    .catch((error) => {
        return Promise.resolve({response});
    })
}