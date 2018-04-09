// @flow
import * as React from "react";
import {withStyles} from "material-ui/styles";
import {compose, lifecycle, withHandlers} from "recompose";
import {observer, inject} from "mobx-react";
import Card from "material-ui/Card/Card";
import Grid from "material-ui/Grid/Grid";
import Button from "material-ui/Button/Button";
import {CardActions, CardContent} from "material-ui/Card";
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
|};

const styles = {
    card: {
        height: "100%",
    },
    cardContent: {
        height: "calc(100% - 84px)",
        overflowY: "auto",
    },
};

const NEXT_KEY_CODE = 39;
const PREV_KEY_CODE = 37;

const SlidesPage = ({slideStore, editorStore, match, classes, onAddSlide, onDeleteSlide}: PropsType) => (
    <Card className={classes.card} component={Grid} container direction="column" justify="space-between">
        <CardContent className={classes.cardContent} component={Grid} item>
            {slideStore.activeSlide && slideStore.activeSlide.model ? (
                <Builder child={slideStore.activeSlide.model} />
            ) : null}
        </CardContent>
        <CardActions>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    {editorStore.isFullScreen ? null : <Button onClick={() => slideStore.save()}>Сохранить</Button>}
                </Grid>
                <Grid item>
                    {slideStore.slides.map((slide, index) => (
                        <IconButton
                            component={Link}
                            key={index}
                            to={`/projects/${match.params.projectId}/slides/${index}`}
                        >
                            {index === slideStore.activeSlideIndex ? <Star /> : <StarBorder />}
                        </IconButton>
                    ))}
                </Grid>
                <Grid item>
                    {editorStore.isFullScreen ? null : (
                        <React.Fragment>
                            <Button onClick={onDeleteSlide}>Удалить</Button>
                            <Button onClick={onAddSlide}>Добавить</Button>
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </CardActions>
    </Card>
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
