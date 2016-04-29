/**
 * Created by Bitcamp on 2016-01-07.
 */
var express = require('express');
var app = express();
var cors = require("cors");
var request = require('request');
var cheerio = require('cheerio');
var url = "http://www.daum.net";

function getData (url, fn ) {
    var blog = [];

    request(url, function (err, res, html) {
        if (!err) {
            var $ = cheerio.load(html);

            // Title 정보 가져오기
            $("div#news> ul.list_imgtxt> li:not(.default_img)> a").each(function (i) {
                //blog.push(this.attribs.title);
                console.log(this.children[0].data);
                blog.push(this.children[0].data);
                /*if (i < 5){
                    blog.push(this);
                    console.log(this);
                }*/
            });

            //console.log(blog);
            fn(blog);
            //var str = JSON.stringify(blog);
            //console.log(str);
            //blog.contentType();
        } else {
            new  Error(err);
        }
    });
}

app.use(cors());

app.get("/news", function (req, res) {

    console.log("Request handler random was called.");
    getData(url, function(dat){

        console.log(dat.length);

        res.json(dat);
        //res.jsonp(JSON.stringify({"list":dat}));
        //res.send(data);
    });
});

var server = app.listen(3008, function () {
    var host = server.address().address;
    var port = server.address().port;
});
