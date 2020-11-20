let YAML = require('json2yaml')
    , ymlText
    ;

export function downloadYaml(json) {
    const element = document.createElement('a');
    ymlText = YAML.stringify(json);
    const blob = new Blob([ymlText], {type: 'text/yaml'});

    const fileUrl = URL.createObjectURL(blob);

    element.setAttribute('href', fileUrl);
    element.setAttribute('download', 'yaml.yml');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

