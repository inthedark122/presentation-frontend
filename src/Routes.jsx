// @flow
import * as React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import ProjectListPage from "./pages/Project/ProjectListPage.jsx";
import SlidesPage from "./pages/Slide/SlidesPage.jsx";

const Routes = () => (
    <Switch>
        <Route path="/projects" exact component={ProjectListPage} />
        <Route path="/projects/:projectId/slides/:slideIndex" exact component={SlidesPage} />
        <Redirect to="/projects" />
    </Switch>
);

export default Routes;
