/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import { Loader } from 'react-loaders';
import 'loaders.css/loaders.min.css';

import { signup } from '../../redux/authActions';
import { noop } from '../../utils';

import Signup from './Signup';

const useStyles = makeStyles({
  blockUi: {
    minHeight: '100vh',
  },
});

const SignupContainer = ({
  history,
  signUpLoading,
  signup,
}) => {
  const classes = useStyles();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('email is not valid')
      .required('email is required'),
    password: Yup
      .string()
      .required('password is required'),
  });

  const signupButtonHandler = user => {
    signup(user).then(() => {
      history.push('/');
    });
  };

  return (
    <BlockUi
      className={classes.blockUi}
      tag="div"
      blocking={signUpLoading}
      loader={<Loader active type="line-scale-party" color="#3f51b5" />}
      renderChildren={false}
    >
      <Signup
        initialValues={initialValues}
        validationSchema={validationSchema}
        signupButtonHandler={signupButtonHandler}
      />
    </BlockUi>
  );
};

SignupContainer.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  signup: PropTypes.func,
  signUpLoading: PropTypes.bool,
};

SignupContainer.defaultProps = {
  signup: noop,
  signUpLoading: false,
};

const mapStateToProps = state => ({
  signUpLoading: state.auth.signUpLoading,
});

const matchDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
});

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(withRouter(SignupContainer));
