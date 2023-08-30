function loadCSS(cssURL) {
    return new Promise(function(res, rej) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssURL;
        document.head.appendChild(link);
        link.onload = function() {
            console.log('css loaded');
            res();
        }
    });
}

class Clock extends HTMLElement {

    template() {
        return `
        <div class="dayDisplay"></div>
        <div class="dateDisplay"></div>
        <div class="timeDisplay"></div>
        `
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = this.template();
        this.initialize();
    }

    initialize() {
        const setDate = () => {
            const date = new Date();
            this.getElementsByClassName("dayDisplay").item(0).innerHTML = displayDate(date);
            this.getElementsByClassName("dateDisplay").item(0).innerHTML = date.toLocaleDateString();
        }
        const setTime = () => {
            const date = new Date();
            this.getElementsByClassName("timeDisplay").item(0).innerHTML = displayTime(date);
        }
        setDate();
        setTime();
        setInterval(() => {
            setDate();
        }, 60000);
        setInterval(() => {
            setTime();
        }, 1000)
    }
}

loadCSS('style/clock.css').then(() => {
    customElements.define("clock-widget", Clock);
})

/**
 * 
 * @param {Date} date 
 */
function displayTime(date) {
    return date.toLocaleTimeString();
}

/**
 * 
 * @param {Date} date 
 */
function displayDate(date) {
    return `${getDayOfWeekName(date)}, ${getMonthName(date)} ${date.getDate()}`;
}

/**
 * 
 * @param {Date} date 
 */
function getDayOfWeekName(date) {
    let d = date.getDay();
    return d === 0 ? 'Sunday'
         : d === 1 ? 'Monday' 
         : d === 2 ? 'Tuesday'
         : d === 3 ? 'Wednesday'
         : d === 4 ? 'Thursday'
         : d === 5 ? 'Friday'
         : d === 6 ? 'Saturday'
         : '';
}

/**
 * 
 * @param {Date} date 
 */
function getMonthName(date) {
    let m = date.getMonth();
    return m === 0 ? 'Jan'
         : m === 1 ? 'Feb'
         : m === 2 ? 'Mar'
         : m === 3 ? 'Apr'
         : m === 4 ? 'May'
         : m === 5 ? 'June'
         : m === 6 ? 'July'
         : m === 7 ? 'Aug'
         : m === 8 ? 'Sep'
         : m === 9 ? 'Oct'
         : m === 10 ? 'Nov'
         : m === 11 ? 'Dec'
         : '';
}