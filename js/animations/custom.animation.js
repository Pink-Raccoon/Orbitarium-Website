import * as http from "./../http.js"

const fillCustomTemplate = (template, data) => {
    template.querySelector('.title').textContent = data['Name']
    template.querySelector('#description').append(document.createTextNode(data['Description']))
    
    let playPauseButton = template.querySelector('#play-pause-button-custom')
    let reloadButton = template.querySelector('#reload-button')
   
    playPauseButton.addEventListener('click', (handlePlayPause(playPauseButton)))
    reloadButton.addEventListener('click', (handleReload(reloadButton, data['Key'], (startAnimation(playPauseButton)))))

    startAnimation(playPauseButton)
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
        let args = {
            URL: http.ADAPT_ANIMATION,
            body: {
                CommandName: command
            },
            success: togglePlayPause
        }
        http.POST(args)
    }
}

const startAnimation = (button) => {
    let args = {
        URL: http.ADAPT_ANIMATION,
        body: {
            CommandName: "start_custom"
        },
        success: () => {button.parentNode.classList.toggle('animation-play-button')}
    }
    http.POST(args)
    
}

const handleReload = (button, key, startAnimationCallback) => {
    const animateReloading = () => {
        button.parentNode.classList.toggle('animation-play-button')
    }

    return () => {
        let args = {
            URL: http.SELECT_ANIMATION,
            body: {
                animationKey: key
            },
            success: () => {
                animateReloading()
                startAnimationCallback()
            },
            error: animateReloading
        }
        http.POST(args)
    }
}

export {
    fillCustomTemplate as fillCustomTemplate
}
