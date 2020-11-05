import { Divider, Table, TableHead, TableRow, TableCell, Typography, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableCellShort: {
        maxWidth: 30,
        overflow: 'auto'
    },
    tableCellLong: {
        maxWidth: 70,
        overflow: 'auto'
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

    return (
        <Table className={classes.table}>
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
                                <TableCell className={classes.tableCellLong}>{section.lastConsulQueryTime}</TableCell>
                                <TableCell className={classes.tableCellLong}>{section.parameterName}</TableCell>
                                <TableCell className={classes.tableCellShort}>{section.state}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
            <Divider></Divider>
        </Table>
    )
}

