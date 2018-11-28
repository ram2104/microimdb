import { combineReducers } from 'redux';
import Movies from "./movie";
import Actor from "./actor";

export default combineReducers({
    movies: Movies,
    actor: Actor
})
