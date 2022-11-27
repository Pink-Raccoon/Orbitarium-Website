import * as http from './http.js'

function loadAnimations() {
    console.log('loading all animations')
    http.getAllAnimationsTest(http.All_ANIMATIONS, createAnimationElements, error)
}

function createAnimationElements(json) {
    let animationsContainer = document.getElementById('animations-container')

    for (let index in json) {
        let animation = json[index]

        let child = document.createElement('div')
        child.classList.add('animation')
        
        let text = document.createTextNode(animation['Name'])
        child.appendChild(text)

        animationsContainer.appendChild(child)
    }
}

function error(res) {
    console.log('an error occured with response: ' + res)
}

loadAnimations()