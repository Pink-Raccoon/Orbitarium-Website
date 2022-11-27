const URL = 'localhost:12341'
const BASE = '/animations'

export const All_ANIMATIONS = BASE
export const SELECT_ANIMATION = BASE + '/select'
export const ADAPT_ANIMATION = BASE + '/adapt'
export const ANIMATION_INFORMATION = BASE + '/information'
export const ROTATE_ANIMATION = BASE + '/rotate'
export const GET_ANIMATION_IMAGES = BASE + '/image'

export const TYPE = {
    POST: 'post',
    GET: 'get'
}

export const request = (type, url, next) => {
    fetch(url)
    .then(data => {next(data)})
    .then(res => {console.log(res)})
}

