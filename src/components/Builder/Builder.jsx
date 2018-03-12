// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import {withStyles} from "material-ui/styles";
import {getComponent} from "./Elements";

type ChildType = {
    classType: "grid" | "typography" | "code",
    childs: Array<ChildType>,
    id: string,
};

const styles = {
    component: {
        position: "relative",
    },
};

type PropsType = {
    child: ChildType,
    classIds: string,
    classes: Object,
};

const Builder = ({child, classes = {}, classIds = ""}: PropsType) => {
    const {classType} = child;
    const Component = getComponent(classType);

    if (!Component) {
        return null;
    }

    return (
        <Component
            child={child}
            classIds={`${classIds}.${child.id}`}
            Builder={StylesBuilder}
            className={classes.component}
        />
    );
};

const StylesBuilder = compose(inject("editorStore"), withStyles(styles), observer)(Builder);

export default StylesBuilder;
