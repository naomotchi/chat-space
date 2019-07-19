$(function(){
  function buildPost(message){
    var image = (message.image != null) ? `<img src="${message.image}">` : "";
    var html = `<div class="main-chat__main-messages">
                  <div class="main-chat__main-messages-user">
                    ${message.user_name}
                  </div>
                  <div class="main-chat__main-messages-data">
                    ${message.date}
                  </div>
                  <div class="main-chat__main-messages-coment">
                    <p class="message__text">
                      ${message.text}
                    </p>
                      ${image}
                  </div>
                </div>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildPost(message);
      $('.main-chat__main-contents').append(html)
      $('.main-chat__main-contents').animate({
        scrollTop: $('.main-chat__main-contents')[0].scrollHeight
      }, 'fast');
      $('submit-btn').prop('disabl', false);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false);
    })
  })
});