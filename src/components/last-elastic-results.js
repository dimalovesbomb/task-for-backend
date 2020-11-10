import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
    li: {
        display: 'flex',
        flexDirection: 'column',
        width: '60vw', 
        marginBottom: '20px'
    },
    string: {
        marginBottom: '10px'
    },
    bold: {
        fontWeight: 'bold'
    },
    code: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    divider: {
        marginTop: '5px'
    }
});

export const LastElasticResults = props => {
    const classes = useStyles();

    useEffect( () => {
        props.requestLastElasticResults();
    }, []);
    
    console.log(props.lastElasticResults);
    return (
            <ul>
                {
                    props.lastElasticResults.map( item => {
                        return (
                            <li key={item.operationType} className={classes.li}>
                                <span className={classes.string}>
                                    <span className={classes.bold}>Operation type: </span>{item.operationType}
                                </span>
                                <div className={classes.string}>
                                    <span className={classes.bold}>Operation result: </span>
                                    <code className={classes.code}>{item.operationResult}</code>
                                </div>
                                <Divider />
                            </li>
                        )
                    })
                }
            </ul>
    )
}