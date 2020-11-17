import { combineReducers } from "redux";

const menuItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MENU_ITEMS': 
            return [...action.payload];

        default: 
            return state;
    }
}

const configuration = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CONFIGURATIONS':
            return [...action.payload];

        default:
            return state;
    }
}

const lastAggregateElasticResults = (state = [], action) => {
    switch (action.type) {
        case 'ADD_LAST_AGGREGATE_ELASTIC_RESULTS':
            return [...action.payload];

        default:
            return state;
    }
}

const lastWidgetElasticResults = (state = [], action) => {
    switch (action.type) {
        case 'ADD_LAST_WIDGET_ELASTIC_RESULT':
            return [...action.payload];

        default:
            return state;
    }
}

const reducer = combineReducers({
    menu: menuItems,
    configuration,
    lastAggregateElasticResults,
    lastWidgetElasticResults
});
// const reducer = menuItems;
export default reducer;
