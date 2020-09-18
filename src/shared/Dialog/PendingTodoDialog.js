import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';

import { noop } from '../../utils';

const useStyles = makeStyles(({
  button: {
    color: '#fff',
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[500],
    },
  },
}));

function PendingTodoDialog({
  yesButtonHandler,
  noButtonHandler,
  open,
}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={noButtonHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box color="primary.main">PENDING TODOS?</Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There are some pending todos from previous day, want to carry over ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            className={classes.button}
            onClick={noButtonHandler}
          >
            No
          </Button>
          <Button
            onClick={yesButtonHandler}
            variant="outlined"
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PendingTodoDialog.propTypes = {
  yesButtonHandler: PropTypes.func,
  noButtonHandler: PropTypes.func,
  open: PropTypes.bool,
};

PendingTodoDialog.defaultProps = {
  yesButtonHandler: noop,
  noButtonHandler: noop,
  open: false,
};

export default PendingTodoDialog;
