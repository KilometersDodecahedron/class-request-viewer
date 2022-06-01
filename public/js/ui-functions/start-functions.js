getAllInquiries(data => {
  console.log(data)
})

requestTypeProcessor.startFunctions()
newInquiries.startFunctions()

getInquiriesByProperty({ "location.locationType": "Virtual" }, data => {
  console.log(data)
})
