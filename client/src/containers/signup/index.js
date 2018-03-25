import React, { Component } from "react";
// redux
import { connect } from "react-redux";
// form
import Form from "../../components/Form";
import Input from "../../components/Form/Input";
// action dispatchers
import { signupUser, authErrorReset } from "../../actions/actionCreators";
// redirect
import { Redirect } from "react-router-dom";

//styles
import styles from "./style.scss";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: "",
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
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
    const {
      name,
      email,
      username,
      password,
      passwordConfirm
    } = this.state.fields;

    if (validate()) {
      // dispatch try login and redirect if login is success
      console.warn("SIGNING UP");
      this.props.handleSignupUser({
        name,
        email,
        username,
        password,
        passwordConfirm
      });
    }
  };

  componentDidMount() {
    this.props.handleResetFormError();
  }

  render() {
    const {
      handleSubmit,
      errorMessage,
      isAuthenticated,
      authLoading
    } = this.props;
    const submitButtonText = authLoading ? "Signing up. . ." : "Sign up";

    if (isAuthenticated) {
      console.log("authenticated, you have successfully signed up!");
      return <Redirect to="/user" />;
    }

    return (
      <Form
        className={styles.form}
        fields={{
          username: this.state.fields.username,
          password: this.state.fields.password,
          passwordConfirm: this.state.fields.passwordConfirm,
          name: this.state.fields.name,
          email: this.state.fields.email
        }}
        rules={{
          username: val => !val && "Please enter your username",
          password: val => !val && "Please enter your password",
          passwordConfirm: val => !val && "Please enter yout password",
          name: val => !val && "Please enter your name",
          email: val => !val && "Please enter your email"
        }}
      >
        {(errors, validate) => (
          <div>
            <Input
              placeholder="username"
              value={this.state.fields.username || ""}
              error={errors.username}
              onChange={({ target: { value } }) =>
                this.handleChange("username", value)
              }
            />

            <Input
              placeholder="email"
              value={this.state.fields.email || ""}
              error={errors.email}
              onChange={({ target: { value } }) =>
                this.handleChange("email", value)
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

            <Input
              placeholder="passwordConfirm"
              value={this.state.fields.passwordConfirm || ""}
              error={errors.passwordConfirm}
              onChange={({ target: { value } }) =>
                this.handleChange("passwordConfirm", value)
              }
              type="password"
            />

            <Input
              placeholder="name"
              value={this.state.fields.name || ""}
              error={errors.name}
              onChange={({ target: { value } }) =>
                this.handleChange("name", value)
              }
              type="text"
            />

            {errorMessage && (
              <div className="form-error-text">{errorMessage}</div>
            )}

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
  handleSignupUser: ({ name, email, username, password, passwordConfirm }) => {
    dispatch(
      signupUser({
        name,
        email,
        username,
        password,
        passwordConfirm
      })
    );
  },
  handleResetFormError: () => {
    dispatch(authErrorReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
