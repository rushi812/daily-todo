import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import 'react-toastify/dist/ReactToastify.css';
import TodoListItemContainer from './TodoListItem/TodoListItemContainer';
import { noop } from '../../../utils';

const useStyles = makeStyles({
  copyButton: {
    margin: '7px 0',
    backgroundColor: '#7986cb',
    color: '#eee',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#3f51b5',
    },
  },
  todoList: {
    maxHeight: 'calc(100vh - 161px)',
    overflow: 'auto',
    margin: '15px 0 8px',
  },
});

function TodoList({
  todos,
  copyButtonHandler,
  copyBtnText,
  refresh,
}) {
  const classes = useStyles();
  return (
    <>
      <Button
        variant="contained"
        className={classes.copyButton}
        startIcon={<FileCopyIcon />}
        onClick={copyButtonHandler}
        disabled={copyBtnText === 'Copied!'}
      >
        {copyBtnText}
      </Button>
      <div className={classes.todoList}>
        {
          todos
          && todos.map(todo => (
            <TodoListItemContainer refresh={refresh} todo={todo} key={todo.id} />
          ))
        }
      </div>
    </>
  );
}

TodoList.propTypes = {
  copyButtonHandler: PropTypes.func,
  todos: PropTypes.instanceOf(Array),
  copyBtnText: PropTypes.string,
  refresh: PropTypes.bool,
};

TodoList.defaultProps = {
  copyButtonHandler: noop,
  todos: [],
  copyBtnText: '',
  refresh: false,
};

export default TodoList;
