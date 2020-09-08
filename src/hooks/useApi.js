import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = () => {
	const { getAccessTokenSilently } = useAuth0();

	const makeRequest = async (method, endpoint) => {
		const token = await getAccessTokenSilently();

		return axios[method](
			`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/${endpoint}`,
			{},
			{ headers: { Authorization: `Bearer ${token}` } }
		);
	};

	return {
		sendMessage: userId => makeRequest('post', `${userId}/send-message`),
	};
};

export default useApi;
