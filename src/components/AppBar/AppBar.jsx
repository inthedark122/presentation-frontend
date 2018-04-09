// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {compose, lifecycle, withHandlers} from "recompose";
import AppBarMaterial from "material-ui/AppBar/AppBar";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button/Button";
import Toolbar from "material-ui/Toolbar/Toolbar";
import Edit from "material-ui-icons/Edit";
import Add from "material-ui-icons/Add";
import Delete from "material-ui-icons/Delete";
import SelectAll from "material-ui-icons/SelectAll";
import {Link} from "react-router-dom";
import {type RootStoreType} from "../../mobx/RootStore";
import AppBarEditorSelect from "./AppBarEditorSelect.jsx";
import AppBarAddProject from "./AppBarAddProject.jsx";

type PropsType = {|
    editorStore: $PropertyType<RootStoreType, "editorStore">,
    slideStore: $PropertyType<RootStoreType, "slideStore">,
    projectStore: $PropertyType<RootStoreType, "projectStore">,
|};

const CHAR_CODE_EDIT = 69;

const AppBar = ({editorStore, slideStore, projectStore}: PropsType) => {
    if (editorStore.isFullScreen) {
        return null;
    }

    return (
        <AppBarMaterial position="sticky" color="default">
            <Toolbar>
                <Button component={Link} to="/projects">
                    Проекты
                </Button>
                <IconButton onClick={projectStore.toggleOpenAdd}>
                    <Add />
                </IconButton>
                {slideStore.activeSlide && slideStore.activeSlide.model ? (
                    <React.Fragment>
                        <IconButton onClick={editorStore.openCloseEditorSelect}>
                            <SelectAll />
                        </IconButton>
                        {editorStore.editorId === "0" || !slideStore.activeSlide.model ? null : (
                            <React.Fragment>
                                <IconButton onClick={editorStore.openCloseEditor} variant="flat">
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        slideStore.deleteElement(editorStore.editorId);
                                        editorStore.leave();
                                    }}
                                    variant="flat"
                                >
                                    <Delete />
                                </IconButton>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ) : null}
            </Toolbar>
            <AppBarEditorSelect open={editorStore.openEditorSelect} onCloseDialog={editorStore.openCloseEditorSelect} />
            <AppBarAddProject />
        </AppBarMaterial>
    );
};

export default compose(
    inject("editorStore", "slideStore", "projectStore"),
    withHandlers({
        onKeyDownEdit: (props) => (event: SyntheticEvent<HTMLButtonElement>) => {
            if (event.keyCode === CHAR_CODE_EDIT && (event.ctrlKey || event.metaKey)) {
                props.editorStore.openCloseEditor();
            }
        },
    }),
    lifecycle({
        componentDidMount() {
            document.addEventListener("keydown", this.props.onKeyDownEdit);
        },
        componentWillUnmount() {
            document.removeEventListener("keydown", this.props.onKeyDownEdit);
        },
    }),
    observer,
)(AppBar);
