$(document).on('turbolinks:load', function () {
  function buildHTML(message) {
    var body = message.content ? `${message.content}` : "";
    var image = message.image ? `${ message.image }` : "";
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
        $('.form__submit').prop('disabled', false);　//ここで解除している
      })
  });
})

