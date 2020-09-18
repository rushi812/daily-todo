import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TodayIcon from '@material-ui/icons/Today';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { noop, formatedDate } from '../../utils';
import '../../assets/styles/0-modules/shared/Drawer/drawer.css';

const useStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 52,
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: red[500],
  },
  dateGridOne: {
    display: 'grid',
    gridTemplateColumns: '50px 130px',
  },
  dateDigit: {
    textAlign: 'center',
  },
  settingsContainer: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
  },
  settingButton: {
    backgroundColor: 'transparent !important',
  },
  dateGridTwo: {
    paddingTop: '0.4rem',
    fontSize: '1rem',
  },
  moment: {
    fontSize: '2.5rem',
  },
  button: {
    color: '#3f51b5',
    textDecoration: 'none',
    padding: theme.spacing(1),
    borderRadius: '5px',
  },
  inline: {
    display: 'flex',
    justifyContent: 'center',
  },
  listItemDatePicker: {
    padding: 0,
    margin: 0,
    zoom: 0.8,
  },
  nextPrevButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function DrawerContent({
  settingsButtonHandler,
  logoutButtonHandler,
  handleDateChange,
  goToTodayDateHandler,
  prevButtonHandler,
  nextButtonHandler,
  date,
}) {
  const uid = localStorage.getItem('uid');
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar}>
        <div className={classes.dateGridOne}>
          <div className={classes.dateDigit}>
            <Moment format="D" className={classes.moment}>
              {date || new Date()}
            </Moment>
          </div>
          <div className={classes.dateGridTwo}>
            <div>
              <Moment format="dddd">
                {date || new Date()}
              </Moment>
            </div>
            <div>
              <Moment format="MMMM, YYYY">
                {date || new Date()}
              </Moment>
            </div>
          </div>
        </div>
        <div className={classes.settingsContainer}>
          <IconButton
            type="button"
            onClick={settingsButtonHandler}
            className={classes.settingButton}
            aria-label="settings"
          >
            <SettingsTwoToneIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
      <Divider />

      {
        (uid !== '' && uid !== null && uid !== undefined)
        && (
          <List>
            <ListItem button onClick={logoutButtonHandler}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="LOGOUT" />
            </ListItem>
          </List>
        )
      }
      <Divider />
      <List>
        <ListItem className={classes.listItemDatePicker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.muiPickerUtilsContainer}>
            <KeyboardDatePicker
              disableToolbar
              variant="static"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={date}
              maxDate={new Date()}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </ListItem>
      </List>
      <Divider />
      <List className={classes.nextPrevButtons}>
        <Fab
          size="small"
          variant="extended"
          color="primary"
          aria-label="prev"
          className={classes.margin}
          onClick={prevButtonHandler}
        >
          <ChevronLeftIcon />
          Prev
        </Fab>
        <Fab
          size="small"
          variant="extended"
          color="primary"
          aria-label="next"
          className={classes.margin}
          onClick={nextButtonHandler}
          disabled={(date === formatedDate(new Date()))}
        >
          Next
          <ChevronRightIcon />
        </Fab>
      </List>
      <Divider />
      {
        moment(date).isBefore(formatedDate(new Date()))
        && (
          <List>
            <ListItem button onClick={goToTodayDateHandler}>
              <ListItemIcon><TodayIcon /></ListItemIcon>
              <ListItemText primary="Go to today" />
            </ListItem>
          </List>
        )
      }
    </div>
  );
}

DrawerContent.propTypes = {
  settingsButtonHandler: PropTypes.func,
  logoutButtonHandler: PropTypes.func,
  handleDateChange: PropTypes.func,
  goToTodayDateHandler: PropTypes.func,
  prevButtonHandler: PropTypes.func,
  nextButtonHandler: PropTypes.func,
  date: PropTypes.string,
};

DrawerContent.defaultProps = {
  settingsButtonHandler: noop,
  logoutButtonHandler: noop,
  handleDateChange: PropTypes.noop,
  prevButtonHandler: noop,
  nextButtonHandler: noop,
  date: '',
  goToTodayDateHandler: noop,
};

export default DrawerContent;
