const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
import { Form, FormGroup, Col, FormControl, Button, Nav, NavItem } from 'react-bootstrap';

const LoginForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
			formType: "login",
      username: "",
      password: "",
			fname: "",
			lname: "",
			email: ""
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
      this.context.router.push("/messages/general");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		let formData;
		if (this.state.formType === "login") {
			formData = {
				username: (this.state.username || undefined),
				password: this.state.password
			};
			SessionActions.logIn(formData);
		} else {
			formData = {
				username: (this.state.username || undefined),
				password: this.state.password,
				fname: (this.state.fname || undefined),
				lname: (this.state.lname || undefined),
				email: (this.state.email || undefined)
			};
			SessionActions.signUp(formData);
		}
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

	handleSelect(selectedKey) {
		if (selectedKey === "demo") {
			SessionActions.demoIn();
		} else {
			this.setState({formType: selectedKey});
		}
	},

	render() {
    let extraFields, submitText;
    if (this.state.formType === "login") {
			submitText = "Sign in";
    } else {
			submitText = "Sign Up";
			extraFields = (
				<div>
					<FormGroup controlId="formHorizontalFirstName">
						<Col sm={10}>
						<FormControl type="text" placeholder="First Name" value={this.state.fname} onChange={this.update("fname")} />{ this.fieldErrors("fname") }
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalLastName">
						<Col sm={10}>
						<FormControl type="text" placeholder="Last Name" value={this.state.lname} onChange={this.update("lname")} />{ this.fieldErrors("lname") }
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalEmail">
						<Col sm={10}>
							<FormControl type="email" placeholder="leslie.knope@example.com" value={this.state.email} onChange={this.update("email")} />{ this.fieldErrors("email") }
						</Col>
					</FormGroup>
				</div>
			);
    }

		return (
			<div className="log-in-form">
				<Nav bsStyle="tabs" justified activeKey={this.state.formType} onSelect={this.handleSelect}>
					<NavItem eventKey={"login"} >Sign In</NavItem>
					<NavItem eventKey={"demo"} >Try as a Guest</NavItem>
					<NavItem eventKey={"signup"} >Sign Up</NavItem>
				</Nav>

				<Form id="log-in-inputs" horizontal onSubmit={this.handleSubmit}>
					{ this.fieldErrors("base") }

					<FormGroup controlId="formHorizontalUsername">
					  <Col sm={10}>
					    <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.update("username")} />{ this.fieldErrors("username") }
					  </Col>
					</FormGroup>

					{extraFields}

					<FormGroup controlId="formHorizontalPassword">
					  <Col sm={10}>
					    <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.update("password")} />{ this.fieldErrors("password") }
					  </Col>
					</FormGroup>

					<FormGroup>
					  <Col sm={10}>
					    <Button bsStyle="success" type="submit">
					      {`${submitText}`}
					    </Button>
					  </Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
});

module.exports = LoginForm;
