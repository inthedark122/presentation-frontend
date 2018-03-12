// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import List from "material-ui/List/List";
import Dialog from "material-ui/Dialog/Dialog";
import {type RootStoreType} from "../../mobx/RootStore";
import AppBarEditorChild from "./AppBarEditorChild.jsx";

type PropsType = {
    open: boolean,
    onCloseDialog: () => void,
    slideStore: $PropertyType<RootStoreType, "slideStore">,
    editorStore: $PropertyType<RootStoreType, "editorStore">,
};

const AppBarEditorSelect = ({slideStore, open, onCloseDialog, editorStore}: PropsType) => {
    if (!slideStore.activeSlide || !slideStore.activeSlide.model) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onCloseDialog} fullWidth>
            <List>
                <AppBarEditorChild
                    editorId={editorStore.editorId}
                    chooseEditorId={editorStore.chooseEditorId}
                    child={slideStore.activeSlide.model}
                />
            </List>
        </Dialog>
    );
};

export default compose(inject("slideStore", "editorStore"), observer)(AppBarEditorSelect);
