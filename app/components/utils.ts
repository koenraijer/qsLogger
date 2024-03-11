export function getUuid(min: number = 1, max: number = 1000000000) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

// unicodeDict
export const unicodeDict = { 
    "edit": "&#xf14b;",
    "double_chevron" : "&#xf0dc",
    "backspace" : "&#xf55a",
    "three_vertical_dots" : "&#xf142",
}