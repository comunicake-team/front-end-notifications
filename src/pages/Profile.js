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
import { Create, Send, FileCopy, DeleteForever, Add } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import { PhoneNumber } from '../components/PhoneNumber';
import { useDialogContext } from '../components/GlobalDialog';
import MessageForm from '../components/MessageForm';
import Table from '../components/Table';

import useApi from '../hooks/useApi';

const Profile = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const {
		sendMessage,
		createMessage,
		getMessages,
		deleteMessage,
		editMessage,
	} = useApi();
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
					<Grid container direction="column" justify="center">
						<Box margin={8}>
							<Typography variant="h4" align="center">
								Welcome {id}
							</Typography>
						</Box>

						<Typography variant="h6">Messages</Typography>
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
									field: 'id',
								},
								{
									title: 'Default Text',
									field: 'defaultText',
								},
							]}
							data={messages}
							actions={[
								{
									icon: () => <Send fontSize="small" />,
									tooltip: 'Hit Endpoint',
									onClick: (_, { id }) => sendMessage(id),
								},
								{
									icon: () => <FileCopy fontSize="small" />,
									tooltip: 'Copy Url',
									onClick: () => alert('url copied'),
								},
								{
									icon: () => <Create fontSize="small" />,
									tooltip: 'Edit',
									onClick: (
										_,
										{ id, phoneNumber, defaultText }
									) =>
										showDialog(MessageForm, {
											title: 'Edit Message',
											initialValues: {
												phoneNumber,
												defaultText,
											},
											onSubmit: async message => {
												setLoading(true);
												await editMessage(id, message)
													.then(editedMessage => {
														setMessages(messages =>
															messages.map(
																message =>
																	message.id ===
																	editedMessage.id
																		? editedMessage
																		: message
															)
														);
													})
													.finally(() =>
														setLoading(false)
													);
												enqueueSnackbar(
													'Message Edited!',
													{
														variant: 'success',
													}
												);
											},
										}),
								},
								{
									icon: () => (
										<DeleteForever fontSize="small" />
									),
									tooltip: 'Delete',
									onClick: (_, { id }) => {
										setLoading(true);

										deleteMessage(id)
											.then(() => {
												setMessages(messages =>
													messages.filter(
														message =>
															message.id !== id
													)
												);
												enqueueSnackbar(
													'Message Deleted',
													{
														variant: 'success',
													}
												);
											})
											.finally(() => setLoading(false));
									},
								},
							]}
						/>

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
										enqueueSnackbar('Message Created!', {
											variant: 'success',
										});
									},
								})
							}
						>
							Add New Message
						</Button>
					</Grid>
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
// </Button>
// <Button
// 	onClick={() =>
// 		Axios.post(
// 			'https://notifications-29c72.firebaseio.com/users.json',
// 			{ email: 'dumitrumitaruberceanu@gmail.com' }
// 		)
// 	}
// >
// 	SEND SOME DATA
// </Button>

export default Profile;
