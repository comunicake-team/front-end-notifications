import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const useApi = () => {
	const { getAccessTokenSilently } = useAuth0();

	async function sendMessage(userId) {
		const token = await getAccessTokenSilently();

		return axios.post(
			`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/${userId}/send-text`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}

	return { sendMessage };
};

export default useApi;
