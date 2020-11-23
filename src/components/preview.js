import React from 'react';
import { Link }  from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import { OpenInBrowser } from '@material-ui/icons';
import { formateDatetimeStamp } from '../service/formate-datetime';

const useStyles = makeStyles( theme => ({
    li: {
        display: 'flex',
        flexDirection: 'column',
        width: '60vw', 
        marginBottom: '20px'
    },
    string: {
        marginBottom: '10px'
    },
    divider: {
        marginTop: '15px'
    },
    button: {
        height: 30,
        margin: 'auto 0',
        width: '100%'
    },
    link: {
        width: '100%'
    }
}));

export const Preview = props => {
    const classes = useStyles();

    return (
        <ul>
        {
            props.items.map( item => {

                return (
                    <li key={item.operationTimestamp} className={classes.li}>
                        <span className={classes.string}>
                                <span className={classes.bold}>Operation type: </span>{item.operationType}
                        </span>
                        <span className={classes.string}>
                                <span className={classes.bold}>Operation time: </span>{formateDatetimeStamp(item.operationTimestamp)}
                        </span>
                        <Link className={classes.link} to={`lastAggregateElasticResult/details/${item.operationTimestamp}`}>
                            <Button className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    endIcon={<OpenInBrowser />}>Open details</Button>
                        </Link>
                        <Divider className={classes.divider} />
                    </li>
                )
            })
        }
        </ul>
    )
}