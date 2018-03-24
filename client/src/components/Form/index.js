import { PureComponent } from "react";

class Form extends PureComponent {
  constructor() {
    super();
    this.state = {
      errors: {},
      isValid: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const changedFields = Object.keys(nextProps.fields).reduce((acc, key) => {
      if (nextProps.fields[key] !== this.props.fields[key]) {
        return { ...acc, [key]: nextProps.fields[key] };
      }
      return acc;
    }, {});

    this.validate(changedFields);
  }

  validate = fields => {
    const fieldsToValidate = fields || this.props.fields;
    const errors = Object.keys(fieldsToValidate).reduce((acc, key) => {
      const rule = this.props.rules[key];

      if (rule) {
        const originalValue = fieldsToValidate[key];
        const value =
          typeof originalValue === "string"
            ? fieldsToValidate[key].trim()
            : originalValue;
        const error = rule(value) || undefined;

        return { ...acc, [key]: error };
      }
      return acc;
    }, this.state.errors);

    const isValid = Object.keys(errors).filter(key => errors[key]).length === 0;

    if (this.state.isValid !== isValid && this.props.onChange) {
      this.props.onChange(isValid);
    }

    this.setState({
      errors,
      isValid
    });
    return isValid;
  };

  render() {
    const { errors, isValid } = this.state;
    return this.props.children(errors, this.validate, isValid);
  }
}

export default Form;
