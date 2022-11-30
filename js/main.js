import * as http from './http.js'
import * as select from './selected.js'

function loadAnimations() {
    console.log('loading all animations')
    http.GET(http.All_ANIMATIONS, createAnimationElements)
}

function createAnimationElements(json) {
    let animationsContainer = document.getElementById('animations-container')

    for (let index in json) {
        let animation = json[index]

        let child = document.createElement('div')
        child.classList.add('animation')
        let fSelect = select.makeSelectFunction(animation)        
        child.addEventListener('click', fSelect)
        
        let divImg = document.createElement('div')
        divImg.classList.add('image')

        http.GETImage((makeAppendImageFunction(divImg)), animation['Key'])

        let text = document.createTextNode(animation['Name'])
        
        child.appendChild(divImg)
        child.appendChild(text)

        animationsContainer.appendChild(child)
    }
}

function makeAppendImageFunction(parent) {
    function appendImage(imgURL) {
        let img = document.createElement('img')

        img.src = imgURL
        parent.appendChild(img)
    }

    return appendImage
}

loadAnimations()