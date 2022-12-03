import * as http from './http.js'
import * as select from './selected.js'

function loadAnimations() {
    http.GET(http.All_ANIMATIONS, createAnimationElements)
}

function createAnimationElements(json) {
    let animationsContainer = document.getElementById('animations-container')
    let template = document.querySelector('#selectable-animation-template')

    for (let index in json) {
        let animation = json[index]
        let clone = template.content.cloneNode(true)

        let fSelect = select.makeSelectFunction(animation)
        clone.firstElementChild.addEventListener('click', fSelect)

        let parent = clone.querySelector('.image')
        http.GETImage((imgURL) => {
            appendImage(parent, imgURL)
        }, animation['Key'])

        clone.querySelector('.name').textContent = animation['Name']

        animationsContainer.appendChild(clone)
    }
}

function appendImage(parent, imgURL) {
    let img = document.createElement('img')
    img.src = imgURL
    parent.appendChild(img)
}


loadAnimations()