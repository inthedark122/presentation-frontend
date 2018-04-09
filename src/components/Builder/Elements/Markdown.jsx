// @flow
import * as React from "react";
import {observer} from "mobx-react";
import ReactMarkdown from "react-markdown";
import Editor from "../../Editor/Editor.jsx";

type MarkdownProps = {
    child: {
        source: string,
    },
    className: string,
    onClick?: (event: SyntheticEvent<>) => void,
};

const configs = [
    {
        classType: "text",
        label: "Код",
        name: "source",
    },
];

const Markdown = ({child, className, onClick}: MarkdownProps) => (
    <React.Fragment>
        <ReactMarkdown source={child.source} className={className} onClick={onClick} />
        <Editor values={child} configs={configs} />
    </React.Fragment>
);

export default observer(Markdown);
