import React from 'react';
import Store from 'store';

import { withRouter } from 'react-router'

import { login, passwordReset} from 'api/api';
import { removeUser } from 'auth';

const Login = React.createClass({
	login: function(e) {
		e.preventDefault();
		this.startProgress();
		const self = this;
		login(this.refs.userName.value, this.refs.password.value, function(response) {
			var user = response.data.data;
			localStorage.setItem('user', JSON.stringify(user));
			self.completeProgress();
			self.props.router.push("/");
		}, function(error) {
			self.completeProgress();
			alert("Login Unsuccessful");
			removeUser();
		});
	},
	passwordReset: function(e) {
		e.preventDefault();
		const self = this;
		passwordReset(this.refs.email.value, function(response) {
			if (response.data.data) {
				alert("Please check your e-mail for the password reset link");
			} else {
				alert("Error sending e-mail");
			}
		}, function(error) {
			alert("Error sending e-mail");
		});
	},
	startProgress: function() {
		Store.dispatch({
            type: 'PROGRESS_BAR',
            progressBar: {
            	percent : 50
            }
        });
	},
	completeProgress: function() {
		Store.dispatch({
            type: 'PROGRESS_BAR',
            progressBar: {
            	percent : 100
            }
        });
	},
	render: function() {
		return (
			<div className="row">
				<div classnName="col-md-12">
					<div className="row">
						<div className="col-md-6">
							<form className="form-signin" onSubmit={this.login}>
								<h2 className="form-signin-heading">Sign In</h2>
								<input type="text" ref="userName" className="form-control" placeholder="Username or e-mail" required autofocus />
								<input type="password" ref="password" className="form-control" placeholder="Password" required />
								<button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
							</form>
						</div>
						<div className="col-md-6">
							<form className="form-signin" onSubmit={this.passwordReset}>
								<h2 className="form-signin-heading">Forgot your password?</h2>
								<input type="text" ref="email" className="form-control" placeholder="E-mail" required autofocus />
								<button className="btn btn-lg btn-primary btn-block" type="submit">Send Password Reset E-mail</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default withRouter(Login);