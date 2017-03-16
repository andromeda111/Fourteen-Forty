////////////////////////////////////////////////////
// DATE VARIABLES  and Conversion Functions-- GLOBAL
////////////////////////////////////////////////////
let getDay;
let getMonth;
let getDate;
let getYear;
let moonPhase;
let sunsign;
let weatherID;

function convertDay() {
    switch (getDay) {
        case 0:
            result = 'Sunday';
            break;
        case 1:
            result = 'Monday';
            break;
        case 2:
            result = 'Tuesday';
            break;
        case 3:
            result = 'Wednesday';
            break;
        case 4:
            result = 'Thursday';
            break;
        case 5:
            result = 'Friday';
            break;
        default:
            result = 'Saturday';
            break;
    }
    return result;
}

function convertMonth() {
    switch (getMonth) {
        case 0:
            result = 'January'
            break;
        case 1:
            result = 'February'
            break;
        case 2:
            result = 'March'
            break;
        case 3:
            result = 'April'
            break;
        case 4:
            result = 'May'
            break;
        case 5:
            result = 'June'
            break;
        case 6:
            result = 'July'
            break;
        case 7:
            result = 'August'
            break;
        case 8:
            result = 'September'
            break;
        case 9:
            result = 'October'
            break;
        case 10:
            result = 'November'
            break;
        default:
            result = 'December'
            break;
    }
    return result;
}
// Moon Phase to Image Link
function getPhase() {
    switch (moonPhase) {
        case "New Moon":
            result = `<img src="images/lunar/new-moon.png"</img>`
            break;
        case "Waxing Crescent":
            result = `<img src="images/lunar/wax-cresc.png"</img>`
            break;
        case "First Quarter":
            result = `<img src="images/lunar/first-qtr.png"</img>`
            break;
        case "Waxing Gibbous":
            result = `<img src="images/lunar/wax-gib.png"</img>`
            break;
        case "Full Moon":
            result = `<img src="images/lunar/full-moon.png"</img>`
            break;
        case "Waning Gibbous":
            result = `<img src="images/lunar/wan-gib.png"</img>`
            break;
        case "Last Quarter":
            result = `<img src="images/lunar/last-qtr.png"</img>`
            break;
        default:
            result = `<img src="images/lunar/wan-cresc.png"</img>`
            break;
    }
    return result;
}

function getSignImg() {
    switch (sunsign) {
        case 'aries':
            result = `<img src="images/sign/aries.png"</img>`
            break;
        case 'aquarius':
            result = `<img src="images/sign/aquarius.png"</img>`
            break;
        case 'cancer':
            result = `<img src="images/sign/cancer.png"</img>`
            break;
        case 'capricorn':
            result = `<img src="images/sign/capricorn.png"</img>`
            break;
        case 'gemini':
            result = `<img src="images/sign/gemini.png"</img>`
            break;
        case 'leo':
            result = `<img src="images/sign/leo.png"</img>`
            break;
        case 'libra':
            result = `<img src="images/sign/libra.png"</img>`
            break;
        case 'pisces':
            result = `<img src="images/sign/pisces.png"</img>`
            break;
        case 'sagittarius':
            result = `<img src="images/sign/sagittarius.png"</img>`
            break;
        case 'scorpio':
            result = `<img src="images/sign/scorpio.png"</img>`
            break;
        case 'taurus':
            result = `<img src="images/sign/taurus.png"</img>`
            break;
        default:
            result = `<img src="images/sign/virgo.png"</img>`
            break;
    }
    return result;
}


