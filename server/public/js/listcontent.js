$(function process(data)
{
    $getJSON("result.json", process);
    $("#output").append("h2" + "þetta er að virka");
    for(key in data)
    {
        var thiskey = data[key];
        $("#output").append("h2" + key);
    }
});