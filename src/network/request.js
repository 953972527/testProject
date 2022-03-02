import axios from "axios";

export function ajaxRequest(config) {
    var interFace = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    return interFace(config)
}