// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import Dialog from "material-ui/Dialog/Dialog";
import {DialogTitle, DialogContent, DialogActions} from "material-ui/Dialog";
import TextField from "material-ui/TextField/TextField";
import Button from "material-ui/Button/Button";
import {Form, Field} from "react-final-form";
import {type RootStoreType} from "../../mobx/RootStore";

type PropsType = {
    projectStore: $PropertyType<RootStoreType, "projectStore">,
};

const AppBarAddProject = ({projectStore}: PropsType) => (
    <Dialog open={projectStore.openAdd} fullWidth>
        <Form
            onSubmit={projectStore.addAction}
            render={({submitting, handleSubmit}) => (
                <React.Fragment>
                    <DialogTitle>Добавление проекта</DialogTitle>
                    <DialogContent>
                        <Field
                            name="name"
                            render={({input}) => (
                                <TextField label="Имя проекта" margin="dense" fullWidth InputProps={input} />
                            )}
                        />
                        <Field
                            name="title"
                            render={({input}) => (
                                <TextField label="Описание проекта" margin="dense" fullWidth InputProps={input} />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit}>Сохранить</Button>
                    </DialogActions>
                </React.Fragment>
            )}
        />
    </Dialog>
);

export default compose(inject("projectStore"), observer)(AppBarAddProject);
