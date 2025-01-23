var dnow = new Date();
dnow.setHours(8); //setting hours, 'cause we want only days
var devent = new Date(2025, 0, 18, 9); //months start from 0

function setGoodToGoColor() {
    var body = document.querySelector("body");
    body.style = "background-color:hsl(120, 100%, 90%)";
}

//var secondsPast = Math.round( (dnow.getTime() - devent.getTime())/1000 ); //more simple way to do it, but...
function calcDaysAndMonths(dnow, devent) {
    dnow = new Date(dnow);
    devent = new Date(devent);
    var months=0, days=0;
    var yearDifference = dnow.getFullYear() - devent.getFullYear();
    if ( yearDifference >= 1) {
        var fullCover = (dnow.getMonth() > devent.getMonth()) || (dnow.getMonth() == devent.getMonth() && dnow.getDate() > devent.getDate() )
        if (fullCover) {
            months = 12 * yearDifference;
            devent.setFullYear(dnow.getFullYear());
        } else {
            months = 12 * (yearDifference - 1);
            devent.setFullYear(dnow.getFullYear() - 1);
        }
    }
    console.log('Event date point1:'+devent)
    if (dnow.getFullYear() > devent.getFullYear()) {
        months += (11 - devent.getMonth()); //"full" months till December
        if (dnow.getMonth()>0 || dnow.getDate() >= devent.getDate()) {
          //it's more than a month
          months++;
        } else {
            devent.setMonth(11);
            days = Math.round( (dnow.getTime() - devent.getTime())/1000/60/60/24 );
            return [months, days]; //case like: Dec 20 -> Jan 5th
        }
        devent.setFullYear(dnow.getFullYear());
        devent.setMonth(0);
    }
    console.log('Event date point2:'+devent)
    if (dnow.getDate() >= devent.getDate()) {
        console.log('End1');
        return [months + dnow.getMonth() - devent.getMonth(), dnow.getDate() - devent.getDate()];
    } else {
        console.log('End2');
        months+= dnow.getMonth() - devent.getMonth() - 1;
        devent.setMonth(dnow.getMonth() - 1);
        console.log('Event date point3:'+devent)
        return [months, Math.round( (dnow.getTime() - devent.getTime())/1000/60/60/24 )];
    }
}

var months_n_days = calcDaysAndMonths(dnow, devent)
if (months_n_days[0]>=3) setGoodToGoColor();
document.getElementById('monthsPast').innerText = months_n_days[0];
document.getElementById('daysPast').innerText = months_n_days[1];

//document.getElementById('lastDate').innerText = dexpectedMinimum.toDateString();

