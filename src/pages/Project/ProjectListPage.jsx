// @flow
import * as React from "react";
import {compose, lifecycle} from "recompose";
import {inject, observer} from "mobx-react";
import Card from "material-ui/Card/Card";
import Button from "material-ui/Button/Button";
import Grid from "material-ui/Grid/Grid";
import {CardHeader, CardActions} from "material-ui/Card";
import {Link} from "react-router-dom";
import {type RootStoreType} from "../../mobx/RootStore";

type PropsType = {|
    projectStore: $PropertyType<RootStoreType, "projectStore">,
|};

export const ProjectListPage = (props: PropsType) => {
    const {projectStore} = props;

    return (
        <Grid container direction="column">
            {projectStore.projects.map((project) => (
                <Grid item key={project.id}>
                    <Card>
                        <CardHeader title={project.name} subheader={project.title} />
                        <CardActions>
                            <Button component={Link} to={`/projects/${project.id}/slides/0`} size="small">
                                Перейти
                            </Button>
                            <Button onClick={() => projectStore.deleteAction(project.id)} size="small">
                                Удалить
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default compose(
    inject("projectStore"),
    lifecycle({
        componentDidMount() {
            this.props.projectStore.load();
        },
    }),
    observer,
)(ProjectListPage);
