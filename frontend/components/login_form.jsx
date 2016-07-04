const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const LoginForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
			formType: "login",
      username: undefined,
      password: "",
			fname: undefined,
			lname: undefined,
			email: undefined
    };
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/messages");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		let formData;
		if (this.state.formType === "login") {
			formData = {
				username: this.state.username,
				password: this.state.password
			};
			SessionActions.logIn(formData);
		} else {
			formData = {
				username: this.state.username,
				password: this.state.password,
				fname: this.state.fname,
				lname: this.state.lname,
				email: this.state.email
			};
			SessionActions.signUp(formData);
		}
	},

	handleDemo(e) {
		e.preventDefault();
		SessionActions.demoIn();
	},

  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.state.formType);

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

	toggleForm() {
		this.setState({formType: (this.state.formType === "login") ? "signup" : "login"});
	},

	render() {

    let navLink, demoButton, extraFields;
    if (this.state.formType === "login") {
      navLink = <div id="login_form_clickable" onClick={this.toggleForm}>sign up instead</div>;
			demoButton = <button type="button" onClick={this.handleDemo}>Try as a Guest</button>;
			extraFields = <br />;
    } else {
      navLink = <div id="login_form_clickable" onClick={this.toggleForm}>log in instead</div>;
			extraFields = (
				<div>
				<label> First Name:
					{ this.fieldErrors("fname") }
					<input type="text"
					value={this.state.fname}
					onChange={this.update("fname")} />
 				</label>
				<br />
				<label> Last Name:
					{ this.fieldErrors("lname") }
					<input type="text"
					value={this.state.lname}
					onChange={this.update("lname")} />
				</label>
				<br />
				<label> Email:
					{ this.fieldErrors("email") }
					<input type="text"
					value={this.state.email}
					onChange={this.update("email")} />
				</label>
				</div>
			);
    }

		return (
			<form onSubmit={this.handleSubmit}>
        Welcome to Slamk! Please { this.state.formType } or { navLink }

        { this.fieldErrors("base") }

        <br />
				<label> Username:
          { this.fieldErrors("username") }
					<input type="text"
            value={this.state.username}
            onChange={this.update("username")} />
				</label>

				{extraFields}

				<label> Password:
          { this.fieldErrors("password") }
          <input type="password"
            value={this.state.password}
            onChange={this.update("password")} />
				</label>

        <br />
				<input type="submit" value="Submit" />
					{demoButton}
			</form>
		);
	}
});

module.exports = LoginForm;
