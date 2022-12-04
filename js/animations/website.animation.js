const fillWebsiteTemplate = (template, data) => {
    template.querySelector('.title').textContent = data['Name']
    template.querySelector('#description').append(document.createTextNode(data['Description']))
}



export {
    fillWebsiteTemplate as fillWebsiteTemplate
}
