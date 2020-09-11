import React from 'react';

const SupportEmail = props => {
	const supportEmail = 'suckOnMyButt@hotmail.com';
	return (
		<a href={`mailto:${supportEmail}`} {...props}>
			{supportEmail}
		</a>
	);
};

export default SupportEmail;
