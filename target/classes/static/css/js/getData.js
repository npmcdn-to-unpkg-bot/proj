/**
 * Created by 310247318 on 02/08/2016.
 */

$(function () {
    var $text = $('text');
    $.ajax({
        types:"GET",
        url: '/test',
        success: function(text){
            text.append(text);

        }
    })
})
