/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TodoListItem from './TodoListItem';

import { deleteTodo, markDone, editTodo } from '../../../../redux/todoActions';
import { noop, formatedDate } from '../../../../utils';
import ConfirmDeleteDialog from '../../../../shared/Dialog/ConfirmDeleteDialog';


const TodoListItemContainer = ({
  deleteTodo,
  markDone,
  editTodo,
  user,
  todo,
  date,
  refresh,

}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [contactId, setContactId] = useState('');
  const deleteTodoButtonHandler = (e, id) => {
    setContactId(id);
    setOpenDeleteDialog(true);
  };

  const markTodoDoneButtonHandler = (e, todo) => {
    const createdDate = formatedDate(todo.createdAt);
    if (createdDate === date) {
      markDone(todo, user, date);
    } else {
      markDone(todo, user, createdDate);
    }
  };

  const editTodoButtonHandler = (e, todo) => {
    editTodo(todo.id);
  };

  const handleConfirmDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const confirmDeleteDialogHandler = () => {
    deleteTodo(user, contactId, date);
    setOpenDeleteDialog(false);
  };

  const calendarStrings = {
    lastDay: 'll [at] LT',
    sameDay: '[Today at] LT',
    nextDay: 'll [at] LT',
    lastWeek: 'll [at] LT',
    nextWeek: 'll [at] LT',
    sameElse: 'll [at] LT',
  };
  return (
    <div>
      <ConfirmDeleteDialog
        handleClose={handleConfirmDeleteDialogClose}
        confirmDeleteDialogHandler={confirmDeleteDialogHandler}
        open={openDeleteDialog}
      />
      <TodoListItem
        calendarStrings={calendarStrings}
        deleteTodoButtonHandler={deleteTodoButtonHandler}
        markTodoDoneButtonHandler={markTodoDoneButtonHandler}
        editTodoButtonHandler={editTodoButtonHandler}
        todo={todo}
        user={user}
        date={date}
        refresh={refresh}
      />
    </div>
  );
};

TodoListItemContainer.propTypes = {
  deleteTodo: PropTypes.func,
  markDone: PropTypes.func,
  editTodo: PropTypes.func,
  user: PropTypes.instanceOf(Object),
  todo: PropTypes.instanceOf(Object),
  date: PropTypes.string,
  refresh: PropTypes.bool,
};

TodoListItemContainer.defaultProps = {
  deleteTodo: noop,
  markDone: noop,
  editTodo: noop,
  user: {},
  todo: {},
  date: '',
  refresh: false,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  date: state.todo.date,

});

const mapDispatchToProps = dispatch => ({
  deleteTodo: (user, id, date) => dispatch(deleteTodo(user, id, date)),
  markDone: (todo, user, date) => dispatch(markDone(todo, user, date)),
  editTodo: id => dispatch(editTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItemContainer);
