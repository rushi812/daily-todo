/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import DrawerContent from './DrawerContent';
import SettingsDialog from '../Dialog/SettingsDialog';

import { logout } from '../../redux/authActions';
import { dateChange, fetchTodos } from '../../redux/todoActions';
import { addPreviousDayTodos } from '../../redux/previousdayActions';
import { morningTimeChange, eveningTimeChange, updateNotificationTime } from '../../redux/notificationActions';
import { noop, formatedDate } from '../../utils';

const DrawerContentContainer = ({
  user,
  date,
  changedMorningTime,
  changedEveningTime,
  dateChange,
  morningTimeChange,
  eveningTimeChange,
  logout,
  fetchTodos,
  previousDayTodos,
  addPreviousDayTodos,
  updateNotificationTime,
  addPendingPreviousDayTodos,
}) => {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const settingsButtonHandler = () => {
    setOpenSettingsDialog(true);
  };

  const handleSettingsDialogClose = () => {
    setOpenSettingsDialog(false);
  };

  const handleMorningTimeChange = date => {
    morningTimeChange(date);
  };

  const handleEveningTimeChange = date => {
    eveningTimeChange(date);
  };

  const saveButtonHandler = () => {
    setOpenSettingsDialog(false);
    updateNotificationTime(user, changedMorningTime, changedEveningTime);
  };

  const logoutButtonHandler = () => {
    logout();
  };

  const handleDateChange = date => {
    const newDate = formatedDate(date);
    dateChange(newDate);
    if (previousDayTodos !== 0
      && (newDate === formatedDate(new Date()))
      && addPendingPreviousDayTodos) {
      fetchTodos(user, date).then(() => {
        addPreviousDayTodos();
      });
    } else {
      fetchTodos(user, date);
    }
  };

  const goToTodayDateHandler = () => {
    handleDateChange(new Date());
  };

  const prevButtonHandler = () => {
    handleDateChange(moment(date).subtract(1, 'days').format());
  };

  const nextButtonHandler = () => {
    handleDateChange(moment(date).add(1, 'days').format());
  };

  return (
    <div>
      <SettingsDialog
        changedMorningTime={changedMorningTime}
        changedEveningTime={changedEveningTime}
        open={openSettingsDialog}
        handleClose={handleSettingsDialogClose}
        saveButtonHandler={saveButtonHandler}
        handleMorningTimeChange={handleMorningTimeChange}
        handleEveningTimeChange={handleEveningTimeChange}
      />
      <DrawerContent
        date={date}
        settingsButtonHandler={settingsButtonHandler}
        logoutButtonHandler={logoutButtonHandler}
        handleDateChange={handleDateChange}
        goToTodayDateHandler={goToTodayDateHandler}
        prevButtonHandler={prevButtonHandler}
        nextButtonHandler={nextButtonHandler}
      />
    </div>
  );
};

DrawerContentContainer.propTypes = {
  logout: PropTypes.func,
  morningTimeChange: PropTypes.func,
  eveningTimeChange: PropTypes.func,
  dateChange: PropTypes.func,
  fetchTodos: PropTypes.func,
  addPreviousDayTodos: PropTypes.func,
  updateNotificationTime: PropTypes.func,
  user: PropTypes.instanceOf(Object),
  previousDayTodos: PropTypes.instanceOf(Array),
  date: PropTypes.string,
  changedMorningTime: PropTypes.string,
  changedEveningTime: PropTypes.string,
  addPendingPreviousDayTodos: PropTypes.bool,
};

DrawerContentContainer.defaultProps = {
  logout: noop,
  morningTimeChange: noop,
  eveningTimeChange: noop,
  dateChange: noop,
  fetchTodos: noop,
  addPreviousDayTodos: noop,
  updateNotificationTime: noop,
  user: {},
  previousDayTodos: [],
  date: '',
  changedMorningTime: '',
  changedEveningTime: '',
  addPendingPreviousDayTodos: false,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  date: state.todo.date,
  changedMorningTime: state.notification.changedMorningTime,
  changedEveningTime: state.notification.changedEveningTime,
  todos: state.todo.todos,
  previousDayTodos: state.todo.previousDayTodos,
  previousDay: state.todo.previousDay,
  addPendingPreviousDayTodos: state.todo.addPendingPreviousDayTodos,
});

const mapDispatchToProps = dispatch => ({
  morningTimeChange: date => dispatch(morningTimeChange(date)),
  eveningTimeChange: date => dispatch(eveningTimeChange(date)),
  logout: () => dispatch(logout()),
  dateChange: date => dispatch(dateChange(date)),
  fetchTodos: (user, date) => dispatch(fetchTodos(user, date)),
  addPreviousDayTodos: () => dispatch(addPreviousDayTodos()),
  updateNotificationTime: (user, mTime, eTime) => (
    dispatch(updateNotificationTime(user, mTime, eTime))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContentContainer);
