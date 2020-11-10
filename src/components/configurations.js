import { Divider, Table, TableHead, TableRow, TableCell, Typography, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TimerOffTwoTone } from '@material-ui/icons';
import NotInterestedTwoToneIcon from '@material-ui/icons/NotInterestedTwoTone';
import React, { useEffect } from 'react'; 
import formateDatetime from '../service/formate-datetime';

const useStyles = makeStyles({
    li: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        position: 'relative',
        width: '60vw',
        marginBottom: '20px'
    },
    current: {

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
    alert: {
        backgroundColor: 'red'
    },
    divider: {
        marginTop: '5px'
    }
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

        if (state === '') {
            return null;
        }
    }

    return (
        <ul>
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
                                <span className={classes.bold}>Last consul query time: </span>{formateDatetime(item.lastConsulQueryTime)}
                            </span>
                            <Divider className={classes.divider} />
                        </li>
                    )
                })
            }
        </ul>
    )
}

{/* <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableCellShort}>Current value</TableCell>
                    <TableCell className={classes.tableCellShort}>Default value</TableCell>
                    <TableCell className={classes.tableCellLong}>Description</TableCell>
                    <TableCell className={classes.tableCellLong}>Last consul query time</TableCell>
                    <TableCell className={classes.tableCellLong}>Parameter name</TableCell>
                    <TableCell className={classes.tableCellShort}>State</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    configurations.map( (section, id) => {
                        return (
                            <TableRow key={id}>
                                <TableCell className={classes.tableCellShort}>{section.currentValue}</TableCell>
                                <TableCell className={classes.tableCellShort}>{section.defaultValue}</TableCell>
                                <TableCell className={classes.tableCellLong}>{section.description}</TableCell>
                                <TableCell className={classes.tableCellLong}>{formateDatetime(section.lastConsulQueryTime)}</TableCell>
                                <TableCell className={classes.tableCellLong}>{section.parameterName}</TableCell>
                                <TableCell className={classes.tableCellShort}>{section.state}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
            <Divider></Divider>
        </Table> */}

