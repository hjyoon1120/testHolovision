/**
 * Created by Bitcamp on 2016-01-07.
 */
var express = require('express');
var app = express();
var cors = require("cors");
var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.naver.com";

function getData(url, fn) {
    var blog = [];

    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);

            // Title 정보 가져오기
            $("ol#realrank > li:not(#lastrank) > a").each(function (i) {
                //blog.push(this.attribs.title);
                if (i < 5) {
                    blog.push(this.attribs.title);
                    console.log(blog);
                }
            });

            //console.log(blog);
            fn(blog);
            //var str = JSON.stringify(blog);
            //console.log(str);
            //blog.contentType();
        } else {
            new Error(err);
        }
    });
}

app.use(cors());

app.get("/top10", function (req, res) {

    console.log("Request handler random was called.");
    getData(url, function (data) {

        console.log(data.length);

        res.json(data);
        //res.jsonp(JSON.stringify({"list":data}));
        //res.send(data);
    });
});

var server = app.listen(3009, function () {
    var host = server.address().address;
    var port = server.address().port;
});
