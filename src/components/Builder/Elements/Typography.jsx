// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "material-ui/styles";
import TypographyMaterial from "material-ui/Typography/Typography";
import Editor from "../../Editor/Editor.jsx";

const styles = {
    // eslint-disable-next-line no-magic-numbers
    ...[10, 12, 14, 16, 18, 20, 24, 26, 32].reduce((acc, size) => {
        acc[`fontSize${size}`] = {
            fontSize: size,
        };

        return acc;
    }, {}),
};

type TypographyProps = {
    child: Object,
    className: string,
    classes: Object,
    onClick?: (event: SyntheticEvent<>) => void,
};

const configs = [
    {
        classType: "text",
        label: "Текст",
        name: "children",
    },
    {
        classType: "select",
        label: "Выравнивание",
        name: "align",
        options: ["inherit", "left", "center", "right", "justify"],
    },
    {
        classType: "select",
        label: "Цвет",
        name: "color",
        options: ["inherit", "primary", "textSecondary", "secondary", "error", "default"],
    },
    {
        classType: "select",
        label: "Размер шрифта",
        name: "fontSize",
        // eslint-disable-next-line no-magic-numbers
        options: [10, 12, 14, 16, 18, 20, 24, 26, 32],
    },
];

const Typography = ({child, className, classes, onClick}: TypographyProps) => {
    const {fontSize, id, classType, ...typographyProps} = child;
    return (
        <React.Fragment>
            <TypographyMaterial
                className={`${className} ${classes[`fontSize${fontSize}`]}`}
                onClick={onClick}
                {...typographyProps}
                noWrap={false}
            />
            <Editor values={child} configs={configs} />
        </React.Fragment>
    );
};

export default withStyles(styles)(observer(Typography));
