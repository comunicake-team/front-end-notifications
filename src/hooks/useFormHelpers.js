import { useFormikContext, useField } from 'formik';
import identity from 'lodash.identity';
import startCase from 'lodash.startcase';

const useFormHelpers = (props, { getValue = identity } = {}) => {
	const { isSubmitting } = useFormikContext();
	const [{ name, onBlur, onChange, value }, { touched, error }] = useField(
		props
	);

	const showError = touched && !!error;

	return {
		disabled: isSubmitting,
		error: showError,
		name,
		label: startCase(name),
		onBlur,
		onChange: value =>
			onChange({ target: { name, value: getValue(value) ?? '' } }),
		value,
		...props,
		helperText: showError ? error : props.helperText,
	};
};

export default useFormHelpers;
