/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CronJob } from 'cron';

import { fetchLoggedInUserData } from '../../redux/authActions';
import { fetchTodos } from '../../redux/todoActions';
import { fetchPreviousDayTodos } from '../../redux/previousdayActions';
import { fetchNotificationTime, setNotificationTime } from '../../redux/notificationActions';
import {
  noop, notifyMe, previousDay, lastFriday, formatedTime,
} from '../../utils';
import firebase from '../../firebase/firebase';
import Home from './Home';

const HomeContaciner = ({
  fetchLoggedInUserData,
  fetchTodos,
  fetchPreviousDayTodos,
  fetchNotificationTime,
  setNotificationTime,
  changedMorningTime,
  changedEveningTime,
  date,
}) => {
  const prevMTimeRef = useRef();
  const prevETimeRef = useRef();

  useEffect(() => {
    if (formatedTime() > formatedTime(changedMorningTime)) {
      notifyMe(formatedTime(changedMorningTime), formatedTime(changedEveningTime));
    }
  }, []);

  useEffect(() => {
    prevMTimeRef.current = changedMorningTime;
    prevETimeRef.current = changedEveningTime;
    const job = new CronJob('00 */1 * * * *', (() => {
      const morningTime = formatedTime(prevMTimeRef.current);
      const eveningTime = formatedTime(prevETimeRef.current);
      const currentTime = formatedTime();
      if (morningTime === currentTime || eveningTime === currentTime) {
        notifyMe(morningTime, eveningTime);
      }
    }));
    job.start();
  }, [changedMorningTime, changedEveningTime]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        fetchLoggedInUserData(currentUser);
        fetchTodos(currentUser, date);
        fetchNotificationTime(currentUser).then(res => {
          if (res.value.data === undefined) {
            setNotificationTime(currentUser, changedMorningTime, changedEveningTime);
          }
        });
        if (moment(new Date()).format('dddd') === 'Monday') fetchPreviousDayTodos(currentUser, lastFriday);
        else fetchPreviousDayTodos(currentUser, previousDay);
      }
    });
  }, []);

  return (
    <Home />
  );
};

HomeContaciner.propTypes = {
  fetchLoggedInUserData: PropTypes.func,
  fetchTodos: PropTypes.func,
  fetchPreviousDayTodos: PropTypes.func,
  fetchNotificationTime: PropTypes.func,
  setNotificationTime: PropTypes.func,
  date: PropTypes.string,
  changedMorningTime: PropTypes.string,
  changedEveningTime: PropTypes.string,
};

HomeContaciner.defaultProps = {
  fetchLoggedInUserData: noop,
  fetchTodos: noop,
  fetchPreviousDayTodos: noop,
  fetchNotificationTime: noop,
  setNotificationTime: noop,
  date: '',
  changedMorningTime: '',
  changedEveningTime: '',
};

const mapStateToProps = state => ({
  date: state.todo.date,
  changedMorningTime: state.notification.changedMorningTime,
  changedEveningTime: state.notification.changedEveningTime,
});

const mapDispatchToProps = dispatch => ({
  fetchLoggedInUserData: user => dispatch(fetchLoggedInUserData(user)),
  fetchTodos: (user, date) => dispatch(fetchTodos(user, date)),
  fetchPreviousDayTodos: (user, date) => dispatch(fetchPreviousDayTodos(user, date)),
  fetchNotificationTime: user => dispatch(fetchNotificationTime(user)),
  setNotificationTime: (user, mTime, eTime) => dispatch(setNotificationTime(user, mTime, eTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContaciner);
