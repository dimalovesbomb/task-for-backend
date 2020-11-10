const ADD_MENU_ITEMS = 'ADD_MENU_ITEMS';
const ADD_CONFIGURATIONS = 'ADD_CONFIGURATIONS';
const ADD_LAST_ELASTIC_RESULTS = 'ADD_LAST_ELASTIC_RESULTS';

export function requestMenuItems() {
    return async (dispatch) => {
        const URL = 'http://78.155.197.183:9999/epz/analytics-aggregator/api/schedule';

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

export function requestConfigurations() {
    return async (dispatch) => {
        const URL = 'http://78.155.197.183:9999/epz/analytics-aggregator/api/configuration';
        // const URL = './src/actions/array.json';

        return await fetch(URL)
            .then(res => res.json())
            .then(payload => dispatch(addConfigurations(payload)))
            .catch(err => console.error(err))
    }
}

function addConfigurations(payload) {
    return {
        type: ADD_CONFIGURATIONS,
        payload
    }
}

export function requestLastElasticResults() {
    return async (dispatch) => {
        const URL = 'http://78.155.197.183:9999/epz/analytics-aggregator/api/lastElasticResults';
        // const URL = './src/actions/array.json';

        return await fetch(URL)
            .then(res => res.json())
            .then(payload => dispatch(addLastElasticResults(payload)))
            .catch(error => console.error(error))
    }
}

function addLastElasticResults(payload) {
    return {
        type: ADD_LAST_ELASTIC_RESULTS,
        payload
    }
}