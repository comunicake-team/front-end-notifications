import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useAuth0 } from '@auth0/auth0-react';

function AuthRedirectWrapper({ children }) {
	const history = useHistory();
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return 'Loading...';
	}

	if (!isAuthenticated) {
		history.push('/');
	} else {
		console.log(user);
		history.push(`/${user.email}/profile`);
	}

	return children;
}

function App() {
	return (
		<Router>
			<AuthRedirectWrapper>
				<Switch>
					<Route path="/:id/profile">
						<Profile />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</AuthRedirectWrapper>
		</Router>
	);
}

export default App;
