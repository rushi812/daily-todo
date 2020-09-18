import React from 'react';
import { Form, Formik, Field } from 'formik';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

import moment from 'moment';
import { noop, formatedDate } from '../../../utils';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    width: 'auto',
  },
  inputForm2: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  headerContainer: {
    position: 'fixed',
    bottom: '0',
    width: '83.5vh',

  },
  form: {
    display: 'grid',
    gridTemplateColumns: '86% 14%',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formCancelEdit: {
    display: 'grid',
    gridTemplateColumns: '78% 22%',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cancel: {
    margin: theme.spacing(1),
  },
  update: {
    margin: theme.spacing(1),
  },
  editButtons: {
    display: 'flex',
  },
  formDivider: {
    margin: 10,
  },
}));

function AddTodo({
  addTodoButtonHandler,
  updateTodoButtonHandler,
  cancelEditButtonHandler,
  validationSchema,
  initialValues,
  isEdit,
  date,
}) {
  const currentDate = formatedDate(new Date());
  const classes = useStyles();
  return (
    <div className={classes.headerContainer}>
      <Formik
        enableReinitialize
        validateOnChange
        validateOnBlur={false}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          if (isEdit) {
            updateTodoButtonHandler(data);
          } else {
            addTodoButtonHandler(data);
          }
          resetForm();
        }}
      >
        {
          ({ errors, touched }) => (
            <>
              {
                moment(date).isBefore(currentDate)
                  ? <></>
                  : (
                    <>
                      <Form className={isEdit ? classes.formCancelEdit : classes.form} noValidate autoComplete="off">
                        <div>
                          <Field
                            name="todo"
                            type="input"
                            id="todo"
                            fullWidth
                            variant="outlined"
                            label={isEdit ? 'Update Todo' : 'Add New Todo'}
                            error={touched.todo && Boolean(errors.todo)}
                            helperText={errors.todo ? errors.todo : ''}
                            as={TextField}
                          />
                        </div>
                        <div className={classes.buttons}>
                          {
                            isEdit
                              ? (
                                <div className={classes.editButtons}>
                                  <div className={classes.update}>
                                    <Fab
                                      type="submit"
                                      size="small"
                                      color="secondary"
                                      aria-label="add"
                                    >
                                      <SaveIcon />
                                    </Fab>
                                  </div>
                                  <div className={classes.cancel}>
                                    <Fab
                                      type="submit"
                                      onClick={cancelEditButtonHandler}
                                      size="small"
                                      color="primary"
                                      aria-label="add"
                                    >
                                      <ClearIcon />
                                    </Fab>
                                  </div>
                                </div>
                              )
                              : (
                                <Fab
                                  type="submit"
                                  color="primary"
                                  aria-label="add"
                                >
                                  <AddIcon />
                                </Fab>
                              )
                          }
                        </div>
                      </Form>
                    </>
                  )
              }
            </>
          )
        }
      </Formik>
    </div>
  );
}

AddTodo.propTypes = {
  addTodoButtonHandler: PropTypes.func,
  updateTodoButtonHandler: PropTypes.func,
  cancelEditButtonHandler: PropTypes.func,
  validationSchema: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
  isEdit: PropTypes.bool,
  date: PropTypes.string,
};

AddTodo.defaultProps = {
  addTodoButtonHandler: noop,
  updateTodoButtonHandler: noop,
  cancelEditButtonHandler: noop,
  validationSchema: {},
  initialValues: {},
  isEdit: false,
  date: '',
};

export default AddTodo;
