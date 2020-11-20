export const formateJSON = (string) => {
    const parsed = JSON.parse(string);
    return JSON.stringify(parsed, null, ' ')
};

export const jsObjectToJSON = (object) => {
    return JSON.stringify(object, null, ' ');
};