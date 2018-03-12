// @flow
import * as React from "react";
import {observer, inject} from "mobx-react";
import {compose, withHandlers} from "recompose";
import Dialog from "material-ui/Dialog/Dialog";
import {DialogContent} from "material-ui/Dialog";
import Grid from "material-ui/Grid/Grid";
import {type RootStoreType} from "../../mobx/RootStore";
import EditorSelect from "./EditorSelect.jsx";
import EditorTextField from "./EditorTextField.jsx";

const editorMap = {
    select: EditorSelect,
    text: EditorTextField,
};

type PropsType = {|
    editorStore: $PropertyType<RootStoreType, "editorStore">,
    onChange: (name: string, value: string) => void,
    values: Object,
    configs: Array<{
        value: any,
        name: string,
        label: string,
        classType: "select",
        options: Array<string>,
    }>,
|};

const Editor = (props: PropsType) => {
    const {configs, values, onChange, editorStore} = props;

    if (editorStore.editorId !== values.id) {
        return null;
    }

    return (
        <Dialog fullWidth open={editorStore.openEditor} onClose={editorStore.openCloseEditor}>
            <DialogContent>
                {configs.map((config, index) => {
                    const Component = editorMap[config.classType];

                    if (!Component) {
                        return null;
                    }

                    return (
                        <Grid container key={index}>
                            <Grid item xs={4}>
                                {config.label}
                            </Grid>
                            <Grid item xs={8}>
                                <Component
                                    value={values[config.name]}
                                    name={config.name}
                                    onChange={onChange}
                                    options={config.options}
                                />
                            </Grid>
                        </Grid>
                    );
                })}
            </DialogContent>
        </Dialog>
    );
};

export default compose(
    withHandlers({
        onChange: (props) => (name, value) => {
            props.values[name] = value;
        },
    }),
    inject("editorStore"),
    observer,
)(Editor);
