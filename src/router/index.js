import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import home from "../pages/home/home";
import one from "../pages/one/one";
import reading from "../pages/reading/reading";
import readingDetails from "../pages/readingDetails/readingDetails";
import play from "../pages/play/play";
import playDetails from "../pages/playDetails/playDetails";

export default class RouterConfig extends Component{
    render(){
        return(
            <Switch>
                <Route path="/" exact component={home} />
                <Route path="/one" component={one} />
                <Route path="/reading" component={reading} />
                <Route path="/readingDetails/:id" component={readingDetails} />
                <Route path="/play" component={play} />
                <Route path="/playDetails/:id" component={playDetails} />
            </Switch>
        )
    }
}