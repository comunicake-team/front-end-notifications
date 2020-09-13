import React from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { Grid } from '@material-ui/core';

import useApi from '../hooks/useApi';

const MessageQRCode = () => {
	const { publicId } = useParams();
	const { getUrl } = useApi();

	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			style={{ height: '100vh' }}
		>
			<QRCode value={getUrl(`message/${publicId}/send`)} size={200} />
		</Grid>
	);
};

export default MessageQRCode;
