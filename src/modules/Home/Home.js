import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TodoListContainer from './TodoList/TodoListContainer';
import AddTodoContainer from './AddTodo/AddTodoContainer';
import NavBarContainer from '../NavBar/NavBarContainer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    backgroundColor: '#eee',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(200 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  content: {
    flexGrow: 1,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBarContainer />
      <main className={classes.content}>
        <TodoListContainer />
        <AddTodoContainer />
      </main>
    </div>
  );
}

export default Home;
