import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';


const styles = theme => ({
	paper: {
		margin: 'auto',
		overflow: 'hidden',
		[theme.breakpoints.up('sm')]: {
			minWidth: 700,
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: 936,
		},
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
	},
})

const tabs = [];

/** @dev main page - default home page */
function AccidentMainContent({ classes }) {
	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
				<Grid
					container
					spacing={16}
					className={classes.contentWrapper}
					wrap
					alignItems="center"
					justify="center"
				>
					<Grid lg={6} xs={12} item align="center">
						
					</Grid>
					<Grid lg={6} xs={12} item>
						<Typography component="h2" variant="display1" color="textSecondary" align="center">
							Build an accident policy
						</Typography>						
					</Grid>
					<Grid>
					{/* if/else if there are items to list or fresh start... */}
					<Button variant="contained" 
                                color="primary"
						>Create Policy</Button>
					</Grid>

				</Grid>
			</Paper>
		</div>
	)
}

AccidentMainContent.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccidentMainContent)
