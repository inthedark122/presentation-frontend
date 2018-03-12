// @flow
import * as React from "react";
import {withHandlers} from "recompose";
import TextField from "material-ui/TextField/TextField";

type PropsType = {
    value: string,
    onChange: (name: string, value: string) => void,
};

const EditorTextField = ({onChange, value}: PropsType) => (
    <TextField fullWidth multiline rows={4} rowsMax={8} value={value} onChange={onChange} />
);

export default withHandlers({
    onChange: (props) => (event) => {
        props.onChange(props.name, event.target.value);
    },
})(EditorTextField);
