const testEmail = () => {
  $.ajax({
    type: "GET",
    url: "/api/email/test",
    // context: this,
  })
    .then(data => {
      console.log(data)
      if (_callback) {
        _callback(data)
      }
    })
    .catch(err => console.warn(err))
}
