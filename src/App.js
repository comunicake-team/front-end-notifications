import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { SnackbarProvider } from 'notistack';

import { DialogContextProvider } from './components/GlobalDialog';
import Login from './pages/Login';
import Profile from './pages/Profile';

function AuthRedirectWrapper({ children }) {
	const history = useHistory();
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return 'Loading...';
	}

	if (!isAuthenticated) {
		history.push('/');
	} else {
		history.push(`/${user.email}/profile`);
	}

	return children;
}

function App() {
	return (
		<SnackbarProvider maxSnack={3} autoHideDuration={3000}>
			<DialogContextProvider>
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
			</DialogContextProvider>
		</SnackbarProvider>
	);
}

export default App;
