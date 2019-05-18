$(document).ready(function() {
  
  var quote;
  var author;
  
  $.getJSON ("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json) {
      quote = json.quoteText.replace(/;/g, ',');
      author = json.quoteAuthor;  
      $( "#quote" ).html(quote);
      if (author !== "") {
        $( "#author" ).html("– " + author);
      }
    })
  .fail(function() { 
    quote = "First actual case of bug being found.";
    author = "– Grace Murray Hopper";
    $( "#quote" ).html(quote);
    $( "#author" ).html(author);
  });
  
  $("#tweetIt").on("click", function() {
    window.open("https://twitter.com/intent/tweet?hashtags=quote&text=" + '"' + quote + '" ' + author);
  }); 
  
  $("#getQuote").on("click", function() {
    $.getJSON ("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json) {
      quote = json.quoteText.replace(/;/g, ',');
      author = json.quoteAuthor;
      $( "#quote" ).html(quote);
      if (author !== "") {
        $( "#author" ).html("– " + author);
      }
    });
  })
  .fail(function() {
    quote = "First actual case of bug being found.";
    author = "– Grace Murray Hopper";
    $( "#quote" ).html(quote);
    $( "#author" ).html(author);
  }); 
  
});