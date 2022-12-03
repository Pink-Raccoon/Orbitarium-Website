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
    let type = animation['AnimationType']

    switch (type) {
        case 'custom':
            return createCustomAnimation()
        case 'website':
            return createWebsiteAnimation()
        case 'video':
            return createVideoAnimation()
        case 'co2':
            return createCo2Animation()
        default:
            break;
    }
}

function createCustomAnimation() {
    let template = document.querySelector('#custom-animation-template')
    let clone = template.content.cloneNode(true)

    http.GET(
        http.ANIMATION_INFORMATION, 
        (data) => {
            console.log('hi, custom')
        }
    )

    currentSelection = clone.firstElementChild
    selectAnimationDiv.appendChild(clone)
}

function createWebsiteAnimation() {
    let template = document.querySelector('#website-template')
    let clone = template.content.cloneNode(true)

    http.GET(
        http.ANIMATION_INFORMATION, 
        (data) => {
            console.log('hi, website')
        }
    )

    currentSelection = clone.firstElementChild
    selectAnimationDiv.appendChild(clone)
}

function createVideoAnimation() {
    let template = document.querySelector('#video-animation-template')
    let clone = template.content.cloneNode(true)

    http.GET(
        http.ANIMATION_INFORMATION, 
        (data) => {
            console.log('hi, video')
        }
    )

    currentSelection = clone.firstElementChild
    selectAnimationDiv.appendChild(clone)
}

function createCo2Animation() {
    let template = document.querySelector('#co2-animation-template')
    let clone = template.content.cloneNode(true)

    http.GET(
        http.ANIMATION_INFORMATION, 
        (data) => {
            console.log('hi, co2')
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

function makeStartStopButtonHandler() {
    let isAnimationRunning = false

    function handleButtonState(event ) {
        let button = event.target

        if (isAnimationRunning) {
            //http.POST(start, {}, () => {
            //    button.textContent = 'Start Animation'
            //    isAnimationRunning = false
            //})

            button.textContent = 'Start Animation'
            isAnimationRunning = false
            console.log('animation has been stopped')
        } else {
            //http.POST(start, {}, () => {
            //    button.textContent = 'Stop Animation'
            //    isAnimationRunning = true
            //})

            button.textContent = 'Stop Animation'
            isAnimationRunning = true
            console.log('animation has been started')
        }
    }

    return handleButtonState
}

export {
    makeSelectFunction as makeSelectFunction
}