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
        username: "",
        password: "",
        email: ""
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
    const { username, password, email } = this.state.fields;

    if (validate()) {
      // dispatch try login and redirect if login is success
      console.warn("SIGNING UP");
      this.props.handleSignupUser(username, password, email);
    }
  };

  componentDidMount() {
    this.props.handleResetFormError();
  }

  handleRenderingErrorMessages = () => {
    const { errorMessage } = this.props;
    let messages = [];
    if (errorMessage) {
      console.warn("have errors", errorMessage);
      messages = errorMessage.map((err, index) => (
        <div key={index} className={styles.input__error}>
          {err}
        </div>
      ));
    }

    return messages;
  };

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
          password: this.state.fields.password,
          username: this.state.fields.username,
          email: this.state.fields.email
        }}
        rules={{
          password: val => !val && "Please enter your password",
          username: val => !val && "Please enter your username",
          email: val => !val && "Please enter your username"
        }}
      >
        {(errors, validate) => (
          <div>
            <h2 className={styles.auth__title}>Sign up</h2>

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
              type="email"
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
  handleSignupUser: (username, password, email) => {
    dispatch(signupUser(username, password, email));
  },
  handleResetFormError: () => {
    dispatch(authErrorReset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
