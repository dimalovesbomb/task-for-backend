const ADD_MENU_ITEMS = 'ADD_MENU_ITEMS';

export function requestMenuItems() {
    return async (dispatch) => {
        // const URL = 'http://78.155.197.183:9999/epz/analytics-aggregator/api/schedule';
        const URL = 'src/actions/array.json';
        return await fetch(URL)
            .then(res => res.json())
            .then(payload => dispatch(addMenuItems(payload)))
            .catch(error => console.error(error))
    }
}

function addMenuItems(payload) {
    return {
        type: ADD_MENU_ITEMS,
        payload
    }
}