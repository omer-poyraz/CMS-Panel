export const toSeoUrl = (url) => {
    return url.toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/&/g, '-and-')
        .replace(/[^a-z0-9\-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-*/, '')
        .replace(/-*$/, '');
}

export const randomColor = () => {
    const colors = ["#922b21", "#b03a2e", "#b03a2e", "#6c3483", "#1f618d", "#2874a6", "#148f77", "#1e8449", "#b7950b", "#b9770e", "#af601a", "#283747"]
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export const splitF = (txt, len) => {
    if (txt) {
        if (txt.length < len) {
            return txt
        } else {
            return `${txt.slice(0, len)}...`
        }
    } else {
        return "";
    }
}