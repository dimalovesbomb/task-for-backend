import { combineReducers } from "redux";

const menuItems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MENU_ITEMS': 
            return [...action.payload];

        default: 
            return state;
    }
}

const reducer = combineReducers({menu: menuItems});
// const reducer = menuItems;

export default reducer;
