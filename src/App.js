import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './utils/router.js';
const App = () => {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
};

export default App;
