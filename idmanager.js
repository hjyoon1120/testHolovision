/**
 * Created by mac on 2015. 12. 15..
 */
var mysql = require('mysql');


var idManager = (function () {

    var connection = mysql.createConnection({
        host     : '14.32.66.127',
        port     : '3308',
        user     : 'user32',
        password : 'user32',
        database : 'ibitu2'
    });

    var list = [];

    var checkid = function(param, callback){
        var sql = "select uid, upw from tbl_user where uid=? and upw =?";
        var values = [param.uid, param.upw];

        console.log('AAAAAAAAA');
        if(!connection){
            connection.connect();
        }

        connection.query(sql, values ,callback);

        if(!connection){
            connection.end();
        }

    };

    var add = function(newData){
        if(checkDuplicate(newData)){
            list.push(newData);
        }
        throw false;
    };

    var checkDuplicate = function (target) {
        //return list.join("-").indexOf(target) >= 0?true:false;
        return false;
    };

    var getList = function () {
        return list;
    }

    return {add:add, getList:getList, checkid:checkid};

})();

//idManager.add("AAAAA");
//idManager.add("BBBBB");
//idManager.add("CCCCC");
//idManager.checkid({userid:'user1', userpw:'user1'}, function (err, rows) {
//    if(err){
//
//    }
//    console.log(rows);
//});

module.exports = idManager;
//console.log(idManager.getList());