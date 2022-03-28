import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleInputChange = ({ target: { id, value } }) => (
    this.setState({ [id]: value })
  );

  isDisabled = () => {
    const PASSWORD_LENGTH = 6;
    const REGEX_EMAIL = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm);
    const { email, password } = this.state;
    if (email.length <= 0
    || !REGEX_EMAIL.test(email)
    || password.length < PASSWORD_LENGTH) {
      return true;
    } return false;
  }

  onButtonSubmit = async () => {
    const { history/* , getUserEmailDispatch  */ } = this.props;
    // const { email } = this.state;
    history.push('/foods');
    // getUserEmailDispatch(email);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="userEmail">
            <input
              id="email"
              data-testid="email-input"
              type="email"
              placeholder="Email:"
              value={ email }
              onChange={ this.handleInputChange }
              required
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="Senha:"
              value={ password }
              onChange={ this.handleInputChange }
              required
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ this.isDisabled() }
            onClick={ () => this.onButtonSubmit() }
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  // getUserEmailDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getUserEmailDispatch: (value) => dispatch(getUserEmail(value)),
});

export default connect(null, mapDispatchToProps)(Login);
