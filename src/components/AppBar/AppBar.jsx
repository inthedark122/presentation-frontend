// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {compose} from "recompose";
import AppBarMaterial from "material-ui/AppBar/AppBar";
import Button from "material-ui/Button/Button";
import Toolbar from "material-ui/Toolbar/Toolbar";
import Edit from "material-ui-icons/Edit";
import Delete from "material-ui-icons/Delete";
import {Link} from "react-router-dom";
import {type RootStoreType} from "../../mobx/RootStore";
import AppBarEditorSelect from "./AppBarEditorSelect.jsx";
import AppBarAddProject from "./AppBarAddProject.jsx";

type PropsType = {|
    editorStore: $PropertyType<RootStoreType, "editorStore">,
    slideStore: $PropertyType<RootStoreType, "slideStore">,
    projectStore: $PropertyType<RootStoreType, "projectStore">,
|};

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
                <Button onClick={projectStore.toggleOpenAdd}>Добавить</Button>
                {slideStore.activeSlide && slideStore.activeSlide.model ? (
                    <React.Fragment>
                        <Button onClick={editorStore.openCloseEditorSelect}>Выбор поля</Button>
                        {editorStore.editorId === "0" || !slideStore.activeSlide.model ? null : (
                            <React.Fragment>
                                <Button onClick={editorStore.openCloseEditor} variant="flat">
                                    <Edit />
                                </Button>
                                <Button
                                    onClick={() => {
                                        slideStore.deleteElement(editorStore.editorId);
                                        editorStore.leave();
                                    }}
                                    variant="flat"
                                >
                                    <Delete />
                                </Button>
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

export default compose(inject("editorStore", "slideStore", "projectStore"), observer)(AppBar);
