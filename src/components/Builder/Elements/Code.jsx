// @flow
import * as React from "react";
import {observer} from "mobx-react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import {dark, duotoneLight, prism, twilight} from "react-syntax-highlighter/styles/prism";
import Editor from "../../Editor/Editor.jsx";

type CodeProps = {
    child: Object,
    className: string,
    onClick?: (event: SyntheticEvent<>) => void,
};

const styles = {
    dark,
    duotoneLight,
    prism,
    twilight,
};

const configs = [
    {
        classType: "text",
        label: "Код",
        name: "children",
    },
    {
        classType: "select",
        label: "Язык форматирвоание",
        name: "language",
        options: ["javascript"],
    },
    {
        classType: "select",
        label: "Тема",
        name: "style",
        options: ["dark", "duotoneLight", "prism", "twilight"],
    },
];

const Code = ({child, className, onClick}: CodeProps) => (
    <React.Fragment>
        <SyntaxHighlighter className={className} style={styles[child.style || "dark"]} onClick={onClick}>
            {child.children}
        </SyntaxHighlighter>
        <Editor values={child} configs={configs} />
    </React.Fragment>
);

export default observer(Code);
