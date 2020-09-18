import moment from 'moment';
import firebase from '../firebase/firebase';

const db = firebase.firestore();

const get = async (email, date) => {
  const getResponse = await db.collection('todosList').doc(email).collection(date)
    .get()
    .then(querySnapshot => {
      const todoList = [];
      querySnapshot.forEach(doc => {
        todoList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return todoList;
    })
    .catch(err => console.log('Error while fetching collection from database', err));
  return getResponse;
};

const add = async (email, date, data) => {
  const currentDate = moment(date).format('DDMMYYYY');
  const createdAt = +new Date();
  const getResponse = await db.collection('todosList').doc(email).collection(currentDate)
    .add({
      ...data,
      isDone: false,
      createdAt,
    })
    .then(docRef => ({
      id: docRef.id,
      isDone: false,
      createdAt,
      ...data,
    }))
    .catch(err => console.log('error', err));
  return getResponse;
};

const del = async (email, id, date) => {
  const getResponse = await db.collection('todosList').doc(email).collection(date).doc(id)
    .delete()
    .then(() => ({
      id,
    }))
    .catch(err => console.log('error', err));
  return getResponse;
};

const done = async (todo, email, date) => {
  const getResponse = await db.collection('todosList').doc(email).collection(date).doc(todo.id)
    .update({ isDone: !todo.isDone })
    .then(() => ({
      id: todo.id,
      createdAt: todo.createdAt,
    }));
  return getResponse;
};

const update = async (id, data, email, date) => {
  const getResponse = await db.collection('todosList').doc(email).collection(date).doc(id)
    .update({ todo: data.todo })
    .then(() => ({
      id,
      data,
    }));
  return getResponse;
};

const updateTime = async (email, mTime, eTime) => {
  const getResponse = await db.collection('todosList').doc(email)
    .update({ mTime, eTime });
  return getResponse;
};

const fetchTime = async email => {
  const getResponse = await db.collection('todosList').doc(email)
    .get()
    .then(doc => ({
      data: doc.data(),
    }));
  return getResponse;
};

const setTime = async (email, mTime, eTime) => {
  const getResponse = await db.collection('todosList').doc(email)
    .set({ mTime, eTime });
  return getResponse;
};

export default {
  get,
  add,
  del,
  done,
  update,
  updateTime,
  fetchTime,
  setTime,
};
