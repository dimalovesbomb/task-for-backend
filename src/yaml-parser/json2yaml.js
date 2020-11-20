// import { jsObjectToJSON } from '../service/formate-object';

let YAML = require('json2yaml')
    , ymlText
    ;

export function downloadYaml(object) {
    // const formatedJSON = jsObjectToJSON(object);
    const element = document.createElement('a');
    ymlText = YAML.stringify(object);
    const blob = new Blob([ymlText], {type: 'text/yaml'});

    const fileUrl = URL.createObjectURL(blob);

    element.setAttribute('href', fileUrl);
    element.setAttribute('download', `${object.operationType}.yml`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

