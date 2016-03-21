var getSize= require('get-folder-size');
var mysql = require('mysql');
var fs = require('fs');
var async = require('async');
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "ems",
    port: "3306"
});

connection.connect();
// Function to retrieve the user names in library
function names(callback){
    var result = result;
    connection.query('SELECT distinct(author) FROM labdata', function(err,result){
	if (err){console.log(err);}
    callback({result: result});
});
//connection.end();
}

// create a column
function updation(callback){
    connection.query('ALTER TABLE labdata ADD size integer', function(err, result){if (err){console.log(err);}})
}


// adding size data to table
function sizeadd(size, NAME, LIBRARY, callback){
    connection.query("UPDATE labdata SET size=? WHERE author =? AND uid = ?", [size, NAME, LIBRARY], function(err,result){if(err){console.log(err);}})
}


// Function to retrieve the libraries used by a user
function libraries(input, callback){
    var lib = lib;
    connection.query("SELECT uid FROM labdata WHERE author = '"+input+"'", function(err,result){
	if (err){console.log(err);}
    callback({lib:result;});
});
//connection.end();
}


//Adding a new column to database
//updation(function(dummy){});
//main function
names(function(dummy){
    var NAME = [];
    for (var i=0; i<dummy.result.length; i++){NAME[i] = dummy.result[i].author;}
    for(var j=0; j<NAME.length; j++){libraries(NAME[j],function(dummy){
	var LIBRARY = [];
	for(var l=0; l<dummy.lib.length;l++){LIBRARY[l]=dummy.lib[l].uid;}
		console.log(LIBRARY);
		for(var k=0; k<LIBRARY.length;k++){
			var dir = '/wardrobe/RAW-DATA/'+LIBRARY[k];
			getSize(dir, function(err,size){ console.log(size + ' bytes');
			sizeadd(size, NAME[i],LIBRARY[k],function(dummy){});
			for (var l = 0; l<NAME.length; l++){
			    for (var m=0; m<LIBRARY.length; m++){
				sizeadd(size, NAME[l],LIBRARY[m], function(dummy){});
}}

});
}
//connection.end();
console.log(NAME);
console.log(LIBRARY);
})

};

}

);


// Retriving the libraries of author

//var h='Barski, Artem';
//libraries(h ,function(dummy){
//    var LIBRARY = [];
//    for (var i=0; i<dummy.lib.length;i++){LIBRARY[i] = dummy.lib[i].uid;}
//    console.log(LIBRARY);
//});

// Retriving the size of ONE folder

//var dir='/wardrobe/RAW-DATA/D37E701B-8297-6059-89C3-5F742C1C3322'
//getSize(dir, function(err,size){
//    if (err) throw err;
//    console.log(size + ' bytes');
//});