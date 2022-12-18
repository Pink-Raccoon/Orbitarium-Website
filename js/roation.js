import * as http from './http.js'

const rotate = (y, z) => {
    let args = {
        URL: http.ROTATE_ANIMATION,
        body: {
            "y": y,
            "z": z
        },
        success: () => console.log('it was successful'),
        error: () => console.log('that did not work as expected')
    }
    http.POST(args)
}

export {
    rotate as rotate
}