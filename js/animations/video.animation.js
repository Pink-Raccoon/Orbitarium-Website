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
        let args = {
            URL: http.ADAPT_ANIMATION,
            body: {
                CommandName: "skip_backward"
            },
            success: toggleSkip 
        }
        http.POST(args)
    }
}

const handlePlayPause = (button) => {
    const togglePlayPause = () => {
        (button.querySelectorAll('img')).forEach(img => img.classList.toggle('hidden'))
        button.parentNode.classList.toggle('animation-play-button')
    }

    return () => {
        let args = {
            URL: http.ADAPT_ANIMATION,
            body: {
                CommandName: "play_pause_video"
            },
            success: togglePlayPause
        }
        http.POST(args)
    }
}

const handleFastForward = (button) => {
    const toggleSkip = () => button.parentNode.classList.toggle('animation-play-button')

    return () => {
        let args = {
            URL: http.ADAPT_ANIMATION,
            body: {
                CommandName: "skip_forward"
            },
            success: toggleSkip 
        }
        http.POST(args)
    }
}



export {
    fillVideoTemplate as fillVideoTemplate
}
