const { DateTime } = require('luxon');

const isoToDateTime = (date, lang = 'en') => 
    DateTime.fromISO(date, { setZone: true })
        .setZone('America/Denver')
        .setLocale(lang);

const jsToDateTime = (date, lang = 'en') => {
    console.log(date);
    return DateTime.fromJSDate(date, { setZone: true })
    .setZone('America/Denver')
    .setLocale(lang);
}

module.exports = {
    isoToDateTime,
    jsToDateTime
}