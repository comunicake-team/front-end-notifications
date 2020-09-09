import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { TextField } from '@material-ui/core';

import IconWrapper from './IconWrapper';
import useFormHelpers from '../hooks/useFormHelpers';

const InputFormatter = props => (
	<IconWrapper icon={props.icon}>
		<NumberFormat
			customInput={TextField}
			fullWidth
			inputProps={{
				inputMode: 'decimal',
				...props.inputProps,
				'aria-label': props.label,
			}}
			{...props}
		/>
	</IconWrapper>
);

InputFormatter.propTypes = {
	icon: PropTypes.element,
	label: PropTypes.string.isRequired,
};

const LinkedInputFormatter = ({ getValue, ...props }) => {
	const { onChange, ...helpers } = useFormHelpers(props, {
		getValue,
	});

	return <InputFormatter onValueChange={onChange} {...helpers} />;
};

LinkedInputFormatter.propTypes = {
	getValue: PropTypes.func,
	name: PropTypes.string.isRequired,
};

LinkedInputFormatter.defaultProps = {
	getValue: values => values.floatValue,
};

const TextFormatter = props => <NumberFormat displayType="text" {...props} />;

TextFormatter.propTypes = {
	renderText: PropTypes.func,
};

TextFormatter.defaultProps = {
	renderText: value => value,
};

export { InputFormatter, LinkedInputFormatter, TextFormatter };
