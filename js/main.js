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
        let select = makeSelectFunction(animation['Key'])        
        child.addEventListener('click', select)
        
        let text = document.createTextNode(animation['Name'])
        child.appendChild(text)

        animationsContainer.appendChild(child)
    }
}

function makeSelectFunction(animationKey) {
    let key = animationKey

    function select() {
        console.log(key + ' has been selected')
    }

    return select
}

function error(res) {
    console.log('an error occured with response: ' + res)
}

loadAnimations()