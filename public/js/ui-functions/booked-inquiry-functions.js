const bookedInquiries = {
  headerIdBaseName: "booked-header-base--",
  collapseIdBaseName: "booked-collapse-base--",
  dateTimeIdBaseName: "booked-date-time-base--",
  inquiryArray: [],
  inquiryDisplayHolder: document.querySelector("#inquiry-accordion-holder--booked"),
  inquiryDisplayTemplate: document.querySelector("#booked-inquiry-template"),
  accordianButtonNumberDisplay: document
    .querySelector("#request-heading-booked")
    .querySelector("button"),
  startFunctions: () => {
    requestTypeProcessor.getBookedRequests(data => {
      bookedInquiries.inquiryArray = data
      bookedInquiries.populateInquiries()
      bookedInquiries.accordianButtonNumberDisplay.innerHTML = `Booked Requests (${bookedInquiries.inquiryArray.length})`
      document
        .querySelector("body")
        .addEventListener("click", bookedInquiries.completedButtonFunction)
      document
        .querySelector("body")
        .addEventListener("click", bookedInquiries.canceledButtonFunction)
    })
  },
  resetDisplay: () => {
    bookedInquiries.inquiryDisplayHolder.innerHTML = ""
    requestTypeProcessor.getBookedRequests(data => {
      bookedInquiries.inquiryArray = data
      bookedInquiries.populateInquiries()
      bookedInquiries.accordianButtonNumberDisplay.innerHTML = `Booked Requests (${bookedInquiries.inquiryArray.length})`
    })
  },
  createInquiryDisplayFromTemplate: (_inquiry, _index) => {
    // TODO write REAL function
    const item = bookedInquiries.inquiryDisplayTemplate.content.cloneNode(true)
    // ID/target changing elements
    let accordionHeader = item.querySelector(".accordion-header")
    let accordionButton = item.querySelector(".accordion-button")
    let accordionCollapse = item.querySelector(".accordion-collapse")
    // let dateHasBeenChangedInput = item.querySelector("#display-booked--checkbox-label--SET")
    // let dateHasBeenChangedLabel = item.querySelector(".display-booked--change-date-label")

    // data setting elements
    let className = item.querySelector(".display-booked--class")
    let dateSent = item.querySelector(".display-booked--Date")
    let firstName = item.querySelector(".display-booked--f-name")
    let lastName = item.querySelector(".display-booked--l-name")
    let email = item.querySelector(".display-booked--email")
    let phoneNumber = item.querySelector(".display-booked--phone")
    let phoneType = item.querySelector(".display-booked--phone-type")
    let participants = item.querySelector(".display-booked--participants")
    let classType = item.querySelector(".display-booked--class-type")
    let dateSelected = item.querySelector(".display-booked--date-selected")
    let ageGroup = item.querySelector(".display-booked--age")
    let location = item.querySelector(".display-booked--location")
    let locationAddress = item.querySelector(".display-booked--location-address")
    let gift = item.querySelector(".display-booked--gift")
    let comments = item.querySelector(".display-booked--comments")
    let responseEmailBody = item.querySelector(".display-booked--response-email")
    let completedButton = item.querySelector(".display-booked--completed-button")
    let canceledButton = item.querySelector(".display-booked--canceled-button")

    // set data
    className.innerHTML = _inquiry.nameOfRequestedClass
    dateSent.innerHTML = _inquiry.date.split("T").shift()
    firstName.innerHTML = _inquiry.firstName
    lastName.innerHTML = _inquiry.lastName
    email.innerHTML = _inquiry.email
    phoneNumber.innerHTML = _inquiry.phoneNumber
    phoneType.innerHTML = _inquiry.phoneNumberType
    participants.innerHTML = _inquiry.participants
    classType.innerHTML = _inquiry.classType
    dateSelected.innerHTML = _inquiry.processed.dateSelected
    responseEmailBody.innerHTML = _inquiry.processed.responseEmailBody
    ageGroup.innerHTML = _inquiry.ageGroup
    location.innerHTML = _inquiry.location.locationType
    if (_inquiry.location.locationType == "Host Venue") {
      locationAddress.innerHTML = _inquiry.location.hostAddress
    }
    gift.innerHTML = _inquiry.giftOption ? "Yes" : "No"
    comments.innerHTML = _inquiry.comments

    // set name of accordion options
    if (!_inquiry.processed.dates.booked) {
      accordionButton.innerHTML = `Recieved: ${_inquiry.date.split("T").shift()} || Class: ${
        _inquiry.nameOfRequestedClass
      }`
    } else {
      accordionButton.innerHTML = `Booked on: ${_inquiry.processed.dates.booked} || Class: ${_inquiry.nameOfRequestedClass}`
    }

    // set ids and attributes for bootstrap accordion functions
    accordionHeader.id = `${bookedInquiries.headerIdBaseName}${_index}`
    accordionCollapse.id = `${bookedInquiries.collapseIdBaseName}${_index}`
    accordionCollapse.setAttribute(
      "aria-labelledby",
      `${bookedInquiries.headerIdBaseName}${_index}`
    )
    accordionCollapse.setAttribute("data-bs-parent", "#inquiry-accordion-holder--booked")
    accordionButton.setAttribute("aria-controls", `${bookedInquiries.collapseIdBaseName}${_index}`)
    accordionButton.setAttribute(
      "data-bs-target",
      `#${bookedInquiries.collapseIdBaseName}${_index}`
    )

    completedButton.setAttribute("data-index", _index)
    canceledButton.setAttribute("data-index", _index)

    return item
  },
  populateInquiries: () => {
    for (let i = 0; i < bookedInquiries.inquiryArray.length; i++) {
      bookedInquiries.inquiryDisplayHolder.append(
        bookedInquiries.createInquiryDisplayFromTemplate(bookedInquiries.inquiryArray[i], i)
      )
    }
  },
  completedButtonFunction: e => {
    if (e.target.classList.contains("display-booked--completed-button")) {
      let inquiryIndex = e.target.dataset.index
      let dbData = { ...bookedInquiries.inquiryArray[inquiryIndex] }
      dbData.processed.status = "Completed"
      dbData.processed.dates.completed = new Date().toLocaleString()

      general.showOverlayElement()
      updateInquiry(dbData, dbData._id, () => {
        bookedInquiries.resetDisplay()
        completedInquiries.resetDisplay()
        general.hideOverlayElement()
      })
    }
  },
  canceledButtonFunction: e => {
    if (e.target.classList.contains("display-booked--canceled-button")) {
      let inquiryIndex = e.target.dataset.index
      let dbData = { ...bookedInquiries.inquiryArray[inquiryIndex] }
      dbData.processed.status = "Canceled"
      dbData.processed.dates.canceled = new Date().toLocaleString()

      general.showOverlayElement()
      updateInquiry(dbData, dbData._id, () => {
        bookedInquiries.resetDisplay()
        canceledInquiries.resetDisplay()
        general.hideOverlayElement()
      })
    }
  },
}
