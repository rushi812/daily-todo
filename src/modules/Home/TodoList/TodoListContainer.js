/* eslint-disable no-shadow */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CronJob } from 'cron';

import { makeStyles } from '@material-ui/core/styles';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { Loader } from 'react-loaders';
import 'loaders.css/loaders.min.css';
import copy from 'copy-to-clipboard';

import PendingTodoDialog from '../../../shared/Dialog/PendingTodoDialog';
import TodoList from './TodoList';
import NoData from '../../../shared/NoData';
import { copyToClipboard, toastClose } from '../../../redux/todoActions';
import {
  addPreviousDayTodos,
  noAddPreviousDayTodos,
  openPendingTodo,
  closePendingTodo,
} from '../../../redux/previousdayActions';
import { noop, todoFormatter, copyTodoToast, checkForTime } from '../../../utils';

const useStyles = makeStyles({
  blockUi: {
    minHeight: '100vh',
  },
});

const TodoListContainer = ({
  addPreviousDayTodos,
  noAddPreviousDayTodos,
  toastClose,
  openPendingTodo,
  closePendingTodo,
  copyToClipboard,
  todos,
  previousDayTodos,
  fetchTodoLoading,
  deleteTodoLoading,
  openPendingTodoDialog,
  copyBtnText,
  date,
}) => {
  const todosRef = useRef();
  const classes = useStyles();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const job = new CronJob('00 */2 * * * *', (() => {
      setRefresh(prevRefresh => !prevRefresh);
    }));
    job.start();
  }, []);

  useEffect(() => {
    todosRef.current = todos;
    const filteredTodos = todosRef.current.filter(todo => todo.isDone === false);
    filteredTodos.map(todo => {
      const job = new CronJob('*/10 * * * * *', (() => {
        checkForTime(todo.todo);
      }));
      job.start();
    });
  }, [todos]);

  useEffect(() => {
    openPendingTodo();
  }, []);

  const copyButtonHandler = () => {
    const formatedTodos = todoFormatter(todos);
    copyToClipboard();
    copyTodoToast(date, toastClose);
    copy(formatedTodos);
  };

  const noButtonHandler = () => {
    noAddPreviousDayTodos();
    closePendingTodo();
  };

  const yesButtonHandler = () => {
    addPreviousDayTodos();
    closePendingTodo();
  };

  return (
    <BlockUi
      className={classes.blockUi}
      tag="div"
      blocking={fetchTodoLoading || deleteTodoLoading}
      loader={<Loader active type="line-scale-party" color="#3f51b5" />}
      renderChildren={false}
    >
      {
        (previousDayTodos && previousDayTodos.length !== 0)
        && (
          <PendingTodoDialog
            noButtonHandler={noButtonHandler}
            yesButtonHandler={yesButtonHandler}
            open={openPendingTodoDialog}
          />
        )
      }
      {
        (todos && todos.length !== 0 && !fetchTodoLoading)
          ? (
            <TodoList
              todos={todos}
              refresh={refresh}
              copyButtonHandler={copyButtonHandler}
              copyBtnText={copyBtnText}
            />
          )
          : <NoData />
      }
    </BlockUi>
  );
};

TodoListContainer.propTypes = {
  copyToClipboard: PropTypes.func,
  toastClose: PropTypes.func,
  addPreviousDayTodos: PropTypes.func,
  noAddPreviousDayTodos: PropTypes.func,
  openPendingTodo: PropTypes.func,
  closePendingTodo: PropTypes.func,
  todos: PropTypes.instanceOf(Array),
  previousDayTodos: PropTypes.instanceOf(Array),
  fetchTodoLoading: PropTypes.bool,
  deleteTodoLoading: PropTypes.bool,
  openPendingTodoDialog: PropTypes.bool,
  copyBtnText: PropTypes.string,
  date: PropTypes.string,
};

TodoListContainer.defaultProps = {
  copyToClipboard: noop,
  toastClose: noop,
  addPreviousDayTodos: noop,
  noAddPreviousDayTodos: noop,
  openPendingTodo: noop,
  closePendingTodo: noop,
  todos: [],
  previousDayTodos: [],
  fetchTodoLoading: false,
  deleteTodoLoading: false,
  openPendingTodoDialog: false,
  copyBtnText: '',
  date: '',
};

const mapStateToProps = state => ({
  todos: state.todo.todos,
  fetchTodoLoading: state.todo.fetchTodoLoading,
  deleteTodoLoading: state.todo.deleteTodoLoading,
  copyBtnText: state.todo.copyBtnText,
  copiedTodo: state.todo.copiedTodo,
  date: state.todo.date,
  openPendingTodoDialog: state.todo.openPendingTodoDialog,
  previousDayTodos: state.todo.previousDayTodos,
});

const mapDispatchToProps = dispatch => ({
  copyToClipboard: todos => dispatch(copyToClipboard(todos)),
  toastClose: () => dispatch(toastClose()),
  addPreviousDayTodos: () => dispatch(addPreviousDayTodos()),
  noAddPreviousDayTodos: () => dispatch(noAddPreviousDayTodos()),
  openPendingTodo: () => dispatch(openPendingTodo()),
  closePendingTodo: () => dispatch(closePendingTodo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
