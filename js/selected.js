import * as http from './http.js'

import { fillCo2Template } from './animations/co2.animation.js'
import { fillCustomTemplate } from './animations/custom.animation.js' 
import { fillVideoTemplate } from './animations/video.animation.js'
import { fillWebsiteTemplate } from './animations/website.animation.js'

import { rotate } from './roation.js'

const selectAnimationDiv = document.getElementById('animation-selected')

let currentSelection = null

function makeSelectFunction(animation) {
    function select() {
        clearSelection()
        selectAnimationDiv.classList.remove('hidden')

        let args = {
            URL: http.SELECT_ANIMATION,
            body: {
                animationKey: animation['Key']
            },
            success: () => displaySelectedAnimation(animation)
        }
        http.POST(args)
    }

    return select
}

/**
 * Clears the current selected animation.
 * 
 * @returns {void}
 */
function clearSelection() {
    if (currentSelection === null) {
        document.querySelectorAll('#animations-container > .no-animation-selected').forEach(child => child.classList.remove('no-animation-selected'))
        return
    }
    
    selectAnimationDiv.removeChild(currentSelection)
    currentSelection = null
}

/**
 * Displays the selected animation in the {@constant selectAnimationDiv}. 
 * 
 * @param {json} animation JSON containing information about the selected animation. 
 *  
 * @returns {void}
 */
function displaySelectedAnimation(animation) {
    let type = animation['AnimationType']

    switch (type) {
        case 'custom':
            return createAnimation('#custom-animation-template', fillCustomTemplate)
        case 'website':
            return createAnimation('#website-template', fillWebsiteTemplate)
        case 'video':
            return createAnimation('#video-animation-template', fillVideoTemplate)
        case 'co2':
            return createAnimation('#co2-animation-template', fillCo2Template)
        default:
            break;
    }
}

/**
 * Requests the animation specific information and passes is to the callback.
 * 
 * @param {string}      templateId  Id of the html-template which will be used for the animation. 
 * @param {function(data)}  callback    Callback which creates the animation with the animation specific data.
 */
function createAnimation(templateId, callback) {
    let template = document.querySelector(templateId)
    let clone = template.content.cloneNode(true)
    currentSelection = clone.firstElementChild

    let args = {
        URL: http.ANIMATION_INFORMATION,
        success: (data) => callback(currentSelection, data)
    }
    http.GET(args)

    createRotationHandlers(currentSelection)
    selectAnimationDiv.appendChild(clone)
}

function createRotationHandlers(template) {
    let buttonLeft = template.querySelector('#button-rotate-left')
    let buttonRight = template.querySelector('#button-rotate-right')
    let leftClassList = buttonLeft.parentNode.classList 
    let rightClassList = buttonRight.parentNode.classList 

    buttonLeft.addEventListener('click', () => {
        if (rightClassList.contains('animation-play-button')) {
            rightClassList.toggle('animation-play-button')
        }
        leftClassList.toggle('animation-play-button')
        rotate(0, -1)
    })

    buttonRight.addEventListener('click', () => {
        if (leftClassList.contains('animation-play-button')) {
            leftClassList.toggle('animation-play-button')
        }
        rightClassList.toggle('animation-play-button')
        rotate(0, 1)
    })
}

export {
    makeSelectFunction as makeSelectFunction
}