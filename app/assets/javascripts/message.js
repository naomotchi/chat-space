$(function(){
  function buildPost(message){
    var image = (message.image != null) ? `<img src="${message.image}">` : "";
    var html = `<div class="main-chat__main-messages" data-id="${message.id}">
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
  });

  var buildMessageHTML = function(message) {
    if (message.text && message.image.url) {
      var html = `<div class="main-chat__main-messages" data-id='${message.id}'>
                    <div class="main-chat__main-messages-user">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__main-messages-data">
                      ${message.created_at}
                    </div>
                    <div class="main-chat__main-messages-coment">
                      <p class="message__text">
                        ${message.text}
                    </p>
                      <img src="${message.image.url}">
                    </div>
                  </div>`
    } else if (message.text) {
      var html = `<div class="main-chat__main-messages" data-id="${message.id}">
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
                    </div>
                  </div>`
    } else if (message.image.url) {
      var html = `<div class="main-chat__main-messages" data-id="${message.id}">
                    <div class="main-chat__main-messages-user">
                      ${message.user_name}
                    </div>
                    <div class="main-chat__main-messages-data">
                      ${message.date}
                    </div>
                    <div class="main-chat__main-messages-coment">
                     <img src="${message.image.url}">
                    </div>
                  </div>`
    };
    return html;
  };
  var reloadMessages = setInterval(function() {
    var last_message_id = $('.main-chat__main-messages:last').data('id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message){
      insertHTML = buildMessageHTML(message);
      $('.main-chat__main-contents').append(insertHTML);
      $('.main-chat__main-contents').animate({
        scrollTop: $('.main-chat__main-contents')[0].scrollHeight
      }, 'fast');
    })
  })
    .fail(function() {
      alert('自動更新できませんでした');
    });
    },5000);
    reloadMessages;
});