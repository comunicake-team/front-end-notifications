import React from 'react';
import { Typography } from '@material-ui/core';

import {
	InputFormatter,
	LinkedInputFormatter,
	TextFormatter,
} from './Formatter';

const baseProps = {
	format: '(###) ###-####',
};

const baseInputProps = {
	...baseProps,
	type: 'tel',
	inputProps: {
		inputMode: 'tel',
	},
};

const PhoneNumber = props => (
	<TextFormatter
		renderText={phoneNumber => (
			<Typography>
				<a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
			</Typography>
		)}
		{...baseProps}
		{...props}
	/>
);

const PhoneNumberInput = props => (
	<InputFormatter {...baseInputProps} {...props} />
);

const LinkedPhoneNumberInput = props => (
	<LinkedInputFormatter
		getValue={value => value.value}
		{...baseInputProps}
		{...props}
	/>
);

export { PhoneNumber, PhoneNumberInput, LinkedPhoneNumberInput };
