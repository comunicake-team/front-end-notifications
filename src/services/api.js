import axios from 'axios';

export { sendMessage };

function sendMessage(userId) {
	return axios.post(
		`${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_DOMAIN}/${userId}/send-text`
	);
}
