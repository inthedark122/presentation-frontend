// @flow
import axios from "../request";
import {initialValues} from "../../components/Builder/Elements/classTypes";

export async function load(projectId: string, slideIndex: number) {
    const response = await axios.get(`/projects/${projectId}/slides`);

    this.slides = response.data.map((slide) => ({
        ...slide,
        model: JSON.parse(slide.model),
    }));
    this.setActiveSlide(slideIndex);
}

export function setActiveSlide(index: number = 0) {
    this.activeSlideIndex = index;
    this.activeSlide = this.slides[index];
}

export function nextSlide() {
    this.activeSlideIndex = this.activeSlideIndex + 1;
    this.activeSlide = this.slides[this.activeSlideIndex];
}

export async function loadDetailSlide(slideId: string) {
    const response = await axios.get(`/slides/${slideId}`);

    this.activeSlide = response.data;

    return response;
}

export async function slideSaveAction() {
    const {id, number, model} = this.activeSlide;

    await axios.post(`/slides/${id}`, {
        model: JSON.stringify(model),
        number,
    });
}

export async function slideAddAction(projectId: string) {
    const data = {
        model: JSON.stringify({...initialValues.grid, direction: "column"}),
        number: this.slides.length + 1,
    };

    await axios.post(`/projects/${projectId}/slides`, data);

    await this.load(projectId, this.slides.length);
}

export async function slideDeleteAction(projectId: string) {
    const slideId = this.activeSlide.id;

    await axios.delete(`/slides/${slideId}`);

    await this.load(projectId);
}
