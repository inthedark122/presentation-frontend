// @flow
import {extendShallowObservable, action} from "mobx";
import {toggleFullScreen} from "../../utils/fullscreen";

export interface EditorModelType {
    +editorId: string;
    +openEditor: boolean;
    +openEditorSelect: boolean;
    +isFullScreen: boolean;
    chooseEditorId: (editorId: string) => void;
    openCloseEditor: () => void;
    openCloseEditorSelect: () => void;
    toggleFullScreen: () => void;
    leave: () => void;
}

export class EditorModel implements EditorModelType {
    editorId = "0";

    openEditor = false;

    openEditorSelect = false;

    isFullScreen = false;

    constructor() {
        // $FlowFixMe
        extendShallowObservable(this, {
            editorId: "0",
            isFullScreen: false,
            openEditor: false,
            openEditorSelect: false,
        });
    }

    chooseEditorId = action("chooseEditorId", (editorId: string) => {
        this.editorId = editorId;
    });

    openCloseEditor = action("openCloseEditor", () => {
        this.openEditor = !this.openEditor;
    });

    openCloseEditorSelect = action("openCloseEditorSelect", () => {
        this.openEditorSelect = !this.openEditorSelect;
    });

    leave = action("leave", () => {
        this.editorId = "0";
    });

    toggleFullScreen = action("toggleFullScreen", () => {
        this.isFullScreen = !this.isFullScreen;
        toggleFullScreen();
    });
}
