$(document).on('turbolinks:load', function () {
  function buildHTML(message) {
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="upper-info">
            <p class="upper-info__text">
              ${message.user_name}
            </p>
            <p class="upper-info__data">
              ${message.date}
            </p>
          </div>
          <p class="message__text">
            ${message.content}
          </p>
          <img class="lower-message__image" src=${message.image}>    
        </div>`
      return html;
    } else {
      var html =
        `<div class="messsage">
          <div class="message" data-message-id=${message.id}>
             <div class="upper-info">
               <p class="upper-info__text">
                 ${message.user_name}
               </p>
               <p class="upper-info__data">
                 ${message.date}
               </p>
             </div>
             <p class="message__text">
               ${message.content}
             </p>
          </div>
        </div>`
      return html;
      };
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
        $('.form__submit').prop('disabled', false);　//ここで解除している
      })
  });
})
