var setCorrectButtonStatus = function(){
  $(".translate").removeClass('btn-primary')
  $(".translate").addClass('btn-secondary')
  $('#'+lang).removeClass('btn-secondary')
  $('#'+lang).addClass('btn-primary')
}

      // Check for localStorage support
      if('localStorage' in window){
         lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
         if(navigator.language.slice(3,5)=='TW')
             lang = 'tw'
         if(lang!="tw"&&lang!="zh"&&lang!="en")
          lang = "en"
      }
      $(function(){
$(document).ready(function() {
    $(".lang").each(function(index, element) {
      if(arrLang[lang][$(this).attr("key")].split('$').length==1)
        $(this).text(arrLang[lang][$(this).attr("key")]);
      else
        $(this).attr(arrLang[lang][$(this).attr("key")].split('$')[0],arrLang[lang][$(this).attr("key")].split('$')[1]);
    });
    setCorrectButtonStatus()
  });
  
  // get/set the selected language
  $(".translate").click(function() {
    lang = $(this).attr("id");
  
    // update localStorage key
    if('localStorage' in window){
      localStorage.setItem('lang', lang);
    }
  
    $(".lang").each(function(index, element) {
      if(arrLang[lang][$(this).attr("key")].split('$').length==1)
        $(this).text(arrLang[lang][$(this).attr("key")]);
      else
        $(this).attr(arrLang[lang][$(this).attr("key")].split('$')[0],arrLang[lang][$(this).attr("key")].split('$')[1]);
    });
    setCorrectButtonStatus()
  });
})