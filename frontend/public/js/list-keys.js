$(document).ready(function(){

  $.get('http://10.6.15.24:4000/api/entries/keys', function(data) {


    var keys = $('.keys');

    var seen_key = [];

    var i = 0;
    for (i = 0; i < data.length; i = i +1) {
      if(seen_key.indexOf(data[i].key) == -1) {
        //ke//ys.append($('li').text('nice'));
        keys.append('<li>' + data[i].key + '</li>');
        seen_key.push(data[i].key);
      }
    }

  });

});
