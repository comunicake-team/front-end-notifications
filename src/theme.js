import { createMuiTheme } from '@material-ui/core';
import { pink, blue } from '@material-ui/core/colors';

let theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: pink,
	},
});

export default theme;
