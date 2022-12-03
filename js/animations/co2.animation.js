const fillCo2Template = (template, data) => {
    template.querySelector('.title').textContent = data['Name']

    template.querySelector('#description').append(document.createTextNode(data['Description']))

    let infoNodes = template.querySelectorAll('.info')
    infoNodes[0].querySelector('.info-content').textContent = data['Information']['SeaLevel']
    infoNodes[1].querySelector('.info-content').textContent = data['Information']['Temp']
    infoNodes[2].querySelector('.info-content').textContent = data['Information']['Year']
}



export {
    fillCo2Template as fillCo2Template
}
