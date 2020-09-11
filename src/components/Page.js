import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { useAuth0 } from '@auth0/auth0-react';

import SupportEmail from './SupportEmail';
import PrimaryButton from './PrimaryButton';

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
				<Grid container justify="flex-end" style={{ padding: 16 }}>
					{isAuthenticated ? (
						<PrimaryButton
							onClick={() =>
								logout({
									returnTo: window.location.origin,
								})
							}
						>
							Logout
						</PrimaryButton>
					) : (
						<PrimaryButton onClick={loginWithRedirect}>
							Login
						</PrimaryButton>
					)}
				</Grid>
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
					backgroundColor: blueGrey[500],
					boxSizing: 'border-box',
					color: 'white',
					display: 'flex',
					height: 50,
					justifyContent: 'space-around',
					marginTop: 64,
					padding: 16,
					width: '100%',
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
