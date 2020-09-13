import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import Page from '../components/Page';
import SupportEmail from '../components/SupportEmail';

const LandingPage = () => {
	return (
		<Page>
			<Typography variant="h3" gutterBottom>
				Welcome to comunicake!
			</Typography>
			<Typography variant="h5" gutterBottom>
				Simple text notifications
			</Typography>
			<Typography>
				Comunicake is a simple, straightforward site for people who want
				to send short sms notifications by accessing a URL. Right now we
				are in beta, so its totally free! Each user will get 100
				messages to send, if you need more or would like to provide
				feedback, please contact us at <SupportEmail />.
			</Typography>
			<br />
			<Typography>
				To get started, click the login button to create an account.
				Once you've been authenticated, you will be redirected to your
				profile page were you can create messages to send. Create a new
				message with a destination phone number and default text, then
				click the link to send the message. Piece of cake 🍰!
			</Typography>
			<br />
			<Grid container justify="center">
				<img
					src="/landing.png"
					style={{
						border: '1px solid black',
						maxHeight: 500,
						maxWidth: '100%',
					}}
				></img>
			</Grid>
			<Typography style={{ marginTop: 16 }}>
				The links can be embeded in an email, used as a webhook, or
				accessed in your program when you need to be notified of an
				event.
			</Typography>
		</Page>
	);
};

export default LandingPage;
