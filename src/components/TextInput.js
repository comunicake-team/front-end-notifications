import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import IconWrapper from './IconWrapper';
import useFormHelpers from '../hooks/useFormHelpers';

const TextInput = ({ icon, value, ...props }) => (
	<IconWrapper icon={icon}>
		<TextField
			fullWidth
			inputProps={{
				'aria-label': props.label,
			}}
			value={
				typeof value === 'string' && value.length > 0
					? value.replace(new RegExp('<br />', 'g'), '\n')
					: value
			}
			{...props}
		/>
	</IconWrapper>
);

TextInput.propTypes = {
	icon: PropTypes.element,
	label: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'email', 'number']),
};

const LinkedTextInput = props => {
	const { value, ...helpers } = useFormHelpers(props, {
		getValue: event =>
			props.type === 'number' && event.target.value
				? parseFloat(event.target.value)
				: event.target.value,
	});

	return <TextInput value={value || ''} {...helpers} />;
};

LinkedTextInput.propTypes = {
	name: PropTypes.string.isRequired,
};

export { TextInput, LinkedTextInput };
