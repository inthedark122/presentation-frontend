export const classTypes = ["codesandbox", "grid", "typography", "code"];

export const initialValues = {
    code: {
        children: "const a = 10;",
        classType: "code",
        language: "javascript",
        style: "dark",
    },
    codesandbox: {
        classType: "codesandbox",
        src: "",
    },
    grid: {
        alignItems: "center",
        childs: [],
        classType: "grid",
        direction: "row",
        justify: "center",
    },
    typography: {
        align: "inherit",
        children: "Пример",
        classType: "typography",
        color: "default",
        fontSize: 14,
    },
};
