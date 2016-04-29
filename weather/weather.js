/**
 * Show Me The Weather, constructor.
 */
function ShowMeTheWeather(options) {
    this.options = {
        location: options.location || '',
        woeid: options.woeid || '',
        unit: options.unit || 'c',
        success: options.success || function(){},
        error: options.error || function(){}
    };
    this.query = 'select * from weather.forecast where woeid';

    if (this.options.location) {
        this.query += ' in (select woeid from geo.placefinder where text="'+this.options.location+'" and gflags="R" limit 1) and u="'+this.options.unit+'"';
    } else if (this.options.woeid) {
        this.query += '='+this.options.woeid+' and u="'+this.options.unit+'"';
    } else {
        this.options.error({
            message: 'No weather information could be retrieved. Please provide a location.'
        });
    }
}

/**
 * Fetches data using JSONP from the Yahoo! query API.
 */
ShowMeTheWeather.prototype.fetch = function(callback) {
    var script = document.createElement('script'),
        uid = 'smtw' + new Date().getTime(),
        encodedQuery = encodeURIComponent(this.query.toLowerCase());

    ShowMeTheWeather[uid] = function(data) {
        delete ShowMeTheWeather[uid];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = 'http://query.yahooapis.com/v1/public/yql?q='
        + encodedQuery + '&format=json&callback=ShowMeTheWeather.' + uid;
    document.body.appendChild(script);
};

/**
 * Get weather information.
 */
ShowMeTheWeather.prototype.now = function() {
    var instance = this;
    this.fetch(function(data) {
        if (data !== null || data.query !== null || data.query.results !== null || data.query.results.channel.description !== 'Yahoo! Weather Error') {
            var result = data.query.results.channel,
                weather = {};

            // I´ve choosen to expose only the data needed.
            // There´s a lot of more data to play with here =)
            weather.temp = result.item.condition.temp;
            weather.code = result.item.condition.code;
            weather.city = result.location.city;
            weather.units = {
                temp: result.units.temperature,
                distance: result.units.distance,
                pressure: result.units.pressure,
                speed: result.units.speed
            };

            instance.options.success(weather);
        } else {
            this.options.error({
                message: 'Error retrieving the latest weather information.'
            });
        }
    });
};

// This is how to use the widget above on your page
var smtw = new ShowMeTheWeather({
    woeid: '1132599',
    success: function(weather) {
        var html = '<h2><i class="icon-'+weather.code+'"></i><br>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
        html += '<p>'+weather.city+'</p>';
        document.getElementById('smtw').innerHTML = html;
    },
    error: function(error) {
        div.innerHTML = '<p>'+error.message+'</p>';
    }
}).now();