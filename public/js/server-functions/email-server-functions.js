const emailClient = (_data, _callback) => {
  $.ajax({
    type: "POST",
    url: "/api/email/client",
    dataType: "json",
    data: _data,
  })
    .then(data => {
      console.log(data)
      if (_callback) {
        _callback(data)
      }
    })
    .catch(err => console.warn(err))
}

const emailOwner = (_data, _callback) => {
  $.ajax({
    type: "POST",
    url: "/api/email/owner",
    dataType: "json",
    data: _data,
  })
    .then(data => {
      console.log(data)
      if (_callback) {
        _callback(data)
      }
    })
    .catch(err => console.warn(err))
}

const testEmailRoute = (_data, _callback) => {
  console.log(_data)
  $.ajax({
    type: "POST",
    url: "/api/email/test",
    dataType: "json",
    data: _data,
  })
    .then(data => {
      console.log(data)
      if (_callback) {
        _callback(data)
      }
    })
    .catch(err => console.warn(err))
}
