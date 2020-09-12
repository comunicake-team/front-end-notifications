import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { PhoneNumber } from '../components/PhoneNumber';
import { useDialogContext } from '../components/GlobalDialog';
import ActionMenu from '../components/ActionMenu';
import LoadingPage from '../components/LoadingPage';
import MessageForm from '../components/MessageForm';
import Page from '../components/Page';
import PrimaryButton from '../components/PrimaryButton';
import SupportEmail from '../components/SupportEmail';
import Table from '../components/Table';

import useApi from '../hooks/useApi';

const Profile = () => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState({});
	const { getUrl, createMessage, getMessages, getUser } = useApi();
	const { enqueueSnackbar } = useSnackbar();
	const { showDialog } = useDialogContext();

	useEffect(() => {
		setLoading(true);
		Promise.all([getMessages(), getUser()])
			.then(([messages, user]) => {
				setMessages(messages);
				setUser(user);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Page>
			<Card>
				<CardContent>
					<Box margin={8} marginTop={2}>
						<Typography variant="h4" align="center" gutterBottom>
							Welcome {user.email}
						</Typography>
						<Alert
							severity={
								user.messagesRemaining <= 10
									? 'warning'
									: 'info'
							}
						>
							You have {user.messagesRemaining} messages left to
							send. If you'd like more, please contact us at{' '}
							<SupportEmail />.
						</Alert>
					</Box>
					<Box m={1}>
						<Grid
							container
							justify="flex-start"
							alignItems="center"
						>
							<PrimaryButton
								startIcon={<Add />}
								display="block"
								onClick={() =>
									showDialog(MessageForm, {
										title: 'Create A New Message',
										onSubmit: async message => {
											await createMessage(
												message
											).then(message =>
												setMessages(messages => [
													message,
													...messages,
												])
											);
											enqueueSnackbar('Message Created!');
										},
									})
								}
							>
								New Message
							</PrimaryButton>
						</Grid>
					</Box>
					{messages.length === 0 ? (
						<Alert severity="info">
							You have not created any messages.
						</Alert>
					) : (
						<Table
							columns={[
								{
									title: 'Phone Number',
									field: 'phoneNumber',
									render: ({ phoneNumber }) => (
										<PhoneNumber value={phoneNumber} />
									),
								},
								{
									title: 'Default Text',
									field: 'defaultText',
								},
								{
									title: 'URL',
									field: 'publicId',
									render: ({ publicId }) => (
										<Typography
											component={props => (
												<a
													href={getUrl(
														`message/${publicId}/send`
													)}
													target="_blank"
													rel="noopener noreferrer"
													{...props}
												/>
											)}
											variant="caption"
										>
											{getUrl(`message/${publicId}/send`)}
										</Typography>
									),
								},
								{
									title: 'Actions',
									sorting: false,
									align: 'center',
									render: message => (
										<ActionMenu
											message={message}
											onEdited={editedMessage =>
												setMessages(messages =>
													messages.map(message =>
														message.id ===
														editedMessage.id
															? editedMessage
															: message
													)
												)
											}
											onDeleted={deletedMessage =>
												setMessages(messages =>
													messages.filter(
														message =>
															message.id !==
															deletedMessage.id
													)
												)
											}
										/>
									),
								},
							]}
							data={messages}
						/>
					)}
				</CardContent>
			</Card>
		</Page>
	);
};

export default Profile;
