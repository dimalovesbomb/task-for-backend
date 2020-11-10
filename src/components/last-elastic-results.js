import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { formateJSON } from '../service/formate-json';

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
                                    <pre className={classes.code}>{formateJSON(item.operationResult)}</pre>
                                </div>
                                <Divider />
                            </li>
                        )
                    })
                }
            </ul>
    )
}