import React from 'react';
import {
	AppBar,
	Box,
	Button,
	Grid,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { useAuth0 } from '@auth0/auth0-react';

import SupportEmail from './SupportEmail';

const Page = ({ children }) => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<Grid
			container
			direction="column"
			justify="space-between"
			wrap="nowrap"
			style={{ minHeight: '100vh' }}
		>
			<div>
				<AppBar>
					<Toolbar>
						<Grid container justify="flex-end">
							{isAuthenticated ? (
								<Button
									color="inherit"
									onClick={() =>
										logout({
											returnTo: window.location.origin,
										})
									}
								>
									Logout
								</Button>
							) : (
								<Button
									color="inherit"
									onClick={loginWithRedirect}
								>
									Login
								</Button>
							)}
						</Grid>
					</Toolbar>
				</AppBar>
				<Toolbar />{' '}
				{/* This is needed to render the children properly */}
				<Box
					width="75%"
					marginTop={4}
					marginLeft="auto"
					marginRight="auto"
				>
					{children}
				</Box>
			</div>
			<footer
				style={{
					alignItems: 'center',
					backgroundColor: blue[300],
					display: 'flex',
					height: 50,
					justifyContent: 'space-around',
					marginTop: 64,
					padding: 16,
					width: '100%',
					color: 'white',
				}}
			>
				<Typography>
					Support: <SupportEmail style={{ color: 'white' }} />
				</Typography>
				<Typography>
					Made with <span role="img">❤️</span> &nbsp;in PDX
				</Typography>
			</footer>
		</Grid>
	);
};

export default Page;
