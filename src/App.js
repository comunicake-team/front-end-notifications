import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { DialogContextProvider } from './components/GlobalDialog';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';

import theme from './theme';

function AuthRedirectWrapper({ children }) {
	const history = useHistory();
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return 'Loading...';
	}

	if (!isAuthenticated) {
		history.push('/');
	} else {
		history.push(`/profile/${user.email}`);
	}

	return children;
}

function App() {
	return (
		<SnackbarProvider
			maxSnack={3}
			autoHideDuration={3000}
			variant="success"
		>
			<MuiThemeProvider theme={theme}>
				<DialogContextProvider>
					<Router>
						<AuthRedirectWrapper>
							<Switch>
								<Route path="/profile/:id">
									<Profile />
								</Route>
								<Route path="/">
									<LandingPage />
								</Route>
							</Switch>
						</AuthRedirectWrapper>
					</Router>
				</DialogContextProvider>
			</MuiThemeProvider>
		</SnackbarProvider>
	);
}

export default App;
