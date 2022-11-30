const DOMAIN = 'http://localhost:12341'
const BASE = DOMAIN + '/animations'

export const All_ANIMATIONS = BASE
export const SELECT_ANIMATION = BASE + '/select'
export const ADAPT_ANIMATION = BASE + '/adapt'
export const ANIMATION_INFORMATION = BASE + '/information'
export const ROTATE_ANIMATION = BASE + '/rotate'
export const GET_ANIMATION_IMAGES = BASE + '/image'

/**
 * Send a GET request to the url of interest.
 * 
 * @param {string}      url     url to which the request will be sent
 * @param {function}    next    function to be called once response is available
 * @param {object}      params  parameters which will be appended to the url
 */
export const GET = async (url, next, params = {}) => {
    url += '?'
    let notFirst = false;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            url += (notFirst ? '&' : '') + key + "=" + params[key];
        }
        notFirst = true;
    }

    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw "Network error"
        }

        return response.json()
    })
    .then((data) => next(data))
    .catch((err) => console.log(err))
}

/**
 * Send a POST request to the url of interest. Additional data will be passed in the body.
 * 
 * @param {string}      url     url to which the request will be sent
 * @param {function}    next    function to be called once response is available  
 * @param {json}        data    json object containting data to be sent
 */
export const POST = async (url, next, data) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => next(data))
    .catch((err) => console.log(err))
}

/**
 * Get an image from the server.
 * 
 * @param {function}    next    function to be called once response is available 
 * @param {string}      key     key of the animation of which the image should be received
 */
export const GETImage = (next, key) => {
    console.log('get image for key: ' + key)
    fetch(GET_ANIMATION_IMAGES + '?key=' + key, {
        referrerPolicy: 'same-origin'
    })
    .then((response) => {
        if (!response.ok) {
            throw "network error"
        }

        return response.blob()
    })
    .then((blob) => next(URL.createObjectURL(blob)))
    .catch((err) => console.log(err))
}