import { Divider, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import history from 'history/browser';
import { useLocation } from 'react-router-dom';
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
    pagination: {
        margin: 'auto 0'
    },
    form__el: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 600
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

export const LastAggregateElasticResults = props => {
    const [page, setPage] = useState(1); // default value
    const [pageSize, setPageSize] = useState(10); // default value
    const [totalRecords, setTotalRecords] = useState(0);
    const [pagesCount, setPagesCount] = useState(1);

    useEffect( () => {
        fetch('http://78.155.197.183:9999/epz/analytics-aggregator/api/lastAggregateElasticResults/count')
            .then( res => res.json())
            .then( res => {
                setTotalRecords(res);
                setPagesCount(Math.ceil(res / pageSize));
            });
        setInitParams();
        onFormSubmit(null);
    }, []);
    

    const classes = useStyles();
    const location = useLocation();

    const setInitParams = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageNumber = parseInt(searchParams.get('pageQ'));
        const pageSizeNumber = parseInt(searchParams.get('pageSizeQ'));
        // if no query in $location - keep default values of $page and $pageSize
        if (!isNaN(pageNumber) && !isNaN(pageSizeNumber)) {
            setPage(pageNumber);
            setPageSize(pageSizeNumber);
        }
    }

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

    const selectPage = (event, value) => {
        setPage(value);
        onFormSubmit(null);
        updateUrl(value, pageSize);
    };
    const selectPageSize = event => {
        const newPageSize = event.target.value;
        setPageSize(newPageSize);

        const newPagesCount = Math.ceil(totalRecords / newPageSize);
        setPagesCount(newPagesCount);

        const newPage = Math.min(page, newPagesCount);
        setPage(newPage);

        updateUrl(newPage, newPageSize);
    };

    const updateUrl = (page, pageSize) => {
        history.push({
            pathname: '/lastAggregateElasticResult',
            search: `?pageQ=${page}&pageSizeQ=${pageSize}`,
            state: { page, pageSize }
        });
    };

    const onFormSubmit = event => {
        if (event) {
            event.preventDefault();
        }

        if (page && pageSize) {
            props.requestAggregateLastElasticResults(page, pageSize);
        }
    };

    return (
            <>
            <form className={classes.form__el} onSubmit={onFormSubmit}>
                <Pagination className={classes.pagination}
                            count={pagesCount}
                            siblingCount={0}
                            page={page}
                            onChange={selectPage}
                            variant="outlined"
                            shape="rounded" />
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
                        endIcon={<RefreshIcon />}>Refresh</Button>
            </form>
            <Divider className={classes.divider} />
            
            <ul>
                {
                    props.lastAggregateElasticResults.map( item => {

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