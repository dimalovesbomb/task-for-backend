import { Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import React, { useEffect, useState } from 'react';
import  { Link } from 'react-router-dom';

const useStyles = makeStyles( theme => ({
    home: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    randomPic: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        top: 10,
        left: 10,
        width: 400,
        height: 400
    },
    'randomPic img': {
        width: '25%',
        height: '25%'
    },
    randomLink: {
        fontSize: 12
    }
}))

export const Home = props => {
    const [meme, setMeme] = useState({});

    const classes = useStyles();

    useEffect( () => {
        fetch('https://meme-api.herokuapp.com/gimme')
            .then(res => res.json())
            .then(res => setMeme(res))
            .catch(error => console.error(error));
    }, []);

    console.log(meme);

    return (
        <div className={classes.home}>
            <div className={classes.randomPic}>
                <img src={meme.url} alt={meme.title} />
                <a className={classes.randomLink} color="secondary" href={meme.postLink} target="_blank">To this post</a>
            </div>

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