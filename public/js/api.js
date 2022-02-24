'USE STRICT';

const APIS = (function api() {
    const BASE_URL = 'https://tasty.p.rapidapi.com';
    const CONFIG = {
        method: "GET",
        headers: {
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "382a310bcamsh9847265c8d625c6p16f99djsn1e772e742aa2"
        }
    }

    return {
        getFeeds: () => { return fetch(`${BASE_URL}/feeds/list?size=10&timezone=%2B0700&vegetarian=false&from=0`, CONFIG).then(response => response.json()); },
    }
})();