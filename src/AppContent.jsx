// @flow
import * as React from "react";
import {withStyles} from "material-ui/styles";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./Routes.jsx";
import AppBar from "./components/AppBar/AppBar.jsx";
import FullScreen from "./components/FullScreen/FullScreen.jsx";
import {type RootStoreType} from "./mobx/RootStore";

import "normalize.css";

type PropsType = {
    editorStore: $PropertyType<RootStoreType, "editorStore">,
    classes: Object,
};

const styles = {
    content: {
        height: "calc(100% - 106px)",
        padding: 20,
    },
    contentFullScreen: {
        height: "calc(100% - 20px)",
        padding: 10,
    },
};

const AppContent = ({editorStore, classes}: PropsType) => (
    <Router>
        <React.Fragment>
            <AppBar />
            <div className={editorStore.isFullScreen ? classes.contentFullScreen : classes.content}>
                <Routes />
            </div>
            <FullScreen />
            <DevTools position={{bottom: 0, right: 20}} />
        </React.Fragment>
    </Router>
);

export default compose(inject("editorStore"), withStyles(styles), observer)(AppContent);
