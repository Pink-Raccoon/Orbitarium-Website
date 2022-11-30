let currentSelection = null

const selectAnimationDiv = document.getElementById('animation-selected')

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



export {
    makeSelectFunction as makeSelectFunction
}