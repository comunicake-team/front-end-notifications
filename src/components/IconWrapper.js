import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	// Pushing this down to horizontally align with the label, including for multiline TextInputs.
	iconContainer: {
		marginTop: ({ iconTopMargin }) => iconTopMargin,
	},
}));

const IconWrapper = ({ children, icon, iconTopMargin }) => {
	const classes = useStyles({ iconTopMargin });

	return icon ? (
		<Grid container spacing={1} alignItems="flex-start">
			<Grid item className={classes.iconContainer}>
				{icon}
			</Grid>
			<Grid item xs>
				{children}
			</Grid>
		</Grid>
	) : (
		children
	);
};

IconWrapper.propTypes = {
	icon: PropTypes.element,
	iconTopMargin: PropTypes.number,
};

IconWrapper.defaultProps = {
	iconTopMargin: 20,
};

export default IconWrapper;
