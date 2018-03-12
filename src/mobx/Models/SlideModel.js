// @flow
import {extendObservable, action} from "mobx";
import {
    load,
    setActiveSlide,
    loadDetailSlide,
    nextSlide,
    slideSaveAction,
    slideLoadAction,
} from "../actions/sliderAction";

export interface SlideModelType {
    slides: Array<Object>;
    activeSlide: Object;
    activeSlideIndex: number;
    load: (projectId: string, slideIndex: number) => Promise<any>;
    setActiveSlide: (slideIndex: number) => Promise<any>;
    loadDetailSlide: (slideId: string) => void;
    save: () => Promise<void>;
    leave: () => void;
    add: (projectId: string) => void;
    deleteElement: (elementId: string) => void;
}

const findRootElement = (elementId, element, rootElement) => {
    if (element.id === elementId) {
        return rootElement || element;
    }

    if (element.childs) {
        for (let index = 0; index < element.childs.length; index += 1) {
            const childElement = findRootElement(elementId, element.childs[index], element);

            if (childElement) {
                return childElement;
            }
        }
    }

    return undefined;
};

export class SlideModel implements SlideModelType {
    slides = [];

    activeSlide = {};

    activeSlideIndex = 0;

    constructor() {
        // $FlowFixMe
        extendObservable(this, {
            activeSlide: {},
            activeSlideIndex: 0,
            slides: [],
        });
    }

    load = action("load", load);

    setActiveSlide = action("initSlide", setActiveSlide);

    loadDetailSlide = action("loadDetailSlide", loadDetailSlide);

    nextSlide = action("nextSlide", nextSlide);

    save = action("slideSaveAction", slideSaveAction);

    leave = action("leave", () => {
        this.activeSlide = {};
    });

    deleteElement = action("deleteElement", (elementId: string) => {
        const rootElement = findRootElement(elementId, this.activeSlide.model);

        if (rootElement) {
            const element = rootElement.childs.find((child) => child.id === elementId);
            rootElement.childs.remove(element);
        }
    });

    add = action("add", slideLoadAction);
}
