import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from './store';
import Routes from "./routes";

// const Index = () => {
//     return <div>Hello React!</div>;
//   };

// render(
//     <Index />, document.getElementById("root")
// )

render(
    <Provider store = {store}>
        <Routes />
    </Provider>, 
    document.getElementById("root")
);