import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// Layouts
import App from 'layouts/app';

// UI
import Team from 'ui/team';
import Explainer from 'ui/explainer';

ReactDOM.render((
	<Provider store={store}>
	    <Router history={browserHistory}>
	        <Route component={App}>
	        	<Route path="/" component={Explainer} />
	        	<Route path="/team/:id" component={Team} />
	        </Route>
	    </Router>
    </Provider>
), document.getElementById('root'));