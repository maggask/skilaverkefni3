$(document).ready(function(){
    
    $.get('http://localhost:4000/api/entries/key/' + method + '/' + from + '/' + to, function(data) { 
        var key = $('.key');
        var title = $('.title');
        var form = $('.form');
        var seen_key = [];
        var i = 0;

        title.append("Execution time and timestamp for: " + data[0].key);
        form.attr('action', '/' + data[0].key + '/fromto');
        for (i = 0; i < data.length; i = i + 1) { 
           key.append('<li>' + '<strong>Time:</strong> ' + data[i].execution_time + ' <strong>Date:</strong> ' + data[i].timestamp + '</li>');
            seen_key.push(data[i].key);
        }

        console.log(data);
    });
});
