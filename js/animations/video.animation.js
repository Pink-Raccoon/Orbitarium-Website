import * as http from "./../http.js"

const fillVideoTemplate = (template, data) => {
    template.querySelector('.title').textContent = data['Name']
    template.querySelector('#description').append(document.createTextNode(data['Description']))
    
    let fastBackwardsButton = template.querySelector('#fast-backwards-button')
    let playPauseButton = template.querySelector('#play-pause-button')
    let fastForwardButton = template.querySelector('#fast-forward-button')
   
    fastBackwardsButton.addEventListener('click', (handleFastBackwards(fastBackwardsButton)))
    playPauseButton.addEventListener('click', (handlePlayPause(playPauseButton)))
    fastForwardButton.addEventListener('click', (handleFastForward(fastForwardButton)))
}

const handleFastBackwards = (button) => {
    const toggleSkip = () => button.parentNode.classList.toggle('animation-play-button')

    return () => {
        http.POST(http.ADAPT_ANIMATION,
            {
                CommandName: "skip_backward"
            },
            toggleSkip)
    }
}

const handlePlayPause = (button) => {
    const togglePlayPause = () => {
        (button.querySelectorAll('img')).forEach(img => img.classList.toggle('hidden'))
        button.parentNode.classList.toggle('animation-play-button')
    }

    return () => {
        http.POST(http.ADAPT_ANIMATION,
            {
                CommandName: "play_pause_video"
            },
            togglePlayPause)
    }
}

const handleFastForward = (button) => {
    const toggleSkip = () => button.parentNode.classList.toggle('animation-play-button')

    return () => {
        http.POST(http.ADAPT_ANIMATION,
            {
                CommandName: "skip_forward"
            },
            toggleSkip)
    }
}



export {
    fillVideoTemplate as fillVideoTemplate
}
