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
    connection.query("SELECT uid FROM labdata", function(err,result){
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

// Main function
libraries(function(dummy){
    var LIBRARY = [];
    var SIZE = [];
    var dir = '/wardrobe/RAW-DATA/';
    for(var i=0; i<dummy.lib.length; i++){LIBRARY[i] = dummy.lib[i].uid}
    for (var j=0; j<LIBRARY.length; j++){
	size(dir+LIBRARY[j], function(dummy) {
	    //console.log(dummy.siz + "bytes");
	    SIZE.push(dummy.siz);
	    if(SIZE.length== LIBRARY.length){
		for(var k=0; k<LIBRARY.length; k++){sizeadd(SIZE[k],LIBRARY[k],function(dummy){});}
		connection.end();
		}
	});
    }
});