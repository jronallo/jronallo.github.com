jQuery.noConflict();
jQuery(document).ready(function() {

  jQuery('.pin').each(function(index) { 
    var that = this;
    var tags = jQuery(this).data('pin').split(" ");
    var tags_in_url = '';
    jQuery.each(tags, function(index,value){
      tags_in_url = tags_in_url + "/t:" + value;
    });
    url = 'http://feeds.pinboard.in/json/v1/u:jronallo' + tags_in_url + "?cb=?";
    console.log(url);
    jQuery.ajax( { 
      type: "GET",
      url: url,
      dataType: "jsonp",
      success: function(json) {
        var ul = jQuery(document.createElement('ul'));     
        console.log(json);   
        jQuery.each(json, function(index, item){
          var string = '<li><a href="'+ item.u + '">' + item.d + '</a> ' +  item.n + '</li>';
          jQuery(ul).append( string );
        });
        
        $(that).append(ul);
      },
      error: function(x,y,z) {
        console.log(x,y,z);
      }
      
    });
  });
});
