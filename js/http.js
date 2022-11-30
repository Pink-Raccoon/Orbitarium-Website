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

    if (url === ANIMATION_INFORMATION) {
        next(testInfo())
        return
    }

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
 * @param {json}        data    json object containting data to be sent
 * @param {function}    next    function to be called once response is available  
 */
export const POST = async (url, data, next) => {
    fetch(SELECT_ANIMATION, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
            next()
        }
    })
    .catch((err) => console.log(url + ' ' + err))
}

/**
 * Get an image from the server.
 * 
 * @param {function}    next    function to be called once response is available 
 * @param {string}      key     key of the animation of which the image should be received
 */
export const GETImage = (next, key) => {
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

function testInfo() {
    let json = `
    {
        "Description":"Displays the world at a certain Co2-level.",
        "Name":"Co2 Animation",
        "Key":"co2_co2animation",
        "AnimationType":"co2",
        "IsPlaying":"True",
        "adapt":{
            "slider":[
                {
                    "key":"PPM",
                    "Name":"Parts Per Million (PPM)",
                    "Range":[ 50, 350, 5 ],
                    "value":230
                }
            ],
            "info":{
                "SeaLevel":"4.60799753909669E-09",
                "Temp":"14.0781613549508",
                "Year":"2170"
            }
        }
        }`

    return JSON.parse(json)
}