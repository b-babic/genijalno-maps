import React, { Component } from "react";
// redux
import { connect } from "react-redux";
// form
import Form from "../../components/Form";
import Input from "../../components/Form/Input";
// action dispatchers
import {
  signinUser,
  authLoading,
  authErrorReset
} from "../../actions/actionCreators";

//styles
import styles from "./style.scss";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = (fieldName, value) => {
    this.setState(state => ({
      fields: {
        ...state.fields,
        [fieldName]: value
      }
    }));
  };

  handleSubmit = validate => {
    const { username, password } = this.state.fields;
    console.warn("username and pw", username, password);
    if (validate()) {
      // dispatch try login and redirect if login is success
      console.warn("SIGNIN IN");
      this.props.handleSigninUser(username, password);
    }
  };

  handleRenderingErrorMessages = () => {
    const { errorMessage } = this.props;
    let messages = [];
    let finalError = null;

    console.group("login messages");
    console.warn("errArr, messages", messages, errorMessage);
    console.groupEnd();

    if (errorMessage && typeof errorMessage !== "string") {
      console.error("MAPING");
      messages = errorMessage.map((err, index) => (
        <div key={index} className={styles.input__error}>
          {err}
        </div>
      ));
      finalError = messages;
    } else {
      return <div className={styles.input__error}>{errorMessage}</div>;
    }

    return finalError;
  };

  render() {
    const { handleSubmit, errorMessage, authLoading } = this.props;
    const submitButtonText = authLoading ? "Signing in. . ." : "Sign in";

    return (
      <Form
        className={styles.form}
        fields={{
          username: this.state.fields.username,
          password: this.state.fields.password
        }}
        rules={{
          username: val => !val && "Please enter your username",
          password: val => !val && "Please enter your password"
        }}
      >
        {(errors, validate) => (
          <div>
            <h2 className={styles.auth__title}>Log in</h2>
            <Input
              placeholder="username"
              value={this.state.fields.username || ""}
              error={errors.username}
              onChange={({ target: { value } }) =>
                this.handleChange("username", value)
              }
            />
            <Input
              placeholder="password"
              value={this.state.fields.password || ""}
              error={errors.password}
              onChange={({ target: { value } }) =>
                this.handleChange("password", value)
              }
              type="password"
            />

            {this.handleRenderingErrorMessages()}

            <div
              className={styles.login__btn}
              onClick={() => this.handleSubmit(validate)}
            >
              {submitButtonText}
            </div>
          </div>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  authLoading: state.auth.loading,
  errorMessage: state.auth.error,
  isAuthenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  handleAuthLoading: () => {
    dispatch(authLoading());
  },
  handleSigninUser: (username, password) => {
    console.warn("HANDLE SIGNIN USER", username, password);
    dispatch(signinUser(username, password));
  },
  handleResetFormError: () => {
    dispatch(authErrorReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
