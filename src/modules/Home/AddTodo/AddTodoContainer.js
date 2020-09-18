/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CronJob } from 'cron';
import * as Yup from 'yup';

import AddTodo from './AddTodo';

import { addTodo, updateTodo, cancelEdit } from '../../../redux/todoActions';
import { noop, addTodoToast, checkForTime } from '../../../utils';

const AddTodoContainer = ({
  addTodo,
  updateTodo,
  cancelEdit,
  user,
  isEdit,
  selectedTodo,
  date,
  todos,
  deleteTodoLoading,
  showTodoNotification,
}) => {
  const validationSchema = Yup.object().shape({
    todo: Yup
      .string()
      .required('Todo is required'),
  });

  const addTodoButtonHandler = data => {
    addTodo(data, date, user).then(() => {
      addTodoToast(data.todo);
    });
  };

  const updateTodoButtonHandler = data => {
    updateTodo(selectedTodo.id, data, user, date);
  };

  const cancelEditButtonHandler = () => {
    cancelEdit();
  };

  return (
    <AddTodo
      isEdit={isEdit}
      date={date}
      initialValues={{
        todo: selectedTodo.todo || '',
      }}
      validationSchema={validationSchema}
      addTodoButtonHandler={addTodoButtonHandler}
      updateTodoButtonHandler={updateTodoButtonHandler}
      cancelEditButtonHandler={cancelEditButtonHandler}
    />
  );
};

AddTodoContainer.propTypes = {
  addTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  cancelEdit: PropTypes.func,
  user: PropTypes.instanceOf(Object),
  isEdit: PropTypes.bool,
  selectedTodo: PropTypes.instanceOf(Object),
  date: PropTypes.string,
};

AddTodoContainer.defaultProps = {
  addTodo: noop,
  updateTodo: noop,
  cancelEdit: noop,
  user: {},
  isEdit: false,
  selectedTodo: {},
  date: '',
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isEdit: state.todo.isEdit,
  selectedTodo: state.todo.selectedTodo,
  date: state.todo.date,
  deleteTodoLoading: state.todo.deleteTodoLoading,
  showTodoNotification: state.todo.showTodoNotification,
  todos: state.todo.todos,
});

const mapDispatchToProps = dispatch => ({
  addTodo: (data, date, user) => dispatch(addTodo(data, date, user)),
  updateTodo: (id, data, user, date) => dispatch(updateTodo(id, data, user, date)),
  cancelEdit: () => dispatch(cancelEdit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoContainer);
