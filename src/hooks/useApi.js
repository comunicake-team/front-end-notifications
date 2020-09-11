import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useSnackbar } from 'notistack';

const useApi = () => {
	const { getAccessTokenSilently } = useAuth0();
	const { enqueueSnackbar } = useSnackbar();

	const getUrl = endpoint =>
		`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/${endpoint}`;

	const makeRequest = async (method, endpoint, body) => {
		const token = await getAccessTokenSilently();

		const config = { headers: { Authorization: `Bearer ${token}` } };
		const url = getUrl(endpoint);
		const restArgs =
			method === 'get' || method === 'delete' ? [config] : [body, config];

		return axios[method](url, ...restArgs)
			.then(response => response.data)
			.catch(() => {
				enqueueSnackbar('Server Error', { variant: 'error' });
				throw new Error('Server Error');
			});
	};

	// prettier-ignore
	return {
		changePublicId: messageId => makeRequest('put', `message/${messageId}/change-publicId`),
		createMessage: message => makeRequest('post', 'message', message),
		deleteMessage: messageId => makeRequest('delete', `message/${messageId}`),
		editMessage: (messageId, message) => makeRequest('put', `message/${messageId}`, message),
		getMessages: () => makeRequest('get', 'message'),
		getUrl,
		getUser: () => makeRequest('get', 'user'),
		sendMessage: messageId => makeRequest('get', `message/${messageId}/send`),
	};
};

export default useApi;
