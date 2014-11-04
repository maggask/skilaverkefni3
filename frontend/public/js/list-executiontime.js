$(document).ready(function(){
    $(".key").click(function() {

        $.get('http://localhost:4000/api/entries/key', function(data) {
            console.log("Hello");
        });
    });
    
});
