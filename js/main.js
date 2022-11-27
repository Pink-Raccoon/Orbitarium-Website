import * as http from './http.js'

const selectAnimationDiv = document.getElementById('animation-selected')

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
        let select = makeSelectFunction(animation)        
        child.addEventListener('click', select)
        
        let text = document.createTextNode(animation['Name'])
        child.appendChild(text)

        animationsContainer.appendChild(child)
    }
}

function makeSelectFunction(animation) {
    function select() {
        console.log('selected: ' + animation['Key'])
        selectAnimationDiv.classList.remove('hidden')

        let div = document.createElement('div')
        div.id = animation['Key']
        
        let title = document.createTextNode(animation['Name'])
        let text = document.createTextNode('Description' + animation['Description'])

        div.appendChild(title)
        div.appendChild(text)
        selectAnimationDiv.appendChild(div)
    }

    return select
}

function error(res) {
    console.log('an error occured with response: ' + res)
}

loadAnimations()