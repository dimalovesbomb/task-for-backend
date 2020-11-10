const beautify = require('json-beautify');

export const formateJSON = (string) => {
    const parsed = JSON.parse(string);
    return JSON.stringify(parsed, null, ' ')
} 