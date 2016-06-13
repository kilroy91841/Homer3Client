import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// Layouts
import App from 'layouts/app';

// UI
import Team from 'ui/team';
import Home from 'ui/home';
import Admin from 'ui/admin/admin';
import Trade from 'ui/admin/trade/trade';
import Login from 'ui/login';
import Vulture from 'ui/pages/vulture/main';
import MinorLeagueDraft from 'ui/pages/minorLeagueDraft/main';
import Profile from 'ui/pages/profile/main';

ReactDOM.render((
	<Provider store={store}>
	    <Router history={browserHistory}>
	        <Route component={App}>
	        	<Route path="/" component={Home} />
	        	<Route path="/login" component={Login} />
	        	<Route path="/team/:id" component={Team} />
	        	<Route path="/vulture" component={Vulture} />
	        	<Route path="/minorLeagueDraft" component={MinorLeagueDraft} />
	        	<Route path="/profile" component={Profile} />
	        	<Route path="/admin" component={Admin} />
	        	<Route path="/admin/trade" component={Trade} />
	        </Route>
	    </Router>
    </Provider>
), document.getElementById('root'));