"use strict";

import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Style from "./Sass/index.scss";
import Home from "./Component/Home";
import Movie from "./Component/Movie/Movie";
import Actor from "./Component/Actor/Actor";

const AppRouter = () =>
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movies/trending" exact component={Home} />
            <Route path="/movies/search/:query" exact component={Home} />
            <Route path="/movie/:id" exact component={Movie} />
            <Route path="/actor/:id" exact component={Actor} />
            {/* <Route path="/page2/" component={Page2} /> */}
        </Switch>
    </Router>

export default AppRouter;

