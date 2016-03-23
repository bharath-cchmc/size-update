var mysql = require ('mysql');
var fs= require('fs');
var getSize = require('get-folder-size');
var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database: "ems",
    port: "3306"

});

// Start mysql connection
connection.connect();

// Retrieving a list of libraries
function libraries(callback){
    var lib = lib;
    connection.query("SELECT uid FROM labdata WHERE deleted = 0;", function(err,result){
	if (err){console.log(err);}
	callback({lib:result});
});
}

// Updating size to  the database
function sizeadd(size, LIBRARY,callback){
    connection.query("UPDATE labdata SET SIZE =? WHERE uid =?", [size, LIBRARY], function(err,result){if(err) throw err})
}

// Retrieveing Size of a library
function size(dir, callback){
    var siz=siz;
    getSize(dir,function(err,size){
	if(err){console.log(err);}
	callback({siz:size});
});
}
var dir = '/wardrobe/RAW-DATA/';
// Main function
libraries(function(dummy){
     for(var i=0; i<dummy.lib.length; i++){
        var _UID = dummy.lib[i].uid;
        if (fs.existsSync(dir+_UID)) {
            function _up(_UID,err,size){
                if(err){console.log(err);}
                connection.query("UPDATE labdata SET SIZE =? WHERE uid =?", [size, _UID])
            }
            var up = _up.bind(undefined,_UID);
            getSize(dir+_UID,up);
        }
    }
});
