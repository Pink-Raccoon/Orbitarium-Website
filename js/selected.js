import * as http from './http.js'

let currentSelection = null

const selectAnimationDiv = document.getElementById('animation-selected')

function makeSelectFunction(animation) {
    function select() {
        clearSelection()
        selectAnimationDiv.classList.remove('hidden')

        http.POST(http.SELECT_ANIMATION, {
            animationKey: animation['Key']
        },
        (data) => {
            console.log('selected animation with response: ' + data)
        })

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
            switch (element) {
                case 'slider':
                    let sliderDiv = document.createElement('div')
                    createSlider(div, value)
                    div.appendChild(sliderDiv)
                    break;
                case 'info':
                    let infoDiv = document.createElement('div')
                    createInfoNode(div, value)
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

async function createSlider(parent, allSliders) {
    let template = document.querySelector('#slider-template')
    for (let index in allSliders) {
        let slider = allSliders[index]
        let clone = template.content.cloneNode(true)

        clone.querySelector('h3').textContent = slider.Name

        let input = clone.querySelector('input')
        input.min = slider['Range'][0]
        input.max = slider['Range'][1]
        input.step = slider['Range'][2]
        input.value = slider.value

        input.addEventListener('change', sliderChanged)

        parent.appendChild(clone)
    }
}

function sliderChanged(event) {
    let sliderValue = event.srcElement.value
    
    http.POST(http.ADAPT_ANIMATION, next(), {
        "key": sliderValue
    })

}

async function createInfoNode(parent, infos) {
    let template = document.querySelector('#info-template')
    for (let [topic, content] of Object.entries(infos)) {
        let clone = template.content.cloneNode(true)
        clone.querySelector('.info-topic').textContent = topic
        clone.querySelector('.info-content').textContent = content
        parent.appendChild(clone)
    }
}

export {
    makeSelectFunction as makeSelectFunction
}