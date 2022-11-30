import * as http from './http.js'

let currentSelection = null

const selectAnimationDiv = document.getElementById('animation-selected')

function makeSelectFunction(animation) {
    function select() {
        clearSelection()
        selectAnimationDiv.classList.remove('hidden')

        let template = document.querySelector('#selected-animation-template')
        let clone = template.content.cloneNode(true)

        clone.querySelector('.title').textContent = animation['Name']
        clone.querySelector('#description').appendChild(document.createTextNode(animation['Description']))

        http.GET(
            http.ANIMATION_INFORMATION, 
            (makeAppendAnimationSpecificInformation(clone.querySelector('#adaptations')))
        )

        currentSelection = clone.firstElementChild
        selectAnimationDiv.appendChild(clone)
    }

    return select
}

function clearSelection() {
    if (currentSelection === null) {
        return
    }
    
    selectAnimationDiv.removeChild(currentSelection)
    currentSelection = null
}

function makeAppendAnimationSpecificInformation(parent) {
    function appendAnimationSpecificInformation(data) {
        let div = document.createElement('div')
        div.appendChild(document.createTextNode('i contain further information'))

        for (let [element, value] of Object.entries(data['adapt'])) {
            console.log(element)
            switch (element) {
                case 'slider':
                    let sliderDiv = document.createElement('div')
                    createSlider(div, value)
                    div.appendChild(sliderDiv)
                    break;
                case 'info':
                    let infoDiv = document.createElement('div')
                    createSlider(div, value)
                    div.appendChild(infoDiv)
                    break;
                default:
                    console.log('unknown adaptation')
            }
        }

        parent.appendChild(div)
    }

    return appendAnimationSpecificInformation
}

async function createSlider(parent, sliders) {
    for (let index in sliders) {
        console.log('hiiiii ' + index)
    }
}

async function createInfoNode(parent, infos) {
    console.log('syke' + JSON.stringify(infos))
}

export {
    makeSelectFunction as makeSelectFunction
}