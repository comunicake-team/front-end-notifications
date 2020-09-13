import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

import { DialogContextProvider } from './components/GlobalDialog';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import MessageQRCode from './pages/MessageQRCode';

import theme from './theme';

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
						<Switch>
							<Route path="/profile/:email">
								<Profile />
							</Route>
							<Route path="/message/:publicId/qr-code">
								<MessageQRCode />
							</Route>
							<Route path="/">
								<LandingPage />
							</Route>
						</Switch>
					</Router>
				</DialogContextProvider>
			</MuiThemeProvider>
		</SnackbarProvider>
	);
}

export default App;
