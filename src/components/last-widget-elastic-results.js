import { Divider, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { formateJSON } from '../service/formate-json';

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
    bold: {
        fontWeight: 'bold'
    },
    code: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    divider: {
        marginTop: '15px'
    },
    form__el: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 500
    },
    form__item: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    button: {
        height: 30,
        margin: 'auto 0'
    }
}));

export const LastWidgetElasticResults = props => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // default value
    const [totalRecords, setTotalRecords] = useState(0);
    //отвечает за количество страниц при выбранном pageSize
    const [pagesCount, setPagesCount] = useState(1);
    console.log(props);

    useEffect( () => {
        fetch('http://78.155.197.183:9999/epz/analytics-aggregator/api/lastWidgetElasticResults/count')
            .then( res => res.json())
            .then( res => {
                setTotalRecords(res);
                setPagesCount(Math.ceil(res / pageSize));
            });
    }, []);
    

    const classes = useStyles();

    const formateDatetime = timestamp => {
        const formatter = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        return new Date(+timestamp).toLocaleString('ru', formatter);
    }

    const selectPage = event => setPage(event.target.value);
    const selectPageSize = event => {
        const newPageSize = event.target.value;
        setPageSize(newPageSize);

        const newPagesCount = Math.ceil(totalRecords / newPageSize);
        setPagesCount(newPagesCount);
        
        setPage(Math.min(page, newPagesCount))
    };

    const onLastElasticSubmit = event => {
        event.preventDefault();
        if (page && pageSize) {
            props.requestLastWidgetElasticResults(page, pageSize);
        }
    };

    const addMenuItem = (count) => {
        return [...Array(count).keys()].map( i => {
            return <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>;
        });
    }

    return (
            <>
            <form className={classes.form__el} onSubmit={onLastElasticSubmit}>
                <FormControl className={classes.form__item}>
                    <InputLabel id="select-page">Page</InputLabel>
                    <Select labelId="select-page"
                            value={page}
                            onChange={selectPage}>
                                { addMenuItem(pagesCount) }
                    </Select>
                </FormControl>
                <FormControl className={classes.form__item}>
                    <InputLabel id="select-page-size">Page size</InputLabel>
                    <Select labelId="select-page-size"
                            value={pageSize}
                            onChange={selectPageSize}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
                <Button className={classes.button}
                        type="submit"
                        variant="outlined"
                        color="primary"
                        endIcon={<SendIcon />}>Request</Button>
            </form>
            <Divider className={classes.divider} />
            
            <ul>
                {
                    props.lastWidgetElasticResults.map( item => {

                        return (
                            <li key={item.operationTimestamp} className={classes.li}>
                                <span className={classes.string}>
                                    <span className={classes.bold}>Operation type: </span>{item.operationType}
                                </span>
                                <span className={classes.string}>
                                    <span className={classes.bold}>Operation time: </span>{formateDatetime(item.operationTimestamp)}
                                </span>
                                <div>
                                    <span className={classes.bold}>Operation request: </span>
                                    <pre className={classes.code}>{formateJSON(item.operationRequest)}</pre>
                                </div>
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
            </>
    )
}