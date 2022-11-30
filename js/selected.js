import * as http from './http.js'

let currentSelection = null

const selectAnimationDiv = document.getElementById('animation-selected')

function makeSelectFunction(animation) {
    function select() {
        clearSelection()
        selectAnimationDiv.classList.remove('hidden')

        let div = document.createElement('div')
        div.id = animation['Key']
        
        let title = document.createElement('h1')
        title.appendChild(document.createTextNode(animation['Name']))
        
        let description = document.createElement('p')
        description.appendChild(document.createTextNode('Description: ' + animation['Description']))
        
        let additionalInformation = document.createElement('div')

        http.GET(http.ANIMATION_INFORMATION, (makeAppendAnimationSpecificInformation(additionalInformation)))

        div.appendChild(title)
        div.appendChild(description)
        div.appendChild(additionalInformation)

        currentSelection = div
        selectAnimationDiv.appendChild(div)
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

        let adapt = data['adapt']
        console.log(adapt)

        for (let [element, value] of Object.entries(adapt)) {
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
        let element = sliders[i]
        let range = element['Range'] // Array to determin slider range and step size -> [start, end, step]

        let input = document.createElement('input')
        input.type = 'range'
        input.min = range[0]
        input.max = range[1]
        input.setp = range[2]
        input.value = element.value

        
    }
}

async function createInfoNode(parent, infos) {
    console.log('syke' + JSON.stringify(infos))
}

export {
    makeSelectFunction as makeSelectFunction
}