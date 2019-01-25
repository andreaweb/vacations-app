import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	overrides: {
		MuiChip:{
			label: {
				whiteSpace: 'normal',
				fontSize: '16px',
				padding: '12px'
			},
			clickable: {
				maxWidth: '100%',
				whiteSpace: 'normal',
				height: 'auto',
				margin: '10px'
			}
		}
	}
});