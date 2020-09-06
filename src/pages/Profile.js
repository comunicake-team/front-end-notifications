import React from 'react';
import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const Profile = props => {
	const { id } = useParams();
	const { logout } = useAuth0();

	return (
		<div>
			<Typography variant="h2">
				Suck My DIck Person with id of: {id}
			</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={() => logout({ returnTo: window.location.origin })}
			>
				Log Out
			</Button>
		</div>
	);
};

export default Profile;
