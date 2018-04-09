// @flow
import * as React from "react";
import {withStyles} from "material-ui/styles";
import List from "material-ui/List/List";
import IconButton from "material-ui/IconButton/IconButton";
import Star from "material-ui-icons/Star";
import {ListItem, ListItemText, ListItemSecondaryAction} from "material-ui/List";

const styles = (theme: any) => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

type ChildType = {|
    childs: Array<ChildType>,
    id: string,
    classType: string,
|};

type PropsType = {|
    child: ChildType,
    editorId: string,
    classes: Object,
    className: string,
    chooseEditorId: (editorId: string) => void,
|};

const AppBarEditorChild = ({child, classes, className, chooseEditorId, editorId}: PropsType) => (
    <React.Fragment>
        <ListItem onClick={() => chooseEditorId(child.id)} button className={className}>
            <ListItemText primary={child.classType} />
            {editorId === child.id ? (
                <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                        <Star />
                    </IconButton>
                </ListItemSecondaryAction>
            ) : null}
        </ListItem>
        {child.childs ? (
            <List component="div" disablePadding className={className}>
                {child.childs.map((nestedChild, index) => (
                    <AppBarEditorChildEnhance
                        key={index}
                        editorId={editorId}
                        chooseEditorId={chooseEditorId}
                        className={classes.nested}
                        child={nestedChild}
                    />
                ))}
            </List>
        ) : null}
    </React.Fragment>
);

const AppBarEditorChildEnhance = withStyles(styles)(AppBarEditorChild);

export default AppBarEditorChildEnhance;
