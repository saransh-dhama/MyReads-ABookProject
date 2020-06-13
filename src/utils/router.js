import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Search from '../pages/search';

class Routes extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/search' component={Search} />
				</Switch>
			</>
		);
	}
}

export default Routes;
