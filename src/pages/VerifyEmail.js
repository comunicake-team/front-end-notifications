import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Page from '../components/Page';

const VerifyEmail = () => {
	return (
		<Page>
			<Card>
				<CardContent>
					<Alert severity="info">
						A verification email has been sent to the email address
						you used to sign up. Please follow the instructions in
						the email, then try logging in again.
					</Alert>
				</CardContent>
			</Card>
		</Page>
	);
};

export default VerifyEmail;
