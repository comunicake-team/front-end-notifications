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
import { Send, FileCopy, DeleteForever, Add } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import useApi from '../hooks/useApi';
import Table from '../components/Table';
import MessageForm from '../components/MessageForm';

const Profile = () => {
	const { id } = useParams();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [deletingMessage, setDeletingMessage] = useState(false);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [messages, setMessages] = useState([]);
	const { sendMessage, createMessage, getMessages, deleteMessage } = useApi();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		setLoadingMessages(true);
		getMessages().then(data => {
			setMessages(data);
			setLoadingMessages(false);
		});
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
							isLoading={loadingMessages || deletingMessage}
							columns={[
								{
									title: 'Phone Number',
									field: 'phoneNumber',
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
									icon: Send,
									tooltip: 'Hit Endpoint',
									onClick: (_, { id }) => sendMessage(id),
								},
								{
									icon: FileCopy,
									tooltip: 'Copy Url',
									onClick: () => alert('url copied'),
								},
								{
									icon: DeleteForever,
									tooltip: 'Delete',
									onClick: (_, { id }) => {
										setDeletingMessage(true);

										deleteMessage(id).then(() => {
											setMessages(messages =>
												messages.filter(
													message => message.id !== id
												)
											);
											setDeletingMessage(false);
											enqueueSnackbar('Message Deleted', {
												variant: 'success',
											});
										});
									},
								},
							]}
						/>

						<Button
							startIcon={<Add />}
							display="block"
							variant="contained"
							color="primary"
							onClick={() => setDialogOpen(true)}
						>
							Add New Message
						</Button>
					</Grid>
				</CardContent>
			</Card>
			<MessageForm
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onSubmit={async message => {
					await createMessage(message).then(message =>
						setMessages(messsages => [message, ...messages])
					);
					enqueueSnackbar('Message Created!', { variant: 'success' });
				}}
			/>
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
