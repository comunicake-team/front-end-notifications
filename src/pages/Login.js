import React from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Grid
			container
			style={{ width: '100vw', height: '100vh' }}
			direction="column"
			justify="center"
			alignItems="center"
			spacing={8}
		>
			<Grid item>
				<Typography variant="h2">
					Please Login You Sack of Shit
				</Typography>
			</Grid>
			<Grid item>
				<Button
					onClick={loginWithRedirect}
					variant="contained"
					color="primary"
				>
					Login
				</Button>
			</Grid>
		</Grid>
	);
};

export default Login;
