import { Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import React from 'react';
import  { Link } from 'react-router-dom';

const useStyles = makeStyles( theme => ({
    home: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
}))

export const Home = props => {
    const classes = useStyles();

    return (
        <div className={classes.home}>
            <List>
                <Divider />
                <Link to="/configuration">
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Configuration" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/lastAggregateElasticResult">
                    <ListItem button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Last Aggregate Elastic Result" />
                    </ListItem>
                </Link>
                <Divider />
                <Link to="/lastWidgetElasticResult">
                    <ListItem button>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Last Widget Elastic Result" />
                    </ListItem>
                </Link>
                <Divider />
            </List>
        </div>
    );
};