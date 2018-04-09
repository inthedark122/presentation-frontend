// @flow
import * as React from "react";
import cn from "classnames";
import {compose, withHandlers} from "recompose";
import {inject, observer} from "mobx-react";
import {withStyles} from "material-ui/styles";
import GridMaterial from "material-ui/Grid/Grid";
import {type EditorModelType} from "../../mobx/Models/EditorModel";
import {getComponent} from "./Elements";

type ChildType = {
    classType: "grid" | "typography" | "code",
    childs: Array<ChildType>,
    id: string,
};

const styles = {
    component: {
        overflow: "auto",
        position: "relative",
    },
    componentSelected: {
        boxShadow: "0 0 3px 3px blue !important",
    },
};

type PropsType = {
    child: ChildType,
    classIds: string,
    classes: Object,
    editorStore: EditorModelType,
    withGrid?: boolean,
    handleClickElement: (event: SyntheticEvent<>) => void,
};

const Builder = ({child, classes = {}, classIds = "", editorStore, handleClickElement, withGrid}: PropsType) => {
    const {classType} = child;
    const Component = getComponent(classType);

    if (!Component) {
        return null;
    }

    const className = cn(classes.component, {
        [classes.componentSelected]: editorStore.editorId === child.id && !editorStore.isFullScreen,
    });

    const content = (
        <Component child={child} classIds={`${classIds}.${child.id}`} Builder={StylesBuilder} className={className} />
    );

    if (withGrid) {
        return (
            <GridMaterial style={{maxWidth: "100%"}} item onClick={handleClickElement}>
                {content}
            </GridMaterial>
        );
    }

    return content;
};

const StylesBuilder = compose(
    inject("editorStore"),
    withHandlers({
        handleClickElement: (props) => (event: SyntheticEvent<>) => {
            if (event.ctrlKey || event.metaKey) {
                props.editorStore.chooseEditorId(props.child.id);
            }
        },
    }),
    withStyles(styles),
    observer,
)(Builder);

export default StylesBuilder;
