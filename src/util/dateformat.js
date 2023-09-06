const formatDate = (date) =>{
    if (date == null || date == '') {
        return '';
    }
    date = new Date(date);
    let d = date.getDate(),
        M = date.getMonth() + 1,
        y = date.getFullYear(),
        H = date.getHours(),
        // s = date.getSeconds(),
        m = date.getMinutes();

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };
    if (H < 10) {
        H = "0" + H;
    };
    if (M < 10) {
        M = "0" + M;
    };
    return `${d}-${M}-${y} ${H}:${m}`
}
const formatDateV2 = (date) =>{
    if (date == null || date == '') {
        return '';
    }
    date = new Date(date);
    let d = date.getDate(),
        M = date.getMonth() + 1,
        y = date.getFullYear(),
        H = 0,
        s = 0,
        m = 1;

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };
    return `${d}-${M}-${y} ${H}:${m}:${s}`
}

const formatDateV3 = (date) =>{
    if (date == null || date == '') {
        return '';
    }
    date = new Date(date);
    let d = date.getDate(),
        M = date.getMonth() + 1,
        y = date.getFullYear(),
        H = 23,
        s = 999,
        m = 59;

    if (d < 10) {
        d = "0" + d;
    };
    if (m < 10) {
        m = "0" + m;
    };
    return `${d}-${M}-${y} ${H}:${m}:${s}`
}

const formatDateV4 = (date) =>{
    if (date == null || date == '') {
        return '';
    }
    date = new Date(date);
    let d = date.getDate(),
        M = date.getMonth() + 1,
        y = date.getFullYear()

    if (d < 10) {
        d = "0" + d;
    };
    if (M < 10) {
        M = "0" + M;
    };
    return `${M}/${d}/${y}`
}

const formatDateV5 = (date) =>{
    if (date == null || date == '') {
        return '';
    }
    date = new Date(date);
    let d = date.getDate(),
        M = date.getMonth() + 1,
        y = date.getFullYear()

    if (d < 10) {
        d = "0" + d;
    };
    if (M < 10) {
        M = "0" + M;
    };
    return `${y}-${M}-${d}`
}
// const formatDate_DDmmYYYYhhMM = (date) =>{
//     if (date == null || date == '') {
//         return '';
//     }
//     date = new Date(date);
//     let d = date.getDate(),
//         M = date.getMonth() + 1,
//         y = date.getFullYear(),
//         H = date.getHours(),
//         s = date.getSeconds(),
//         m = date.getMinutes();

//     if (d < 10) {
//         d = "0" + d;
//     };
//     if (m < 10) {
//         m = "0" + m;
//     };
//     return `${d}-${M}-${y} ${H}:${m}:${s}`
// }
export {formatDate,formatDateV2,formatDateV3,formatDateV4,formatDateV5}