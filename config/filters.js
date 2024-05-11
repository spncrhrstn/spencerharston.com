const { DateTime } = require("luxon");
const { metadata } = require("./config");

// date filters
const getDateTimeObj = (jsDateObj) => {
    return DateTime.fromJSDate(jsDateObj, { zone: "utc" })
            .setZone(metadata.timezone, { keepLocalTime: true });
};

const dateISO = (dateObj) => getDateTimeObj(dateObj).toUTC().toISO();

const dateHtmlString = (dateObj) => getDateTimeObj(dateObj).toFormat("yyyy-LL-dd");

const dateRFC3339 = (dateObj) => {
    const dt = getDateTimeObj(dateObj).toUTC().toISO();
    
    const split = dt.split(".")
    split.pop();
    return split.join("") + "Z";
} 
    

const dateByFormat = (dateObj, format="yyyy-LL-dd") => getDateTimeObj(dateObj).toFormat(format);

const year = (dateObj) => getDateTimeObj(dateObj).year.toString();

// collection filters
const sortDesc = (collection) => collection.sort((a,b) => b.date - a.date);

const limit = (collection, limit) => collection.slice(0, limit);

const postsByYear = (collection, year) => collection.filter(entry => DateTime.fromJSDate(entry.date).year.toString() === year);

const postsByTag = (collection, tag) => collection.filter(entry => entry.data.tags.includes(tag));

module.exports = { getDateTimeObj, dateISO, dateHtmlString, dateRFC3339, dateByFormat, year, sortDesc, limit, postsByYear, postsByTag };