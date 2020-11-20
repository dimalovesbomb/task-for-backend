import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { formateJSON } from '../service/formate-json';

const useStyles = makeStyles({
    json: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50vw'
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
    const classes = useStyles();

    return (
        <>
            <div className={classes.json}>
                <div>
                    <span className={classes.bold}>Operation request: </span>
                    <pre className={classes.code}>{formateJSON(props.operationRequest)}</pre>
                </div>
                <div className={classes.string}>
                    <span className={classes.bold}>Operation result: </span>
                    <pre className={classes.code}>{formateJSON(props.operationResult)}</pre>
                </div>
            </div>
        </>
    )
}