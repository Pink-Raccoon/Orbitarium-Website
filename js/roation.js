import * as http from './http.js'

const rotate = (y, z) => {

    let args = {
        URL: http.ROTATE_ANIMATION,
        body: {
            "y": y,
            "z": z
        },
        success: () => console.log('it was successful')
    }
    http.POST(args)
}

export {
    rotate as rotate
}