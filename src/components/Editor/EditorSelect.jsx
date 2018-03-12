// @flow
import * as React from "react";
import {withHandlers} from "recompose";
import TextField from "material-ui/TextField/TextField";
import {MenuItem} from "material-ui/Menu";

type PropsType = {
    defaultValue?: string,
    value: string,
    options: Array<string>,
    onChange: (name: string, value: string) => void,
};

const EditorSelect = ({options, value, onChange, defaultValue = options[0]}: PropsType) => (
    <TextField fullWidth select value={value || defaultValue} onChange={onChange}>
        {options.map((option, index) => (
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>
);

export default withHandlers({
    onChange: (props) => (event) => {
        props.onChange(props.name, event.target.value);
    },
})(EditorSelect);
