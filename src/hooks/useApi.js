import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = () => {
	const { getAccessTokenSilently } = useAuth0();

	const makeRequest = async (method, endpoint, body) => {
		const token = await getAccessTokenSilently();

		const config = { headers: { Authorization: `Bearer ${token}` } };
		const url = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/${endpoint}`;
		const restArgs =
			method === 'get' || method === 'delete' ? [config] : [body, config];

		return axios[method](url, ...restArgs).then(response => response.data);
	};

	return {
		deleteMessage: messageId =>
			makeRequest('delete', `message/${messageId}`),
		getMessages: () => makeRequest('get', 'message'),
		createMessage: message => makeRequest('post', 'message', message),
		sendMessage: messageId =>
			makeRequest('post', `message/${messageId}/send`),
	};
};

export default useApi;
