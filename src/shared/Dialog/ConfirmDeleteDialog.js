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
import DeleteIcon from '@material-ui/icons/Delete';

import { noop } from '../../utils';

const useStyles = makeStyles({
  button: {
    color: '#fff',
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[500],
    },
  },
});

function ConfirmDeleteDialog({ handleClose, open, confirmDeleteDialogHandler }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box color="primary.main">DELETE TODO ?</Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently remove this todo!
            Still want to Proceed?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={confirmDeleteDialogHandler}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmDeleteDialog.propTypes = {
  handleClose: PropTypes.func,
  confirmDeleteDialogHandler: PropTypes.func,
  open: PropTypes.bool,
};

ConfirmDeleteDialog.defaultProps = {
  handleClose: noop,
  confirmDeleteDialogHandler: noop,
  open: false,
};

export default ConfirmDeleteDialog;
