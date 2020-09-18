import React from 'react';
import { Form, Field, Formik } from 'formik';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { noop } from '../../utils';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

function Login({
  loginButtonHandler,
  initialValues,
  validationSchema,
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Formik
          validateOnChange
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginButtonHandler}
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
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    Create new account? Sign up
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

Login.propTypes = {
  loginButtonHandler: PropTypes.func,
  initialValues: PropTypes.instanceOf(Object),
  // validationSchema: PropTypes.instanceOf(Object),
};

Login.defaultProps = {
  loginButtonHandler: noop,
  initialValues: {},
  // validationSchema: {},
};

export default Login;
