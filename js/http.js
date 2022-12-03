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
 * @param {string}          url         The url at which the request will be sent.
 * @param {function(data)}  callback    Callback which is being called when request was handled successfully. 
 * @param {object}          params      An object containting parameters key, value pairs which will be appended to the url.
 */
export const GET = (url, callback, params = {}) => {
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
    .then((data) => callback(data))
    .catch((err) => console.log(err))
}

/**
 * Send a POST request to the url of interest. Additional data will be passed in the body.
 * 
 * @param {string}          url         The url at which the request will be sent.
 * @param {object}          data        An object containting all data which will be added to the body.
 * @param {function()}      callback    Callback which is being called when request was handled successfully.   
 */
export const POST = (url, data, callback) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
            callback()
        }
    })
    .catch((err) => console.log(url + ' ' + err))
}

/**
 * Get an image from the server.
 * 
 * @param {function(data)}  callback    Callback which is being called when request was handled successfully.  
 * @param {string}          key         The key of the animation of which the image should be received.
 */
export const GETImage = (callback, key) => {
    fetch(GET_ANIMATION_IMAGES + '?key=' + key, {
        referrerPolicy: 'same-origin'
    })
    .then((response) => {
        if (!response.ok) {
            throw "network error"
        }

        return response.blob()
    })
    .then((blob) => callback(URL.createObjectURL(blob)))
    .catch((err) => console.log(err))
}