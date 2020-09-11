import React from 'react';
import { Typography } from '@material-ui/core';

import Page from '../components/Page';

const LandingPage = () => {
	return (
		<Page>
			<Typography variant="h3" gutterBottom>
				Welcome to My FUcking App
			</Typography>
			<Typography>
				This is the description of the service we offer
			</Typography>
		</Page>
	);
};

export default LandingPage;
