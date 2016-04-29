/**
 * Created by Bitcamp on 2016-01-06.
 */
var express = require('express');
var app = express();

var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.naver.com";
var blog = [];

var fs = require('fs');


/*app.get('/',function(req,res){
    getData(url,function fn (err,res,html){
        console.log("-------------------------------4----------------------------");
        console.log(blog);
        console.log("-------------------------------4----------------------------");
        res.send(blog);
    });
});*/


app.get('/',function(req,res) {
    function getData(url, fn) {
        request(url, function fn(err, res, html) {
            if (!err) {
                var $ = cheerio.load(html);

                var str = "";
                // Title 정보 가져오기
                $("ol#realrank > li:not(#lastrank) > a").each(function (i) {
                    var json = {};
                    //console.log("검색어순위"+" "+[i]+" "+this.attribs.title+" ");
                    str = "검색어순위" + " " + [i] + " " + this.attribs.title + " ";
                    blog.push(str);
                });

                return res.send(blog);
                /*
                 console.log("-------------------------------1----------------------------");
                 console.log(blog);
                 console.log("-------------------------------1----------------------------");      */      //fn(str);
                //alert(blog);
            } else {
                new Error(err);
            }


            console.log("---------------------------3--------------------------------");
            console.log(blog);
            console.log("---------------------------3--------------------------------");
            /*        fs.writeFile('test.txt',blog,'utf8',function(err){
             if(err) throw err;
             console.log('saved');
             });*/
        });
        /* console.log("----------------------------------2-------------------------");
         console.log(blog);
         console.log("-----------------------------------2------------------------");*/
        return fn;
    }
    return getData;
});



var server =app.listen(3003,function(){
    var host= server.address().address;
    var port= server.address().port;

});