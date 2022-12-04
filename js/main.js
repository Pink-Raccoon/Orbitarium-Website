import * as http from './http.js'
import * as select from './selected.js'

function loadAnimations() {
    let args = {
        URL: http.All_ANIMATIONS,
        success: createAnimationElements
    }
    http.GET(args)
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
        let args = {
            animationKey: animation['Key'],
            success: (imgURL) => {
                appendImage(parent, imgURL)
            } 
        }
        http.GETImage(args)

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