import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// Layouts
import App from 'layouts/app';

// UI
import Team from 'ui/team';
import Home from 'ui/pages/home/main';
import Admin from 'ui/admin/admin';
import Login from 'ui/login';
import Vulture from 'ui/pages/vulture/main';
import MinorLeagueDraft from 'ui/pages/minorLeagueDraft/main';
import FreeAgentAuction from 'ui/pages/freeAgentAuction/main';
import Trade from 'ui/pages/trade/main';
import Profile from 'ui/pages/profile/main';
import Standings from 'ui/pages/standings/main';
import Players from 'ui/pages/players/main';
import Keepers from 'ui/pages/keepers/main';
import MajorLeagueDraft from 'ui/pages/majorLeagueDraft/main';
import MinorLeagueDraftHistory from 'ui/pages/minorLeagueDraftHistory/main';

ReactDOM.render((
	<Provider store={store}>
	    <Router history={browserHistory}>
	        <Route component={App}>
	        	<Route path="/" component={Home} />
	        	<Route path="/login" component={Login} />
	        	<Route path="/team/:id" component={Team} />
	        	<Route path="/vulture" component={Vulture} />
	        	<Route path="/minorLeagueDraft" component={MinorLeagueDraft} />
	        	<Route path="/minorLeagueDraft/:season" component={MinorLeagueDraft} />
	        	<Route path="/freeAgentAuction" component={FreeAgentAuction} />
	        	<Route path="/trade" component={Trade} />
	        	<Route path="/profile" component={Profile} />
	        	<Route path="/admin" component={Admin} />
	        	<Route path="/standings" component={Standings} />
				<Route path="/players" component={Players} />
	        	<Route path="/keepers" component={Keepers} />
	        	<Route path="/keepers/:id" component={Keepers} />
	        	<Route path="/majorLeagueDraft" component={MajorLeagueDraft} />
				<Route path="/minorLeagueDraftHistory" component={MinorLeagueDraftHistory} />
	        </Route>
	    </Router>
    </Provider>
), document.getElementById('root'));