// @flow
import {ProjectModel, type ProjectModelType} from "./Models/ProjectModel";
import {SlideModel, type SlideModelType} from "./Models/SlideModel";
import {EditorModel, type EditorModelType} from "./Models/EditorModel";

export type RootStoreType = {
    editorStore: EditorModelType,
    projectStore: ProjectModelType,
    slideStore: SlideModelType,
};

export const rootStores = {
    editorStore: new EditorModel(),
    projectStore: new ProjectModel(),
    slideStore: new SlideModel(),
};
