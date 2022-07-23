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
  },
  getNewRequests: callback => {
    getInquiriesByProperty({ "processed.status": "New" }, callback)
  },
  getPendingRequests: callback => {
    getInquiriesByProperty({ "processed.status": "Pending" }, callback)
  },
  getBookedRequests: callback => {
    getInquiriesByProperty({ "processed.status": "Booked" }, callback)
  },
  getCompletedRequests: callback => {
    getInquiriesByProperty({ "processed.status": "Completed" }, callback)
  },
  getCanceledRequests: callback => {
    getInquiriesByProperty({ "processed.status": "Canceled" }, callback)
  },
  getAllRequests: _array => {
    requestTypeProcessor.getNewRequests(_array)
    requestTypeProcessor.getPendingRequests(_array)
    requestTypeProcessor.getBookedRequests(_array)
    requestTypeProcessor.getCompletedRequests(_array)
    requestTypeProcessor.getCancelledRequests(_array)
  },
}
