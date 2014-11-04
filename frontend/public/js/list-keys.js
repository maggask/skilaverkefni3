$(document).ready(function(){
    $.get('http://localhost:4000/api/entries/keys', function(data) {
        var keys = $('.keys');
        var seen_key = [];

        var i = 0;
        for (i = 0; i < data.length; i = i + 1) {
            if (seen_key.indexOf(data[i].key) == -1) {
                keys.append('<li>' + '<a href=/' + data[i].key + '>' +  data[i].key + '</a>' + '</li>');
                seen_key.push(data[i].key);
            }
        }
    });
});
