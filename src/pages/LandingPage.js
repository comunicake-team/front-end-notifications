import React from 'react';
import { Typography } from '@material-ui/core';

import Page from '../components/Page';

const LandingPage = () => {
	return (
		<Page>
			<Typography variant="h2" gutterBottom>
				Welcome to comunicake!
			</Typography>
			<Typography variant="h5" gutterBottom>
				Simple text notifications
			</Typography>
			<Typography>
				Comunicake is a simple, straightforward site for people who want to send short notifications by accessing a URL.
			</Typography>
			<br />
			<Typography>
				There's no need to write any code. Create an account, create a new message with a destination phone number and click the link to send the message. Piece of cake 🍰!
			</Typography>
			<br />
			<center><img src="/landing.png" height="500px" border="1px solid"></img></center>
		</Page>
	);
};

export default LandingPage;
