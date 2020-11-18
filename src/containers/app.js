import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useStyles } from './styles';
import { requestMenuItems, requestConfigurations, requestAggregateLastElasticResults, requestLastWidgetElasticResults } from '../actions';
import { Configuration } from '../components/configurations';
import { LastAggregateElasticResults } from '../components/last-aggregate-elastic-results';
import { LastWidgetElasticResults } from '../components/last-widget-elastic-results';
import { Home } from '../components/home';


let App = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Menu
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/configuration">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </ListItem>
          </Link>
          <Link to="/lastAggregateElasticResult">
            <ListItem button>
              <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Aggregate results" />
            </ListItem>
          </Link>
          <Link to="/lastWidgetElasticResult">
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Widget results" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Grid container spacing={3}>
              <Route exact path="/">
                <Grid item xs={12} md={8} lg={12}>
                  <Typography component="h2" className={classes.pageHeader}>
                    Home
                  </Typography>
                  <Paper className={fixedHeightPaper}>
                    <Home />
                  </Paper>
                </Grid>
              </Route>
              <Route path="/configuration">
                <Grid item xs={12} md={8} lg={12}>
                <Typography component="h2" className={classes.pageHeader}>
                  Configuration
                </Typography>
                  <Paper className={fixedHeightPaper}>
                    <Configuration 
                      requestConfigurations={props.requestConfigurations}
                      configurations={props.configuration}
                    />
                  </Paper>
                </Grid>
              </Route>
              <Route path="/lastAggregateElasticResult">
                <Grid item xs={12} md={8} lg={12}>
                <Typography component="h2" className={classes.pageHeader}>
                  Last Aggregate Elastic Results
                </Typography>
                  <Paper className={fixedHeightPaper}>
                    <LastAggregateElasticResults
                      requestAggregateLastElasticResults={props.requestAggregateLastElasticResults}
                      lastAggregateElasticResults={props.lastAggregateElasticResults}
                    />
                  </Paper>
                </Grid>
              </Route>
              <Route path="/lastWidgetElasticResult">
                <Grid item xs={12} md={8} lg={12}>
                <Typography component="h2" className={classes.pageHeader}>
                  Last Widget Elastic Results
                </Typography>
                  <Paper className={fixedHeightPaper}>
                    <LastWidgetElasticResults
                      requestLastWidgetElasticResults={props.requestLastWidgetElasticResults}
                      lastWidgetElasticResults={props.lastWidgetElasticResults}
                    />
                  </Paper>
                </Grid>
              </Route>
            </Grid>
          </Switch>
        </Container>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    configuration: state.configuration,
    lastAggregateElasticResults: state.lastAggregateElasticResults,
    lastWidgetElasticResults: state.lastWidgetElasticResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestMenuItems: () => dispatch(requestMenuItems()),
    requestConfigurations: () => dispatch(requestConfigurations()),
    requestAggregateLastElasticResults: (page, pageSize) => dispatch(requestAggregateLastElasticResults(page, pageSize)),
    requestLastWidgetElasticResults: (page, pageSize) => dispatch(requestLastWidgetElasticResults(page, pageSize))
    // removePlace: id => dispatch(removePlace(id)),
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
