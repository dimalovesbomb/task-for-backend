import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { formateDatetimeStamp } from '../service/formate-datetime';
import { formateJSON } from '../service/formate-json';

const useStyles = makeStyles({
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30
    },
    json: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50vw'
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
});

export const Details = props => {
    const { operationRequest, operationResult, operationTimestamp, operationType} = props.item;
    const classes = useStyles();

    return (
        <div className={classes.details}>
            <span className={classes.string}>
                <span className={classes.bold}>Operation type: </span>{operationType}
            </span>
            <span className={classes.string}>
                    <span className={classes.bold}>Operation time: </span>{formateDatetimeStamp(operationTimestamp)}
            </span>
            <div className={classes.json}>
                <div>
                    <span className={classes.bold}>Operation request: </span>
                    <pre className={classes.code}>{formateJSON(operationRequest)}</pre>
                </div>
                <div className={classes.string}>
                    <span className={classes.bold}>Operation result: </span>
                    <pre className={classes.code}>{formateJSON(operationResult)}</pre>
                </div>
            </div>
            <Button className={classes.button}
                    onClick={props.history.goBack}
                    variant="outlined"
                    color="secondary"
                    endIcon={<CloseIcon />}>Close</Button>
        </div>
    )
}