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
    sliderValue.innerHTML = data['Adaption']['Slider']['Value']

    let infoNodes = template.querySelectorAll('.info')
    infoNodes[0].querySelector('.info-content').textContent = data['Information']['SeaLevel']
    infoNodes[1].querySelector('.info-content').textContent = data['Information']['Temp']
    infoNodes[2].querySelector('.info-content').textContent = data['Information']['Year']

    let playPauseButton = template.querySelector('#play-pause-button-co2')
    let reloadButton = template.querySelector('#reload-button-co2')
    playPauseButton.addEventListener('click', (handlePlayPause(playPauseButton, data['IsPlaying'])))
    reloadButton.addEventListener('click', (handleReload(reloadButton)))
}

const sendSliderChangeValue = (value) => {
    let args = {
        URL: http.ADAPT_ANIMATION,
        body: {
            CommandName: "update_co2_level",
            Data: {
                ppm: value
            }
        },
        success: () => console.log('successfully updated') 
    }
    http.POST(args)
}

const handlePlayPause = (button, playing) => {
    let isPlaying = playing;

    const togglePlayPause = () => {
        if (isPlaying) {
            isPlaying = false
        } else {
            isPlaying = true
        }

        (button.querySelectorAll('img')).forEach(img => img.classList.toggle('hidden'))
        button.parentNode.classList.toggle('animation-play-button')
    }

    return () => {
        let args = {
            URL: http.ADAPT_ANIMATION,
            body: {
                CommandName: "play_pause_co2"
            },
            success: togglePlayPause
        }
        http.POST(args)
    }
}

const handleReload = (button) => {
    const animateReloading = () => {
        button.parentNode.classList.toggle('animation-play-button')
    }

    return () => {
        animateReloading() // starts the animation

        let args = {
            URL: http.ADAPT_ANIMATION,
            body: {
                CommandName: "reset_co2"
            },
            success: () => {
                // Server handles request faster than animation can be shown. Therefore
                // add a timer so users see animation before it is being stopped again.
                setTimeout(animateReloading, 500)
            },
            error: () => animateReloading
        }

        http.POST(args)
    }
}

export {
    fillCo2Template as fillCo2Template
}
