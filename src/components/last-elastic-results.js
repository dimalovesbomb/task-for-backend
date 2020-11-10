import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

export const LastElasticResults = props => {
    const { info, components, paths } = props.lastElasticResults;

    useEffect( () => {
        props.requestLastElasticResults();
    }, []);
    
    console.log(info); // if dynamic: info === undefined; if hardcoded: info === {} then info
    return (
            <div>
                <Typography component="h3">HARD CODED WORKS</Typography>
                <Typography component="h4">{info.title}DYNAMIC DOESNT</Typography>
            </div>
    )
}