import * as http from "./../http.js"

const fillCo2Template = (template, data) => {
    template.querySelector('.title').textContent = data['Name']
    template.querySelector('#description').append(document.createTextNode(data['Description']))
    
    let slider =template.querySelector('#adaptations .slider input')
    slider.min = data['Adaption']['Slider']['MinValue']
    slider.max = data['Adaption']['Slider']['MaxValue']
    slider.value = data['Adaption']['Slider']['Value']

    slider.addEventListener('change', (event) => {
        sendSliderChangeValue(event.srcElement.value)
    })

    let sliderValue = template.querySelector('#slider-value')
    slider.addEventListener('input', (event) => {
        sliderValue.innerHTML = event.srcElement.value 
    })

    let infoNodes = template.querySelectorAll('.info')
    infoNodes[0].querySelector('.info-content').textContent = data['Information']['SeaLevel']
    infoNodes[1].querySelector('.info-content').textContent = data['Information']['Temp']
    infoNodes[2].querySelector('.info-content').textContent = data['Information']['Year']

    let button = template.querySelector('.button')
    button.addEventListener('click', (co2Button(button, data['IsPlaying'])))
}

const sendSliderChangeValue = (value) => {
    http.POST(http.ADAPT_ANIMATION, 
        {
            CommandName: "update_co2_level",
            Data: {
                ppm: value
            }
        },
        () => console.log('successfully updated'))
}

const co2Button = (button, playing) => {
    let isPlaying = playing

    let changeText = () => {
        if (isPlaying) {
            button.innerHTML = 'Stop Animation'
            isPlaying = false
        } else {
            button.innerHTML = 'Start Animation'
            isPlaying = true
        }
    }

    return () => {
        http.POST(http.ADAPT_ANIMATION,
            {
                CommandName: "play_pause_co2"
            },
            changeText)
    }
}



export {
    fillCo2Template as fillCo2Template
}
