import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Page from '../components/Page';

const LoadingPage = props => {
	return (
		<Page>
			<Grid container justify="center">
				<CircularProgress />
			</Grid>
		</Page>
	);
};

export default LoadingPage;
