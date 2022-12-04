import * as http from "./../http.js"

const fillCustomTemplate = (template, data) => {
    template.querySelector('.title').textContent = data['Name']
    template.querySelector('#description').append(document.createTextNode(data['Description']))
    
    let playPauseButton = template.querySelector('#play-pause-button-custom')
    let reloadButton = template.querySelector('#reload-button')
   
    playPauseButton.addEventListener('click', (handlePlayPause(playPauseButton)))
    reloadButton.addEventListener('click', (handleReload(reloadButton)))
}

const handlePlayPause = (button) => {
    let isPlaying = false;

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
        let command = isPlaying ? "stop_custom" : "continue_custom"
        http.POST(http.ADAPT_ANIMATION,
            {
                CommandName: command
            },
            togglePlayPause)
    }
}

const handleReload = (button) => {
    const animateReloading = () => {
        button.parentNode.classList.toggle('animation-play-button')
    }

    return () => {
        animateReloading() // starts the animation
        http.POST(http.ADAPT_ANIMATION,
            {
                CommandName: "start_custom"
            },
            animateReloading) // stops the animation

            // todo: add fail clause, else animation will not stop
    }
}


export {
    fillCustomTemplate as fillCustomTemplate
}
