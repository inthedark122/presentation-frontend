// @flow
import * as React from "react";
import Editor from "../../Editor/Editor.jsx";

export type CodeSandboxPropsType = {
    className: string,
    child: {
        src: string,
    },
};

const configs = [
    {
        classType: "text",
        label: "Ссылка",
        name: "src",
    },
];

const CodeSandbox = ({child, className}: CodeSandboxPropsType) => {
    const {src} = child;

    return (
        <span className={className}>
            <iframe
                title={src}
                src={src}
                style={{border: 0, borderRadius: "4px", height: "500px", overflow: "hidden", width: "100%"}}
                sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
            />
            <Editor values={child} configs={configs} />
        </span>
    );
};

export default CodeSandbox;
