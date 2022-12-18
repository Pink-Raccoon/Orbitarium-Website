import * as http from './http.js'

const rotate = (y, z) => {
    let args = {
        URL: http.ROTATE_ANIMATION,
        body: {
            "y": y,
            "z": z
        }
    }
    http.POST(args)
}

export {
    rotate as rotate
}