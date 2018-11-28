import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const middleware = [thunk];
const composedEnhancers = compose(applyMiddleware(...middleware))
//const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware))

export default createStore(reducer, initialState, composedEnhancers);