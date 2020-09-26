import React from 'react';
import { Formik, Form } from 'formik';
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
} from '@material-ui/core';
import * as yup from 'yup';

import { LinkedPhoneNumberInput } from './PhoneNumber';
import { LinkedTextInput } from './TextInput';
import Dialog from './Dialog';
import PrimaryButton from './PrimaryButton';

const validationSchema = yup.object().shape({
	defaultText: yup
		.string()
		.max(250, 'Default text must be at most 250 characters')
		.required('Please enter the default text'),
	phoneNumber: yup
		.string()
		.matches(/^[0-9]{10}$/, 'Please enter a valid phone number')
		.required('Please enter a phone number'),
});

const MessageForm = ({ open, onClose, title, initialValues, onSubmit }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<Formik
				initialValues={{
					defaultText: `Your URL has been hit! Time for some 🎂!`,
					phoneNumber: '',
					...initialValues,
				}}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						await onSubmit(values);
						onClose();
					} catch (err) {
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<DialogTitle>{title}</DialogTitle>
						<DialogContent>
							<Grid container direction="column" spacing={4}>
								<Grid item>
									<LinkedPhoneNumberInput name="phoneNumber" />
								</Grid>
								<Grid item>
									<LinkedTextInput name="defaultText" />
								</Grid>
							</Grid>
						</DialogContent>
						<DialogActions>
							<PrimaryButton
								type="submit"
								disabled={isSubmitting}
							>
								Save
							</PrimaryButton>
							<Button
								onClick={e => {
									e.stopPropagation();
									onClose();
								}}
							>
								Cancel
							</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default MessageForm;
