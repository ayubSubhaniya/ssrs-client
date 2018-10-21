
export function camelCaseToWords(text) {
    if(!text)
        return '';
    let result = text.replace( /([A-Z])/g, " $1" );
    let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}

export function formatDate(time) {
    const date = new Date(time)
    let monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    if(date.toString()==='Invalid Date')
        return ''
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let mer = hours<12?'AM':'PM';
    hours = hours % 12 || 12;
    hours = hours<10?'0'+ hours:hours;
    let minitues = date.getMinutes();
    minitues = minitues<10?'0'+minitues:minitues

    return day + '-' + monthNames[monthIndex] + '-' + year + ' ' + hours + ":" + minitues + " " + mer;
}
