// @flow
import * as React from "react";
import IconButton from "material-ui/IconButton/IconButton";
import Fullscreen from "material-ui-icons/Fullscreen";
import {withStyles} from "material-ui/styles";
import {compose} from "recompose";
import {inject} from "mobx-react";
import {type RootStoreType} from "../../mobx/RootStore";

const styles = {
    root: {
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 9999,
    },
};

type PropsType = {
    classes: Object,
    editorStore: $PropertyType<RootStoreType, "editorStore">,
};

const FullScreen = (props: PropsType) => (
    <IconButton className={props.classes.root} onClick={props.editorStore.toggleFullScreen}>
        <Fullscreen />
    </IconButton>
);

export default compose(inject("editorStore"), withStyles(styles))(FullScreen);
