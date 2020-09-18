import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import moment from 'moment';
import { noop, formatedDate } from '../../../../utils';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  momentTag: {
    fontSize: '0.8rem',
  },
  inline: {
    display: 'inline',
    fontSize: '0.9rem',
  },
  listItemTextLineThrough: {
    color: '#999898',
    textDecoration: 'line-through',
    fontStyle: 'italic',
  },
  card: {
    maxWidth: 250,
    marginBottom: theme.spacing(2),
  },
  cardBackground: {
    maxWidth: 250,
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff98',
  },
  deleteButton: {
    color: red[500],
  },
  greenButton: {
    color: 'green',
  },
  chip: {
    fontSize: '0.7rem !important',
  },
  chipIcon: {
    fontSize: '0.9rem !important',
  },
  isHidden: {
    display: 'none',
  },
}));

function TodoCard({
  deleteTodoButtonHandler,
  markTodoDoneButtonHandler,
  editTodoButtonHandler,
  todo,
  user,
  date,
  calendarStrings,
  refresh,
}) {
  const classes = useStyles();
  let createdTime = moment(todo.createdAt);
  let allowEditTill = moment(todo.createdAt).add(2, 'hours');
  useEffect(() => {
    createdTime = moment(todo.createdAt);
    allowEditTill = moment(todo.createdAt).add(2, 'hours');
  }, [refresh]);
  return (
    <>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" className={classes.listItem}>
          <Tooltip title={todo.isDone ? 'Todo Done' : 'Mark as Done'} arrow>
            <IconButton onClick={event => markTodoDoneButtonHandler(event, todo)}>
              {
                todo.isDone
                  ? (
                    <CheckCircleIcon
                      className={todo.isDone ? classes.greenButton : null}
                    />
                  )
                  : <CheckCircleOutlineIcon />
              }
            </IconButton>
          </Tooltip>
          <ListItemText
            className={todo.isDone ? classes.listItemTextLineThrough : null}
            primary={todo.todo}
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {user.email}
                </Typography>
                &nbsp;&mdash;&nbsp;
                <Moment
                  className={classes.momentTag}
                  calendar={calendarStrings}
                >
                  {todo.createdAt}
                </Moment>
              </>
            )}
          />
          <ListItemSecondaryAction>
            {
              moment(date).isSameOrAfter(formatedDate(new Date()))
              && (
                <>
                  {
                    (moment(createdTime).isBefore(allowEditTill)
                      && (allowEditTill > moment(+new Date()).toDate()))
                    && (
                      <>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            onClick={event => editTodoButtonHandler(event, todo)}
                            className={todo.isDone ? classes.isHidden : null}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton onClick={event => deleteTodoButtonHandler(event, todo.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )
                  }
                </>
              )
            }
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}

TodoCard.propTypes = {
  deleteTodoButtonHandler: PropTypes.func,
  markTodoDoneButtonHandler: PropTypes.func,
  editTodoButtonHandler: PropTypes.func,
  todo: PropTypes.instanceOf(Object),
  user: PropTypes.instanceOf(Object),
  calendarStrings: PropTypes.instanceOf(Object),
  date: PropTypes.string,
  refresh: PropTypes.bool,
};

TodoCard.defaultProps = {
  deleteTodoButtonHandler: noop,
  markTodoDoneButtonHandler: noop,
  editTodoButtonHandler: noop,
  calendarStrings: {},
  todo: [],
  user: {},
  date: '',
  refresh: false,
};

export default TodoCard;
