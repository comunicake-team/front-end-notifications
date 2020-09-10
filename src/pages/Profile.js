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
import { Add } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { PhoneNumber } from '../components/PhoneNumber';
import { useDialogContext } from '../components/GlobalDialog';
import MessageForm from '../components/MessageForm';
import ActionMenu from '../components/ActionMenu';
import Table from '../components/Table';

import useApi from '../hooks/useApi';

const Profile = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const { createMessage, getMessages } = useApi();
	const { enqueueSnackbar } = useSnackbar();
	const { showDialog } = useDialogContext();

	useEffect(() => {
		setLoading(true);
		getMessages()
			.then(setMessages)
			.finally(() => setLoading(false));
	}, []);

	return (
		<Box margin="auto" marginTop={8} width="75%">
			<Card>
				<CardContent>
					<Box margin={8}>
						<Typography variant="h4" align="center">
							Welcome {id}
						</Typography>
					</Box>
					<Box m={1}>
						<Grid
							container
							justify="space-between"
							alignItems="center"
						>
							<Typography variant="h6">Messages</Typography>
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
					<Table
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
							},
							{
								title: 'Default Text',
								field: 'defaultText',
							},
							{
								title: 'Actions',
								sorting: false,
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
				</CardContent>
			</Card>
		</Box>
	);
};

// const { logout, user } = useAuth0();
// <Button
// 	variant="contained"
// 	color="primary"
// 	onClick={() =>
// 		logout({ returnTo: window.location.origin })
// 	}
// >
// 	Log Out

export default Profile;
