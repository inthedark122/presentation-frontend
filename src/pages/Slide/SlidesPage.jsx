// @flow
import * as React from "react";
import {withStyles} from "material-ui/styles";
import {compose, lifecycle, withHandlers} from "recompose";
import {observer, inject} from "mobx-react";
import Grid from "material-ui/Grid/Grid";
import Button from "material-ui/Button/Button";
import IconButton from "material-ui/IconButton/IconButton";
import Star from "material-ui-icons/Star";
import StarBorder from "material-ui-icons/StarBorder";
import {Link} from "react-router-dom";
import {type RootStoreType} from "../../mobx/RootStore";
import Builder from "../../components/Builder/Builder.jsx";

type PropsType = {|
    slideStore: $PropertyType<RootStoreType, "slideStore">,
    editorStore: $PropertyType<RootStoreType, "editorStore">,
    match: {
        params: {
            projectId: string,
        },
    },
    classes: Object,
    onAddSlide: () => void,
    onDeleteSlide: () => void,
    onSaveSlide: () => void,
|};

const styles = {
    card: {
        height: "100%",
    },
    cardActions: {
        maxWidth: "100%",
    },
    cardContent: {
        flex: 1,
        maxWidth: "100%",
        overflowY: "auto",
    },
};

const NEXT_KEY_CODE = 39;
const PREV_KEY_CODE = 37;

const SlidesPage = ({slideStore, editorStore, match, classes, onAddSlide, onDeleteSlide, onSaveSlide}: PropsType) => (
    <Grid className={classes.card} container direction="column" justify="space-between">
        <Grid className={classes.cardContent} item>
            {slideStore.activeSlide && slideStore.activeSlide.model ? (
                <Builder child={slideStore.activeSlide.model} />
            ) : null}
        </Grid>
        <Grid className={classes.cardActions} item container justify="space-between">
            <Grid item xs={12} md={2}>
                {editorStore.isFullScreen ? null : <Button onClick={onSaveSlide}>Сохранить</Button>}
            </Grid>
            <Grid container item xs={12} md={7} alignContent="center" justify="center">
                {slideStore.slides.map((slide, index) => (
                    <Grid item key={index}>
                        <IconButton component={Link} to={`/projects/${match.params.projectId}/slides/${index}`}>
                            {index === slideStore.activeSlideIndex ? <Star /> : <StarBorder />}
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={12} md={3}>
                {editorStore.isFullScreen ? null : (
                    <React.Fragment>
                        <Button onClick={onDeleteSlide}>Удалить</Button>
                        <Button onClick={onAddSlide}>Добавить</Button>
                    </React.Fragment>
                )}
            </Grid>
        </Grid>
    </Grid>
);

export default compose(
    inject("slideStore", "editorStore"),
    withHandlers({
        onNextSlide: (props) => () => {
            const nextSlideIndex = Math.min(props.slideStore.slides.length - 1, props.slideStore.activeSlideIndex + 1);

            props.history.push(`/projects/${props.match.params.projectId}/slides/${nextSlideIndex}`);
        },
        onPrevSlide: (props) => () => {
            const prevSlideIndex = Math.max(0, props.slideStore.activeSlideIndex - 1);

            props.history.push(`/projects/${props.match.params.projectId}/slides/${prevSlideIndex}`);
        },
        onSaveSlide: (props) => () => {
            props.slideStore.save();
        },
    }),
    withHandlers({
        onAddSlide: ({slideStore, match}) => () => {
            slideStore.add(match.params.projectId);
        },
        onDeleteSlide: ({slideStore, match}) => () => {
            slideStore.deleteSlide(match.params.projectId);
        },
        onKeyDown: (props) => (event: SyntheticEvent<HTMLButtonElement>) => {
            if (event.keyCode === NEXT_KEY_CODE) {
                props.onNextSlide();
            }

            if (event.keyCode === PREV_KEY_CODE) {
                props.onPrevSlide();
            }
        },
    }),
    lifecycle({
        componentDidMount() {
            const {projectId, slideIndex} = this.props.match.params;

            this.props.slideStore.load(projectId, Number(slideIndex));

            document.addEventListener("keydown", this.props.onKeyDown);
        },
        componentWillReceiveProps(nextProps) {
            if (this.props.match.params.slideIndex !== nextProps.match.params.slideIndex) {
                this.props.slideStore.setActiveSlide(Number(nextProps.match.params.slideIndex));
            }
        },
        componentWillUnmount() {
            this.props.slideStore.leave();
            this.props.editorStore.leave();
            document.removeEventListener("keydown", this.props.onKeyDown);
        },
    }),
    withStyles(styles),
    observer,
)(SlidesPage);
