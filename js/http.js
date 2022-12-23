const DOMAIN = 'http://localhost:12341'
const BASE = DOMAIN + '/animations'

export const All_ANIMATIONS = BASE
export const SELECT_ANIMATION = BASE + '/select'
export const ADAPT_ANIMATION = BASE + '/adapt'
export const ANIMATION_INFORMATION = BASE + '/information'
export const ROTATE_ANIMATION = BASE + '/rotate'
export const GET_ANIMATION_IMAGES = BASE + '/image'

/**
 * Send a GET request to the desired URL.
 * 
 * @param {object}          properties - Object which contains all required information.
 * @param {string}          properties.URL - The URL for the request.
 * @param {function(data)}  properties.success - Callback which is called, if the request was successful (Status Code 200-299)
 * @param {function(data)}  properties.error - Callback which is callled, if the request was not successful
 */
export const GET = (properties) => {
    if (!properties.hasOwnProperty('URL')) {
        throw "GET-Request has no URL to call."
    }
    
    properties.URL += '?'
    let notFirst = false;
    for (let key in properties?.params) {
        if (params.hasOwnProperty(key)) {
            url += (notFirst ? '&' : '') + key + "=" + params[key];
        }
        notFirst = true;
    }

    fetch(properties.URL)
    .then((response) => {
        return response.ok 
            ? response.json()
            : properties?.error?.()
    })
    .then((data) => properties?.success?.(data))
    .catch((data) => properties?.error?.(data))
}

/**
 * Send a POST request to the url of interest.
 * 
 * @param {object}          properties - Object which contains all required information.
 * @param {string}          properties.URL - The URL for the request.
 * @param {object}          properties.body - The body for the post request. 
 * @param {function()}      properties.success - Callback which is called, if the request was successful (Status Code 200-299)
 * @param {function()}      properties.error - Callback which is callled, if the request was not successful
 */
export const POST = (properties) => {
    if (!properties.hasOwnProperty('URL') && !properties.hasOwnProperty('body')) {
        throw 'POST-Request has no URL to call or body to pass.'
    }

    fetch(properties.URL, {
        method: 'POST',
        body: JSON.stringify(properties.body)
    })
    .then((response) => {
        return response.ok 
            ? properties?.success?.()
            : properties?.error?.()
    })
    .catch((err) => properties?.error?.())
}

/**
 * Get an image from the server.
 * 
 * @param {object}          properties - Object which contains all required information.
 * @param {string}          properties.animationKey - The key of the animation of which the image should be retreived.
 * @param {function(data)}  properties.success - Callback which is called, if the request was successful (Status Code 200-299)
 * @param {function(data)}  properties.error - Callback which is callled, if the request was not successful
 */
export const GETImage = (properties) => {
    if (!properties.hasOwnProperty('animationKey')) {
        throw 'GET-Request has no animationKey.'
    }

    fetch(GET_ANIMATION_IMAGES + '?key=' + properties.animationKey, {
        referrerPolicy: 'same-origin'
    })
    .then((response) => {
        return response.ok 
            ? response.blob()
            : properties?.error?.()

    })
    .then((blob) => properties?.success?.(URL.createObjectURL(blob)))
    .catch((err) => properties?.error?.())
}