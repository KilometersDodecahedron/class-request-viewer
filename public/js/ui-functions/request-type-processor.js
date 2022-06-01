const requestTypeProcessor = {
  inquiryTemplate: {
    new: "",
    pending: "",
    booked: "",
    canceled: "",
  },
  startFunctions: () => {
    requestTypeProcessor.inquiryTemplate.new = document.querySelector("#new-inquiry-template")
    requestTypeProcessor.inquiryTemplate.pending = document.querySelector(
      "#pending-inquiry-template"
    )
    requestTypeProcessor.inquiryTemplate.booked = document.querySelector("#booked-inquiry-template")
    requestTypeProcessor.inquiryTemplate.canceled = document.querySelector(
      "#canceled-inquiry-template"
    )
    console.log(requestTypeProcessor.inquiryTemplate)
  },
  getNewRequests: callback => {
    getInquiriesByProperty({ "processed.status": "New" }, callback)
  },
  getPendingRequests: _array => {},
  getBookedRequests: _array => {},
  getCancelledRequests: _array => {},
  getAllRequests: _array => {
    requestTypeProcessor.getNewRequests(_array)
    requestTypeProcessor.getPendingRequests(_array)
    requestTypeProcessor.getBookedRequests(_array)
    requestTypeProcessor.getCancelledRequests(_array)
  },
}
