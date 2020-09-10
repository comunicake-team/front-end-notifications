import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { PhoneNumber } from '../components/PhoneNumber';
import { useDialogContext } from '../components/GlobalDialog';
import ActionMenu from '../components/ActionMenu';
import MessageForm from '../components/MessageForm';
import Page from '../components/Page';
import Table from '../components/Table';

import useApi from '../hooks/useApi';

const Profile = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const { getUrl, createMessage, getMessages } = useApi();
	const { enqueueSnackbar } = useSnackbar();
	const { showDialog } = useDialogContext();

	useEffect(() => {
		setLoading(true);
		getMessages()
			.then(setMessages)
			.finally(() => setLoading(false));
	}, []);

	return (
		<Page>
			<Card>
				<CardContent>
					<Box margin={8}>
						<Typography variant="h4" align="center">
							Welcome {id}
						</Typography>
					</Box>
					<Box m={1}>
						<Grid container justify="flex-end" alignItems="center">
							<Button
								startIcon={<Add />}
								display="block"
								variant="contained"
								color="primary"
								onClick={() =>
									showDialog(MessageForm, {
										title: 'Create New Message',
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
							</Button>
						</Grid>
					</Box>
					{!loading && messages.length === 0 ? (
						<Alert severity="info">
							You have no messages. Please create a message to get
							started.
						</Alert>
					) : (
						<Table
							title="Messages"
							isLoading={loading}
							columns={[
								{
									title: 'Phone Number',
									field: 'phoneNumber',
									render: ({ phoneNumber }) => (
										<PhoneNumber value={phoneNumber} />
									),
								},
								{
									title: 'ID',
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
										>
											{publicId}
										</Typography>
									),
								},
								{
									title: 'Default Text',
									field: 'defaultText',
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
