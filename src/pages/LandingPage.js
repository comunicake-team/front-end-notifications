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
				This is the description of the service we offer Lorem ipsum
				dolor sit amet consectetur adipisicing elit. Molestias nihil
				corporis odio vero a fugiat accusantium aspernatur nisi quasi,
				iste quae magni tempora voluptas est autem doloribus, enim
				dolorum ratione? SHES ALLIIIIIVEE
			</Typography>
		</Page>
	);
};

export default LandingPage;
