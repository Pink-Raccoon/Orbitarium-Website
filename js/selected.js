let currentSelection = null

const selectAnimationDiv = document.getElementById('animation-selected')

function makeSelectFunction(animation) {
    function select() {
        clearSelection()
        selectAnimationDiv.classList.remove('hidden')

        let div = document.createElement('div')
        div.id = animation['Key']
        
        let title = document.createTextNode(animation['Name'])
        let description = document.createTextNode('Description' + animation['Description'])

        div.appendChild(title)
        div.appendChild(description)

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

export {
    makeSelectFunction as makeSelectFunction
}