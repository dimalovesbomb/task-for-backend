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

const lastElasticResults = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_LAST_ELASTIC_RESULTS':
            return action.payload;

        default:
            return state;
    }
}

const reducer = combineReducers({
    menu: menuItems,
    configuration,
    lastElasticResults
});
// const reducer = menuItems;
export default reducer;
