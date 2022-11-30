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

        parent.appendChild(div)
    }

    return appendAnimationSpecificInformation
}

export {
    makeSelectFunction as makeSelectFunction
}