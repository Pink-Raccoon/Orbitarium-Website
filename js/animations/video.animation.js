import * as http from "./../http.js"

const fillVideoTemplate = (template, data) => {
    template.querySelector('.title').textContent = data['Name']
    template.querySelector('#description').append(document.createTextNode(data['Description']))
    
    //let fastBackwardsButton = template.querySelector('.video-button-left')
    //let playPauseButton = template.querySelector('.video-button-middle')
    //let fastForwardButton = template.querySelector('.video-button-right')
//
    //fastBackwardsButton.addEventListener('click', (handleFastBackwards(fastBackwardsButton)))
    //playPauseButton.addEventListener('click', (handlePlayPause(playPauseButton)))
    //fastForwardButton.addEventListener('click', (handleFastForward(fastForwardButton)))
}

const handleFastBackwards = (button) => {
    const toggleSkip = () => button.classList.toggle('playing')

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
    const toggleSkip = () => button.classList.toggle('playing')

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
