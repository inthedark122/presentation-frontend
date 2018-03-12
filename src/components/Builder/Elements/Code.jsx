// @flow
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import {dark} from "react-syntax-highlighter/styles/prism";
import Editor from "../../Editor/Editor.jsx";

type CodeProps = {
    child: Object,
    className: string,
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
];

const Code = ({child, className}: CodeProps) => (
    <React.Fragment>
        <SyntaxHighlighter className={className} {...child} style={dark} />
        <Editor values={child} configs={configs} />
    </React.Fragment>
);

export default Code;
