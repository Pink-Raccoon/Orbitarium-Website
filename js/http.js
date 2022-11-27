const URL = 'http://localhost:12341'
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
    throw 'METHOD NOT YET IMPLEMENTED'
}

export const getAllAnimations = (url, succ, err) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onload = function () {
        if (xhr.status === 200) {
            succ(JSON.parse(xhr.responseText))
        } else {
            err(xhr.response)
        }
    };

    xhr.send();
}

export const getAllAnimationsTest = (url, succ, err) => {
    console.log('well here we are')
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