import React from 'react'
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        fontSize: '1.2rem'
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

function NavBar() {
    const classes = useStyles();
    const { authState, authService } = useOktaAuth();

    if (authState.isPending) {
        return <div>Loading...</div>;
    }

    const button = authState.isAuthenticated ?
        <Button color="primary" variant="outlined" className={classes.link} onClick={() => { authService.logout() }}>Logout</Button> :
        <Button color="primary" variant="outlined" className={classes.link} onClick={() => { authService.login() }}>Login</Button>;
    return (
        <div>


            <div>

                <CssBaseline />
                <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Okta Blog
          </Typography>
                        <nav>
                            <Link variant="button" color="textPrimary" to='/' className={classes.link}>
                                Home
            </Link>
                            <Link variant="button" color="textPrimary" to='/protected' className={classes.link}>
                                Protected
            </Link>
                        </nav>
                        {button}
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
}

export default NavBar