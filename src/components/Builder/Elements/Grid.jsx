// @flow
import * as React from "react";
import {observer, inject} from "mobx-react";
import {compose, withStateHandlers} from "recompose";
import GridMaterial from "material-ui/Grid/Grid";
import Button from "material-ui/Button/Button";
import Dialog from "material-ui/Dialog/Dialog";
import List, {ListItem, ListItemText} from "material-ui/List";
import Add from "material-ui-icons/Add";
import uuidv4 from "uuid/v4";
import Editor from "../../Editor/Editor.jsx";
import {type RootStoreType} from "../../../mobx/RootStore";
import {classTypes, initialValues} from "./classTypes";

export type GridPropsType = {|
    Builder: any,
    editorStore: $PropertyType<RootStoreType, "editorStore">,
    onEdit: () => void,
    className: string,
    modalNewOpen: boolean,
    onCloseNewModal: () => void,
    onOpenNewModal: () => void,
    onAddChild: (classType: string) => void,
    child: {
        childs: Array<Object>,
        direction: string,
    },
    classes?: Object,
|};

const configs = [
    {
        classType: "select",
        label: "Направление",
        name: "direction",
        options: ["column", "row"],
    },
];

const Grid = ({
    Builder,
    className,
    child,
    modalNewOpen,
    onCloseNewModal,
    onOpenNewModal,
    onAddChild,
    editorStore,
}: GridPropsType) => {
    const {childs, direction} = child;

    return (
        <GridMaterial
            justify="center"
            alignItems="stretch"
            wrap="nowrap"
            direction={direction}
            container
            className={className}
        >
            {childs.map((gridChild, index) => (
                <GridMaterial style={{maxWidth: "100%"}} key={index} item>
                    <Builder child={gridChild} />
                </GridMaterial>
            ))}
            {editorStore.isFullScreen ? null : (
                <Button onClick={onOpenNewModal} variant="flat" mini>
                    <Add />
                </Button>
            )}
            <Editor values={child} configs={configs} />
            <Dialog open={modalNewOpen} onClose={onCloseNewModal}>
                <List>
                    {classTypes.map((classType) => (
                        <ListItem key={classType} button onClick={() => onAddChild(classType)}>
                            <ListItemText primary={classType} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </GridMaterial>
    );
};

export default compose(
    withStateHandlers(
        {
            modalNewOpen: false,
        },
        {
            onAddChild: (state, props) => (classType: string) => {
                props.child.childs.push({
                    ...initialValues[classType],
                    id: uuidv4(),
                });

                return {
                    modalNewOpen: false,
                };
            },
            onCloseNewModal: () => () => ({
                modalNewOpen: false,
            }),
            onEdit: (state, props) => () => {
                props.editorStore.setEditor();
            },
            onOpenNewModal: () => () => ({
                modalNewOpen: true,
            }),
        },
    ),
    inject("editorStore"),
    observer,
)(Grid);
