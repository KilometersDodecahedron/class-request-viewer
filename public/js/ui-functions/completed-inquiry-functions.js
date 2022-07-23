// TODO
// finish completed functions
// write This script
const completedInquiries = {
  headerIdBaseName: "completed-header-base--",
  collapseIdBaseName: "completed-collapse-base--",
  dateTimeIdBaseName: "completed-date-time-base--",
  inquiryArray: [],
  inquiryDisplayHolder: document.querySelector("#inquiry-accordion-holder--completed"),
  inquiryDisplayTemplate: document.querySelector("#completed-inquiry-template"),
  accordianButtonNumberDisplay: document
    .querySelector("#request-heading-completed")
    .querySelector("button"),
  startFunctions: () => {
    requestTypeProcessor.getCompletedRequests(data => {
      completedInquiries.inquiryArray = data
      completedInquiries.populateInquiries()
      completedInquiries.accordianButtonNumberDisplay.innerHTML = `Completed Requests (${completedInquiries.inquiryArray.length})`
      document
        .querySelector("body")
        .addEventListener("click", completedInquiries.initialDeleteButtonFunction)
      document
        .querySelector("body")
        .addEventListener("click", completedInquiries.finalDeleteButtonFunction)
    })
  },
  resetDisplay: () => {
    completedInquiries.inquiryDisplayHolder.innerHTML = ""
    requestTypeProcessor.getCompletedRequests(data => {
      completedInquiries.inquiryArray = data
      completedInquiries.populateInquiries()
      completedInquiries.accordianButtonNumberDisplay.innerHTML = `Completed Requests (${completedInquiries.inquiryArray.length})`
    })
  },
  createInquiryDisplayFromTemplate: (_inquiry, _index) => {
    // TODO write REAL function
    const item = completedInquiries.inquiryDisplayTemplate.content.cloneNode(true)
    // ID/target changing elements
    let accordionHeader = item.querySelector(".accordion-header")
    let accordionButton = item.querySelector(".accordion-button")
    let accordionCollapse = item.querySelector(".accordion-collapse")

    // data setting elements
    let className = item.querySelector(".display-completed--class")
    let dateSent = item.querySelector(".display-completed--Date")
    let firstName = item.querySelector(".display-completed--f-name")
    let lastName = item.querySelector(".display-completed--l-name")
    let email = item.querySelector(".display-completed--email")
    let phoneNumber = item.querySelector(".display-completed--phone")
    let phoneType = item.querySelector(".display-completed--phone-type")
    let participants = item.querySelector(".display-completed--participants")
    let classType = item.querySelector(".display-completed--class-type")
    let dateSelected = item.querySelector(".display-completed--date-selected")
    let ageGroup = item.querySelector(".display-completed--age")
    let location = item.querySelector(".display-completed--location")
    let locationAddress = item.querySelector(".display-completed--location-address")
    let gift = item.querySelector(".display-completed--gift")
    let comments = item.querySelector(".display-completed--comments")
    let responseEmailBody = item.querySelector(".display-completed--response-email")
    let deleteButton = item.querySelector(".display-completed--delete-button-final")

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
    ageGroup.innerHTML = _inquiry.ageGroup
    location.innerHTML = _inquiry.location.locationType
    responseEmailBody.innerHTML = _inquiry.processed.responseEmailBody
    if (_inquiry.location.locationType == "Host Venue") {
      locationAddress.innerHTML = _inquiry.location.hostAddress
    }
    gift.innerHTML = _inquiry.giftOption ? "Yes" : "No"
    comments.innerHTML = _inquiry.comments

    // set name of accordion options
    if (!_inquiry.processed.dates.completed) {
      accordionButton.innerHTML = `Sent on: ${_inquiry.date.split("T").shift()} || Class: ${
        _inquiry.nameOfRequestedClass
      }`
    } else {
      accordionButton.innerHTML = `Completed on: ${_inquiry.processed.dates.completed} || Class: ${_inquiry.nameOfRequestedClass}`
    }

    // set ids and attributes for bootstrap accordion functions
    accordionHeader.id = `${completedInquiries.headerIdBaseName}${_index}`
    accordionCollapse.id = `${completedInquiries.collapseIdBaseName}${_index}`
    accordionCollapse.setAttribute(
      "aria-labelledby",
      `${completedInquiries.headerIdBaseName}${_index}`
    )
    accordionCollapse.setAttribute("data-bs-parent", "#inquiry-accordion-holder--completed")
    accordionButton.setAttribute(
      "aria-controls",
      `${completedInquiries.collapseIdBaseName}${_index}`
    )
    accordionButton.setAttribute(
      "data-bs-target",
      `#${completedInquiries.collapseIdBaseName}${_index}`
    )

    deleteButton.setAttribute("data-inquiry-id", _inquiry._id)

    return item
  },
  populateInquiries: () => {
    for (let i = 0; i < completedInquiries.inquiryArray.length; i++) {
      completedInquiries.inquiryDisplayHolder.append(
        completedInquiries.createInquiryDisplayFromTemplate(completedInquiries.inquiryArray[i], i)
      )
    }
  },
  initialDeleteButtonFunction: e => {
    if (e.target.classList.contains("display-completed--delete-button-initial")) {
      let mainHolder = e.target.closest(".display-completed--holder")
      let buttonHolder = mainHolder.querySelector(".display-completed--delete-confirm")
      buttonHolder.classList.remove("d-none")
    }
  },
  finalDeleteButtonFunction: e => {
    if (e.target.classList.contains("display-completed--delete-button-final")) {
      general.showOverlayElement()
      deleteInquiry(e.target.dataset.inquiryId, () => {
        completedInquiries.resetDisplay()
        general.hideOverlayElement()
      })
    }
  },
}
