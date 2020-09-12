import React from 'react';

const SupportEmail = props => {
	const supportEmail = 'comunicake.cake@gmail.com';
	return (
		<a href={`mailto:${supportEmail}`} {...props}>
			{supportEmail}
		</a>
	);
};

export default SupportEmail;
