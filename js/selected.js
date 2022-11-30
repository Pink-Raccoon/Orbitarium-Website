import * as http from './http.js'

const selectAnimationDiv = document.getElementById('animation-selected')

let currentSelection = null

function makeSelectFunction(animation) {
    function select() {
        clearSelection()
        selectAnimationDiv.classList.remove('hidden')

        http.POST(http.SELECT_ANIMATION, {
            animationKey: animation['Key']
        },
        () => {
            displaySelectedAnimation(animation)
        })
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

function displaySelectedAnimation(animation) {
    let template = document.querySelector('#selected-animation-template')
    let clone = template.content.cloneNode(true)

    clone.querySelector('.title').textContent = animation['Name']
    clone.querySelector('#description').appendChild(document.createTextNode(animation['Description']))

    http.GET(
        http.ANIMATION_INFORMATION, 
        (data) => {
            appendAnimationSpecificInformation(clone.querySelector('#adaptations'), data)
        }
    )

    currentSelection = clone.firstElementChild
    selectAnimationDiv.appendChild(clone)
}

function appendAnimationSpecificInformation(parent, data) {
    for (let [element, value] of Object.entries(data['adapt'])) {
        switch (element) {
            case 'slider':
                createSlider(parent, value)
                break;
            case 'info':
                createInfoNode(parent, value)
                break;
            default:
                console.log('unknown adaptation')
        }
    }
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
    console.log(event)
    let sliderValue = event.srcElement.value
    
    http.POST(http.ADAPT_ANIMATION, {
        key: sliderValue
    },
    () => console.log('change successful')
    )

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