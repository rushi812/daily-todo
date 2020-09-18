import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import { noop } from '../../utils';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Signup({
  signupButtonHandler,
  validationSchema,
  initialValues,
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          validateOnChange
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={data => {
            signupButtonHandler(data);
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    name="email"
                    type="input"
                    variant="outlined"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email ? errors.email : ''}
                    as={TextField}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="password"
                    type="password"
                    variant="outlined"
                    label="Password"
                    fullWidth
                    autoComplete="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password ? errors.password : ''}
                    as={TextField}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

Signup.propTypes = {
  signupButtonHandler: PropTypes.func,
  validationSchema: PropTypes.instanceOf(Object),
  initialValues: PropTypes.instanceOf(Object),
};

Signup.defaultProps = {
  signupButtonHandler: noop,
  validationSchema: {},
  initialValues: {},
};

export default Signup;
