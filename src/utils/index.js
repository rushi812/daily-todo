/* eslint-disable no-alert */
import { toast } from 'react-toastify';
import { css } from 'glamor';
import moment from 'moment';

export const noop = () => { };

export const previousDay = moment(moment(new Date()).subtract(1, 'days')).format('DDMMYYYY');
export const lastFriday = moment(moment(new Date()).subtract(3, 'days')).format('DDMMYYYY');

export const formatedTime = t => (t ? moment(t).format('LT') : moment().format('LT'));
export const formatedDate = d => moment(d).format('LL');

export const todoFormatter = data => (
  data.map(todo => (
    (todo.isDone)
      ? `\n Done: ${formatedDate(todo.createdAt)} -- ${todo.todo}`
      : `\n Pending: ${formatedDate(todo.createdAt)} -- ${todo.todo}`))
);

export const copyTodoToast = (date, cb) => {
  toast.info(`Todos for ${date} copied to clipboard`, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    onClose: () => cb(),
    className: css({
      background: 'dodgreblue !important',
    }),
    bodyClassName: css({
      fontSize: '1rem',
      color: '#fff',
    }),
    progressClassName: css({
      background: '#ddd !important',
    }),
  });
};

export const addTodoToast = body => {
  toast.success(`Todo "${body}" added today at ${moment(new Date()).format('LT')}`, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    className: css({
      background: '#7986cb !important',
    }),
    bodyClassName: css({
      fontSize: '1rem',
      color: '#eee',
    }),
    progressClassName: css({
      background: '#eee !important',
    }),
  });
};

function notify(bodyText) {
  const title = 'DAILY TODO';
  const options = {
    body: bodyText,
  };
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        const notification = new Notification(title, options);
      }
    });
  }
}

export const notifyAt = (t, text) => {
  if ((t === moment().format('ha')) || (t === moment().format('h:mma'))) {
    notify(text);
  }
};

export const checkForTime = data => {
  const extractedTime = data.match(/at\s((\d)|(\d\s)|(\d{1,2}:\d{2})|(\d{1,2}:\d{2}\s))(pm|am)/gi);
  const time = extractedTime && extractedTime[0].slice(3).replace(' ', '').toLowerCase();
  const todoText = data.split(extractedTime)[0].trim();
  if (time) {
    notifyAt(time, todoText);
  }
};

export const notifyMe = (m, e) => {
  const currentTime = formatedTime();
  if (currentTime > m && currentTime <= '12:00 PM') {
    notify('Good Morning! Lets add some todos :)');
  } else if (m === currentTime) {
    notify('Good Morning! Lets add some todos :)');
  } else if (e === currentTime) {
    notify('Good Evening! Please submit the todos :)');
  }
};

export const defaultTime = h => {
  const time = h;
  const day = moment();
  const [hours, minutes, seconds] = time.split(':');
  day.set({ hours, minutes, seconds });
  return moment(day).format();
};
