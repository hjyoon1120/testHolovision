/**
 * Created by Bitcamp on 2016-01-11.
 */
var express = require('express');
var app = express();
var cors = require("cors");
var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.naver.com";

function getData (url, fn) {
    var blog = [];
    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);
            blog = [];
            // Title 정보 가져오기
            $("ol#realrank > li:not(#lastrank) > a").each(function (i) {
                var json = { };
                blog.push(this.attribs.title);
            });

            fn(blog);
        } else {
            new  Error(err);
        }
    });
}

app.use(cors());


app.get('/top5', function (req, res) {
    getData(url, function(data){
        res.json(data);
        console.log(data);
    });
});


var server = app.listen(3009, function () {
    var host = server.address().address;
    var port = server.address().port;
});
