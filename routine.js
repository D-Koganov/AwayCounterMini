var dnow = new Date();
dnow.setHours(8); //setting hours, 'cause we want only days
var devent = new Date(2025, 9, 16, 8); //months start from 0

var DEBUG = false;

//var secondsPast = Math.round( (dnow.getTime() - devent.getTime())/1000 ); //more simple way to do it, but...
function calculateDatesDifferenceAbs(dnow, devent) {
    if (dnow >= devent) {
        dnow = new Date(dnow);
        devent = new Date(devent);
    } else {
        var tmp = dnow;
        dnow = new Date(devent);
        devent = new Date(tmp);
    }

    var difference = {months : 0, days : 0}
    var yearDifference = dnow.getFullYear() - devent.getFullYear();
    if ( yearDifference >= 1) {
        var fullCover = (dnow.getMonth() > devent.getMonth()) 
          || (dnow.getMonth() == devent.getMonth() && dnow.getDate() > devent.getDate() )
        if (fullCover) {
            difference.months = 12 * yearDifference;
            devent.setFullYear(dnow.getFullYear());
        } else {
            difference.months = 12 * (yearDifference - 1);
            devent.setFullYear(dnow.getFullYear() - 1);
        }
    }
    if (DEBUG) {
        console.log('Event date point1:'+devent)
    }
    

    if (dnow.getFullYear() > devent.getFullYear()) {
        difference.months += (11 - devent.getMonth()); //"full" months till December
        if (dnow.getMonth() == 0 && dnow.getDate() < devent.getDate()) {
            //case like: Dec 20 -> Jan 5th 
            devent.setMonth(11);
            difference.days = Math.round( (dnow.getTime() - devent.getTime())/1000/60/60/24 );
            return difference; 
        }
        difference.months += 1;
        devent.setFullYear(dnow.getFullYear());
        devent.setMonth(0);
    }
    if (DEBUG) {
        console.log('Event date point2:'+devent)
    }
    

    if (dnow.getDate() >= devent.getDate()) {
        difference.months += dnow.getMonth() - devent.getMonth();
        difference.days = dnow.getDate() - devent.getDate();
        if (DEBUG) {
            console.log('End1');   
        }
    } else {
        difference.months += dnow.getMonth() - devent.getMonth() - 1;
        devent.setMonth(dnow.getMonth() - 1);
        difference.days = Math.round( (dnow.getTime() - devent.getTime())/1000/60/60/24 );
        if (DEBUG) {
            console.log('End2');
            console.log('Event date point3:'+devent)
        }
    }

    return difference;
}

var difference = calculateDatesDifferenceAbs(dnow, devent)

document.getElementById('monthsPast').innerText = difference.months;
document.getElementById('daysPast').innerText = difference.days;

if (difference.months >= 4) {
    var body = document.querySelector("body");
    body.style = "background-color: #800080";
}


/*
//Some tests
function assertEqualsDifference(diff1, diff2, testName) {
    if (diff1.months == diff2.months && diff1.days == diff2.days) {
        console.log("test \"" + testName + "\" passed")
    } else {
        console.log("TEST \"" + testName + "\" FAILED! ACTUAL MONTHS VALUE:" + diff2.months 
            + ", ACTUAL DAYS VALUE: " + diff2.days)
    }
}

function getDifferenceObject(months, days) {
    return {months : months, days : days}
}

var dnow = new Date(2026, 1, 16, 8);
var devent = new Date(2023, 1, 16, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(3*12, 0), difference, "3 full years")

var dnow = new Date(2026, 1, 16, 8);
var devent = new Date(2023, 2, 16, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(3*12-1, 0), difference, "3 years - 1 month")

var dnow = new Date(2026, 1, 16, 8);
var devent = new Date(2023, 1, 10, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(3*12, 6), difference, "3 years + 6 days")

var dnow = new Date(2025, 2, 16, 8);
var devent = new Date(2025, 1, 16, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(1, 0), difference, "simple 1 month")

var dnow = new Date(2025, 11, 20, 8);
var devent = new Date(2025, 11, 10, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(0, 10), difference, "simple 10 days")

var dnow = new Date(2026, 2, 7, 8);
var devent = new Date(2026, 1, 25, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(0, 10), difference, "february 10 days")

var dnow = new Date(2026, 0, 7, 8);
var devent = new Date(2025, 11, 6, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(1, 1), difference, "1 month 1 day through new year")

var dnow = new Date(2026, 0, 7, 8);
var devent = new Date(2025, 11, 30, 8); //months start from 0
difference = calculateDatesDifferenceAbs(dnow, devent);
assertEqualsDifference(getDifferenceObject(0, 8), difference, "less than 1 month through new year")
//*/

