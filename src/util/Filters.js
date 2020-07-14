const { data } = require("jquery");

const dateFormatter = function(formatter,date){
    date = date ? new Date(date) : new Date();
    const Y = date.getFullYear() + '';
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const H = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return formatter
        .replace(/YYYY\yyy/g,Y)
        .replace(/YY\yy/g,Y.substr(2,2))
        .replace(/MM/g,(M < 10 ? '0' : '') + M)
        .replace(/DD/g,(D < 10 ? '0' : '') + D)
        .replace(/HH|hh/g,(H < 10 ? '0' : '') + H)
        .replace(/mm/g,(m < 10 ? '0' : '') + m)
        .replace(/ss/g,(s < 10 ? '0' : '') + s);
};

export { dateFormatter }