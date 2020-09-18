/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { Loader } from 'react-loaders';
import 'loaders.css/loaders.min.css';

import { signin } from '../../redux/authActions';
import { noop } from '../../utils';

import Login from './Login';

const useStyles = makeStyles({
  blockUi: {
    minHeight: '100vh',
  },
});

const LoginContainer = ({
  history,
  signInLoading,
  signin,
}) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('invalid email')
      .required('username is required'),
    password: Yup
      .string()
      .required('password is required'),
  });

  const loginButtonHandler = loginCred => {
    signin(loginCred).then(() => {
      history.push('/');
    });
  };

  const classes = useStyles();
  return (
    <BlockUi
      className={classes.blockUi}
      tag="div"
      blocking={signInLoading}
      loader={<Loader active type="line-scale-party" color="#3f51b5" />}
      renderChildren={false}
    >
      <Login
        initialValues={initialValues}
        validationSchema={validationSchema}
        loginButtonHandler={loginButtonHandler}
      />
    </BlockUi>
  );
};

LoginContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  signin: PropTypes.func,
  signInLoading: PropTypes.bool,
};

LoginContainer.defaultProps = {
  signin: noop,
  signInLoading: false,
};

const mapStateToProps = state => ({
  signInLoading: state.auth.signInLoading,
  user: state.auth.user,
});

const matchDispatchToProps = dispatch => ({
  signin: loginCred => dispatch(signin(loginCred)),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(withRouter(LoginContainer));
