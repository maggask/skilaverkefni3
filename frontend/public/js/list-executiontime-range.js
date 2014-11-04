$(document).ready(function(){
    var path = window.location.pathname;
    console.log(path);

    $.get('http://localhost:4000/api/entries/key' + path, function(data) { 
        console.log(data);
    }); 
});
