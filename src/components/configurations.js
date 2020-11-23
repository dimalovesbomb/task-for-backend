import { Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TimerOffTwoTone } from '@material-ui/icons';
import GetAppIcon from '@material-ui/icons/GetApp';
import NotInterestedTwoToneIcon from '@material-ui/icons/NotInterestedTwoTone';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React, { useEffect } from 'react'; 
import { formateDatetimeUTC } from '../service/formate-datetime';
import { downloadYaml } from '../yaml-parser/json2yaml';

const useStyles = makeStyles({
    ul: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    li: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '60vw',
        marginBottom: '20px'
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px, 0'
    },
    bold: {
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 'medium'
    },
    divider: {
        marginTop: '5px'
    },
    button: {
        height: 30,
        margin: 'auto 0',
        marginBottom: 20
    },
});
  

export const Configuration = props => {
    const { configurations } = props;

    useEffect(() => {
        if (configurations.length !== 0) {
            return;
        }

        props.requestConfigurations();
    }, [])

    const classes = useStyles();

    const itemStateIcon = state => {
        if (state === 'timed out') {
            return <TimerOffTwoTone color="disabled" />;
        }

        if (state === 'not found') {
            return <NotInterestedTwoToneIcon color="error" />;
        }

        if (state === 'loaded') {
            return <CheckCircleOutlineIcon color="primary" />
        }

        if (state === '') {
            return null;
        }
    }

    return (
        <ul className={classes.ul}>
            <Button className={classes.button}
                onClick={ () => downloadYaml(configurations) }
                variant="outlined"
                color="primary"
                endIcon={<GetAppIcon />}>Download .yml file</Button>
            {
                configurations.map( item => {
                    return (
                        <li key={item.parameterName} className={classes.li}>
                            <div className={classes.top}>
                                <span className={classes.state}>{itemStateIcon(item.state)}</span>
                                <span className={classes.parameterName, classes.bold}>{item.parameterName}</span>
                            </div>
                            
                            <span>
                                <span className={classes.bold}>Current: </span>{item.currentValue}
                            </span>
                            <span>
                                <span className={classes.bold}>Default: </span>{item.defaultValue}
                            </span>
                            <span>
                                <span className={classes.bold}>Description: </span>{item.description}
                            </span>
                            <span>
                                <span className={classes.bold}>Last consul query time: </span>{formateDatetimeUTC(item.lastConsulQueryTime)}
                            </span>
                            <Divider className={classes.divider} />
                        </li>
                    )
                })
            }
        </ul>
    )
}