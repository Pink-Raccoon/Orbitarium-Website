const URL = 'http://localhost:12341'
const BASE = '/animations'

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
 * @param {object}      params  parameters which will be appended to the url
 * @param {function}    next    function to be called once response is available
 */
export const GET = (url, params, next) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            next(JSON.parse(xhr.responseText))
        } else {
            console.log('Failed to execut request. url: ' + url + ' message: ' + xhr.responseText)
        }
    };

    url += '?'
    let notFirst = false;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            url += (notFirst ? '&' : '') + key + "=" + params[key];
        }
        notFirst = true;
    }

    xhr.open("GET", url);
    xhr.send();
}

/**
 * Send a POST request to the url of interest. Additional data will be passed in the body.
 * 
 * @param {string}      url     url to which the request will be sent
 * @param {JSON}        body    body containting parameters
 * @param {function}    next    function to be called once response is available  
 */
export const POST = (url, body, next) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            succ(JSON.parse(xhr.responseText))
        } else {
            err(xhr.response)
        }
    };

    xhr.send(JSON.stringify(body));
}

export const getAllAnimationsTest = (url, succ, err) => {
    let json = `[
        {
            "Key": "corona_spread_active_cases",
            "Name": "Corona Spread Active Cases",
            "Description": "This animation displays all active cases of Covid-19 infections for any given day in every tracked country starting on January 22nd, 2020. DISCLAIMER: The active infection count for each US state is estimated! We do not have the exact active infection count per state!",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "website_windy",
            "Name": "Windy",
            "Description": "Displays live weather.",
            "AnimationType": "website",
            "CommandData": null
        },
        {
            "Key": "video_firstvideo",
            "Name": "First Video",
            "Description": "First video to display.",
            "AnimationType": "video",
            "CommandData": null
        },
        {
            "Key": "co2_co2animation",
            "Name": "Co2 Animation",
            "Description": "Displays the world at a certain Co2-level.",
            "AnimationType": "co2",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        },
        {
            "Key": "INVALID_KEY",
            "Name": "Placeholder Obj",
            "Description": "Placeholder Description",
            "AnimationType": "custom",
            "CommandData": null
        }
    ]`

    succ(JSON.parse(json))
}