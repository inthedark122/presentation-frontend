export const classTypes = ["codesandbox", "grid", "typography", "code"];

export const initialValues = {
    code: {
        children: "const a = 10;",
        classType: "code",
        language: "javascript",
    },
    codesandbox: {
        classType: "codesandbox",
        src: "",
    },
    grid: {
        childs: [],
        classType: "grid",
        direction: "row",
    },
    typography: {
        align: "inherit",
        children: "Пример",
        classType: "typography",
        color: "default",
        fontSize: 14,
    },
};
