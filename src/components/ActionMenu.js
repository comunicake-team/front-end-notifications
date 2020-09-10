import React, { useState } from 'react';
import {
	Create,
	DeleteForever,
	FileCopy,
	MoreVert,
	Fingerprint,
} from '@material-ui/icons';
import {
	CircularProgress,
	IconButton,
	ListItemIcon,
	makeStyles,
	Menu,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useDialogContext } from '../components/GlobalDialog';
import MessageForm from '../components/MessageForm';
import useApi from '../hooks/useApi';

const useStyles = makeStyles(theme => ({
	icon: {
		minWidth: 40,
	},
	menuItem: {
		minWidth: 150,
		padding: theme.spacing(1, 2),
	},
}));

const ActionMenu = ({
	message: { id, publicId, phoneNumber, defaultText },
	onEdited,
	onDeleted,
}) => {
	const [loading, setLoading] = useState(false);
	const { changePublicId, deleteMessage, editMessage, getUrl } = useApi();
	const { enqueueSnackbar } = useSnackbar();
	const { showDialog } = useDialogContext();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const openMenu = event => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = event => {
		event.stopPropagation();
		setAnchorEl(null);
	};

	const decorateRequest = (request, successMessage) => async (...args) => {
		setLoading(true);
		await request(...args).finally(() => setLoading(false));
		enqueueSnackbar(successMessage);
	};

	if (loading) {
		return <CircularProgress size={30} />;
	}

	return (
		<>
			<IconButton onClick={openMenu}>
				<MoreVert />
			</IconButton>
			<Menu open={open} onClose={closeMenu} anchorEl={anchorEl}>
				{[
					{
						icon: <FileCopy />,
						label: 'Copy URL',
						onClick: () => {
							window.navigator.clipboard
								.writeText(getUrl(`message/${id}/send`))
								.then(() =>
									enqueueSnackbar('URL Copied to Clipboard!')
								);
						},
					},
					{
						icon: <Create />,
						label: 'Edit',
						onClick: () => {
							showDialog(MessageForm, {
								title: 'Edit Message',
								initialValues: {
									phoneNumber,
									defaultText,
								},
								onSubmit: decorateRequest(
									editedMessage =>
										editMessage(id, editedMessage).then(
											onEdited
										),
									'Message Edited!'
								),
							});
						},
					},
					{
						icon: <Fingerprint />,
						label: 'Change ID',
						onClick: decorateRequest(
							() => changePublicId(id).then(onEdited),
							'ID Changed!'
						),
					},
					{
						icon: <DeleteForever />,
						label: 'Delete',
						onClick: decorateRequest(
							() => deleteMessage(id).then(onDeleted),
							'Message Deleted!'
						),
					},
				].map(({ icon, label, onClick }) => (
					<MenuItem
						onClick={event => {
							onClick(event);
							closeMenu(event);
						}}
						className={classes.menuItem}
						key={label}
					>
						<ListItemIcon className={classes.icon}>
							{icon}
						</ListItemIcon>
						<Typography>{label}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default ActionMenu;
