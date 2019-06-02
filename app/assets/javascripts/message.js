$(document).on('turbolinks:load', function () {
  function buildHTML(message) {
    var body = message.content
    var image = message.image ? `${ message.image }` : "";
    var html =
      `<div class="message" data-id=${message.id}>
         <div class="upper-info">
           <p class="upper-info__text">
             ${message.user_name}
           </p>
           <p class="upper-info__data">
             ${message.date}
           </p>
         </div>
         <p class="message__text">
           ${body}
         </p>
         <img class="lower-message__image" src=${image}>
       </div>`
      return html;
    }
  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('form')[0].reset();
       })
      .fail(function () {
        alert('error');
      })
      .always(function(data){
        $('.form__submit').prop('disabled', false);
      })
  })
  var reloadMessages = function () {
    last_message_id = $('.message:last').data('id');
    function buildHTML(message) {
      var body = message.content
      var image = message.image ? `${ message.image }` : "";
      var html =
        `<div class="message" data-id=${message.id}>
           <div class="upper-info">
             <p class="upper-info__text">
               ${message.user_name}
             </p>
             <p class="upper-info__data">
               ${message.date}
             </p>
           </div>
           <p class="message__text">
             ${body}
           </p>
           <img class="lower-message__image" src=${image}>
         </div>`
        return html;
    }

    current_url = location.href;
    if (current_url.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: 'api/messages',
        type: "GET",
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = '';
        if (messages.length !== 0) {
          messages.forEach(function(message) {
            insertHTML += buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      })
    };
  };
  setInterval(reloadMessages, 5000);
});

