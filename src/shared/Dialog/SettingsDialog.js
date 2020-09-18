import React from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';

import { noop } from '../../utils';

const useStyles = makeStyles(theme => ({
  timePicker: {
    margin: theme.spacing(1),
    maxWidth: '10rem',
  },
}));

function SettingDialog({
  saveButtonHandler,
  handleMorningTimeChange,
  handleEveningTimeChange,
  handleClose,
  changedMorningTime,
  changedEveningTime,
  open,
}) {
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
          <Box color="primary.main">NOTIFICATION SETTING</Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select the time you want to see the notification!
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardTimePicker
                className={classes.timePicker}
                ampm
                label="Morning Notification"
                value={changedMorningTime}
                onChange={handleMorningTimeChange}
              />
              <KeyboardTimePicker
                className={classes.timePicker}
                ampm
                label="Evening Notification"
                value={changedEveningTime}
                onChange={handleEveningTimeChange}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={saveButtonHandler}
            variant="outlined"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SettingDialog.propTypes = {
  saveButtonHandler: PropTypes.func,
  handleClose: PropTypes.func,
  handleMorningTimeChange: PropTypes.func,
  handleEveningTimeChange: PropTypes.func,
  changedMorningTime: PropTypes.string,
  changedEveningTime: PropTypes.string,
  open: PropTypes.bool,
};

SettingDialog.defaultProps = {
  saveButtonHandler: noop,
  handleClose: noop,
  handleMorningTimeChange: noop,
  handleEveningTimeChange: noop,
  changedMorningTime: '',
  changedEveningTime: '',
  open: false,
};

export default SettingDialog;