function selectBackground() {
    let idNum = weatherID.toString()
    // Drizzle
    if (idNum[0] === '3') {
        if (idNum === '300' || idNum === '301' || idNum === '302' || idNum === '310') {
            $('html').removeClass('landing').addClass('drizzle-light');
        } else {
            $('html').removeClass('landing').addClass('drizzle-rain');
        }
    }
    // Rain
    if (idNum[0] === '5') {
        if (idNum === '500') {
            $('html').removeClass('landing').addClass('rain-light');
        } else if (idNum === '501') {
            $('html').removeClass('landing').addClass('rain-moderate');
        } else {
            $('html').removeClass('landing').addClass('rain-shower');
        }
    }
    // Rain
    if (idNum[0] === '5') {
        if (idNum === '500') {
            $('html').removeClass('landing').addClass('rain-light');
        } else if (idNum === '501') {
            $('html').removeClass('landing').addClass('rain-moderate');
        } else {
            $('html').removeClass('landing').addClass('rain-shower');
        }
    }

}


// Is it best to have all of my ajax calls under one of these?
$('.user-search').submit('click', function(e) {
    e.preventDefault();
    $('#input-section').addClass('section-visible-toggle');
    $('#content-section').removeClass('section-visible-toggle');
})

////////////////////////////////////////////////////
// Forismatic - Quote Generator --- WORKING
////////////////////////////////////////////////////
$.ajax({
    url: 'http://galvanize-cors-proxy.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
    method: 'GET'
}).then(function(result) {
    let quoteTxt = result.quoteText;
    let quoteAuth = result.quoteAuthor;
    $('.insp-quote-block').append(`<h3>"${quoteTxt}"</h3>`)
    $('.insp-quote-block').append(`<h4>–${quoteAuth}</h4>`)
}).catch(function(error) {
    console.log('Error: ', error);
})


////////////////////////////////////////////////////
// Weather API - OpenWeatherMap --- WORKING
////////////////////////////////////////////////////
$('.user-search').submit('click', function(e) {
    e.preventDefault();
    let value = $('#zip-search').val()
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather\?zip\=${value},us\&units=imperial\&appid\=51e7393da3b7bbeb87a0b2c743c768f9`,
        method: 'GET'
    }).then(function(result) {
        // Weather Variables
        let weatherTemp = Math.round(result.main.temp);
        let weatherTempMin = Math.round(result.main.temp_min);
        let weatherTempMax = Math.round(result.main.temp_max);
        let weatherDescription = result.weather[0].description;
        weatherID = result.weather[0].id;
        let weatherIcon = result.weather[0].icon;
        let weatherSunrise = result.sys.sunrise;
        let weatherSunset = result.sys.sunset;
        // Time Variables
        let timestampRise = new Date(`${weatherSunrise}` * 1000);
        let timestampSet = new Date(`${weatherSunset}` * 1000);
        getDay = timestampRise.getDay();
        getMonth = timestampRise.getMonth();
        getDate = timestampRise.getDate();
        getYear = timestampRise.getFullYear();
        let getHoursRise = timestampRise.getHours();
        let getHoursSet = timestampSet.getHours() - 12;
        let getMinutesRise = timestampRise.getMinutes();
        let getMinutesSet = timestampSet.getMinutes();
        // Date Conversions
        let setDay = convertDay();
        let setMonth = convertMonth();

        // Append API Results to HTML
        selectBackground();
        // Date
        $('.intro-section').prepend(`<h1>${setMonth} ${getDate}, ${getYear}</h1>`)
        $('.intro-section').prepend(`<h1>Welcome to ${setDay}</h1>`)
        // Weather
        $('#w-temp').prepend(`<h5>${weatherTemp}<sup>&#8457;</sup></h5>`)
        $('#w-low').append(`<p>Low: ${weatherTempMin}<sup>&#8457;</sup</p>`)
        $('#w-high').append(`<p>High: ${weatherTempMax}<sup>&#8457;</sup></p>`)
        $('#w-icon').append(`<i class="owf owf-${weatherID} owf-5x">`)
        $('#w-desc').append(`<p>${weatherDescription}</p>`)
        // $('#w-moon').prepend(`<p>moon phase here</p>`)
        $('#w-sunrise').append(`<p>Sunrise: ${getHoursRise}:${getMinutesRise} a.m.</p>`)
        $('#w-sunset').append(`<p>Sunset: ${getHoursSet}:${getMinutesSet} p.m.</p>`)
    }).catch(function(error) {
        console.log('Error: ', error);
    })
})

