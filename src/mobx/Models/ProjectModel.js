// @flow
import {extendShallowObservable} from "mobx";
import axios from "../request";

export interface ProjectModelType {
    +openAdd: boolean;
    +projects: Array<Object>;
    load: () => Promise<any>;
    toggleOpenAdd: () => void;
    addAction: (values: Object) => Promise<any>;
    deleteAction: (projectId: string) => Promise<any>;
}

export class ProjectModel implements ProjectModelType {
    projects = [];

    openAdd = false;

    constructor() {
        // $FlowFixMe
        extendShallowObservable(this, {
            openAdd: false,
            projects: [],
        });
    }

    load = async () => {
        const response = await axios.get("/projects");

        this.projects = response.data;

        return response;
    };

    addAction = async (values: Object) => {
        await axios.post("/projects", values);
        await this.load();

        this.openAdd = false;
    };

    deleteAction = async (projectId: string) => {
        await axios.delete(`/projects/${projectId}`);
        await this.load();
    };

    toggleOpenAdd = () => {
        this.openAdd = !this.openAdd;
    };
}
