// @flow
import Typography from "./Typography.jsx";
import CodeSandbox from "./CodeSandbox.jsx";
import Grid from "./Grid.jsx";
import Code from "./Code.jsx";

const classTypeMap = {
    code: Code,
    codesandbox: CodeSandbox,
    grid: Grid,
    typography: Typography,
};

export const getComponent = (classType: string) => classTypeMap[classType];