////////////////////////////////////////////////////
// Moon Phase API -  --- WORKING
////////////////////////////////////////////////////
$('.user-search').submit('click', function(e) {
    e.preventDefault();
    let value = $('#zip-search').val()
    $.ajax({
        url: `http://farmsense-prod.apigee.net/v1/moonphases/\?d\=1489457785`,
        method: 'GET'
    }).then(function(result) {
        moonPhase = JSON.parse(result)[0].Phase;
        console.log(moonPhase);
        let phaseLink = getPhase();
        $('#w-moon').prepend(`${phaseLink}`)
        $('#w-moon').append(`<br>${moonPhase}`)
    }).catch(function(error) {
        console.log('Error: ', error);
    })
})


////////////////////////////////////////////////////
// GIPHY -- Random Gif --- WORKING
////////////////////////////////////////////////////
$('.user-search').submit('click', function(e) {
    e.preventDefault();
    let value = $('#mood-search').val()
    $.ajax({
        url: `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${value}`,
        type: "GET",
        success: function(result1) {
            let gifUrl = result1.data.image_url;
            $('.gif-block').append(`<img src="${gifUrl}" alt="">`)
        }
    });
});

////////////////////////////////////////////////////
// Horiscope API - WORKING
////////////////////////////////////////////////////
$('.user-search').submit('click', function(e) {
    e.preventDefault();
    sunsign = $('#sign-search').val()
    $.ajax({
        url: `http://galvanize-cors-proxy.herokuapp.com/http://theastrologer-api.herokuapp.com/api/horoscope/${sunsign}/today`,
        method: 'GET'
    }).then(function(result) {
        let signLink = getSignImg();
        let horoText = result.horoscope;
        $('#h-sign').append(`<p>${sunsign}<p>`)
        $('#h-text').append(`<p>${horoText}</p>`)
        $('#h-icon').append(`${signLink}`)
    }).catch(function(error) {
        console.log('Error: ', error);
    })
})

////////////////////////////////////////////////////
// REDDIT SCRAPER Showerthoughts -- WORKING
////////////////////////////////////////////////////
$.ajax({
    dataType: "json",
    url: "https://www.reddit.com/r/showerthoughts/.json",
    success: function(result) {
        let current = 0;
        let thought = '';
        let url = result.data.children[0].data.url;
        for (var i = 0; i < result.data.children.length; i++) {
            if (result.data.children[i].data.ups >= current) {
                current = result.data.children[i].data.ups;
                thought = result.data.children[i].data.title;
            }
        }
        $('#r-showerthought').append(`<p>${thought}</p>`)
        $('#r-showerthought').append(`<p>Via <a href="${url}">reddit.com/r/showerthoughts</a></p>`)
    }
});

function randomID() {
  let num = Math.floor((Math.random() * 1000) + 1);
  return num;
}

////////////////////////////////////////////////////
// To-do List
////////////////////////////////////////////////////
$(".todo-enter").submit(function(e) {
    e.preventDefault();
    var value = $('#todo-item').val();
    let randomListID = randomID();
    let deleteButton;

    if (value) {
        $('ul').append(`<li>${value}</li>`).children(this).attr('id', `${randomListID}`);
        // $('ul').append(`<li>${value}    <a href="#">[Delete]</a></li>`);
        $('.empty-list').remove();
        // document.getElementById("todo-item").value = "";
        $('#todo-item').val('');
    }
    $('ul').on('click', 'li', function(e) {
        e.preventDefault();
        if ($(this).children().attr('id') === randomListID)
        $(this).remove();
    })
});
