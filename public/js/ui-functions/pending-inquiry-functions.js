const pendingInquiries = {
  headerIdBaseName: "pending-header-base--",
  collapseIdBaseName: "pending-collapse-base--",
  dateTimeIdBaseName: "pending-date-time-base--",
  inquiryArray: [],
  inquiryDisplayHolder: document.querySelector("#inquiry-accordion-holder--pending"),
  inquiryDisplayTemplate: document.querySelector("#pending-inquiry-template"),
  accordianButtonNumberDisplay: document
    .querySelector("#request-heading-pending")
    .querySelector("button"),
  startFunctions: () => {
    requestTypeProcessor.getPendingRequests(data => {
      pendingInquiries.inquiryArray = data
      pendingInquiries.populateInquiries()
      pendingInquiries.accordianButtonNumberDisplay.innerHTML = `Pending Requests (${pendingInquiries.inquiryArray.length})`
      document
        .querySelector("body")
        .addEventListener("click", pendingInquiries.bookedButtonFunction)
      document
        .querySelector("body")
        .addEventListener("click", pendingInquiries.canceledButtonFunction)
    })
  },

  resetDisplay: () => {
    pendingInquiries.inquiryDisplayHolder.innerHTML = ""
    requestTypeProcessor.getPendingRequests(data => {
      pendingInquiries.inquiryArray = data
      pendingInquiries.populateInquiries()
      pendingInquiries.accordianButtonNumberDisplay.innerHTML = `Pending Requests (${pendingInquiries.inquiryArray.length})`
    })
  },
  createInquiryDisplayFromTemplate: (_inquiry, _index) => {
    // TODO write REAL function
    const item = pendingInquiries.inquiryDisplayTemplate.content.cloneNode(true)
    // ID/target changing elements
    let accordionHeader = item.querySelector(".accordion-header")
    let accordionButton = item.querySelector(".accordion-button")
    let accordionCollapse = item.querySelector(".accordion-collapse")
    let dateHasBeenChangedInput = item.querySelector("#display-pending--checkbox-label--SET")
    let dateHasBeenChangedLabel = item.querySelector(".display-pending--change-date-label")

    // data setting elements
    let className = item.querySelector(".display-pending--class")
    let dateSent = item.querySelector(".display-pending--Date")
    let firstName = item.querySelector(".display-pending--f-name")
    let lastName = item.querySelector(".display-pending--l-name")
    let email = item.querySelector(".display-pending--email")
    let phoneNumber = item.querySelector(".display-pending--phone")
    let phoneType = item.querySelector(".display-pending--phone-type")
    let participants = item.querySelector(".display-pending--participants")
    let classType = item.querySelector(".display-pending--class-type")
    let dateSelected = item.querySelector(".display-pending--date-selected")
    let ageGroup = item.querySelector(".display-pending--age")
    let location = item.querySelector(".display-pending--location")
    let locationAddress = item.querySelector(".display-pending--location-address")
    let addressHolder = item.querySelector(".display-pending--address-holder")
    let gift = item.querySelector(".display-pending--gift")
    let comments = item.querySelector(".display-pending--comments")
    let responseEmailBody = item.querySelector(".display-pending--response-email")
    let bookedButton = item.querySelector(".display-pending--booked-button")
    let canceledButton = item.querySelector(".display-pending--canceled-button")

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
      addressHolder.classList.remove("d-none")
    }
    gift.innerHTML = _inquiry.giftOption ? "Yes" : "No"
    comments.innerHTML = _inquiry.comments

    // TODO display date it was responded to on
    // set name of accordion options
    if (!_inquiry.processed.dates.respondedAndPending) {
      accordionButton.innerHTML = `Sent on: ${_inquiry.date.split("T").shift()} || Class: ${
        _inquiry.nameOfRequestedClass
      }`
    } else {
      accordionButton.innerHTML = `Responded on: ${_inquiry.processed.dates.respondedAndPending} || Class: ${_inquiry.nameOfRequestedClass}`
    }

    // set ids and attributes for bootstrap accordion functions
    accordionHeader.id = `${pendingInquiries.headerIdBaseName}${_index}`
    accordionCollapse.id = `${pendingInquiries.collapseIdBaseName}${_index}`
    accordionCollapse.setAttribute(
      "aria-labelledby",
      `${pendingInquiries.headerIdBaseName}${_index}`
    )
    accordionCollapse.setAttribute("data-bs-parent", "#inquiry-accordion-holder--pending")
    accordionButton.setAttribute("aria-controls", `${pendingInquiries.collapseIdBaseName}${_index}`)
    accordionButton.setAttribute(
      "data-bs-target",
      `#${pendingInquiries.collapseIdBaseName}${_index}`
    )

    dateHasBeenChangedInput.id = `${pendingInquiries.dateTimeIdBaseName}${_index}`
    dateHasBeenChangedLabel.setAttribute("for", `${pendingInquiries.dateTimeIdBaseName}${_index}`)

    bookedButton.setAttribute("data-index", _index)
    canceledButton.setAttribute("data-index", _index)

    return item
  },
  populateInquiries: () => {
    for (let i = 0; i < pendingInquiries.inquiryArray.length; i++) {
      pendingInquiries.inquiryDisplayHolder.append(
        pendingInquiries.createInquiryDisplayFromTemplate(pendingInquiries.inquiryArray[i], i)
      )
    }
  },
  bookedButtonFunction: e => {
    if (e.target.classList.contains("display-pending--booked-button")) {
      let holderElement = e.target.closest(".display-pending--holder")
      let checkbox = holderElement.querySelector(".display-pending--change-date-checkbox")
      let checked = checkbox.checked
      let newDateInput = holderElement.querySelector(".display-pending--change-date-text")
      let inquiryIndex = e.target.dataset.index
      let dbData = { ...pendingInquiries.inquiryArray[inquiryIndex] }
      dbData.processed.status = "Booked"
      dbData.processed.dates.booked = new Date().toLocaleString()
      // prevent uploading an empty date
      if (checked && newDateInput.value === "") return
      if (checked) {
        dbData.processed.dateSelected = newDateInput.value
      }
      general.showOverlayElement()
      updateInquiry(dbData, dbData._id, () => {
        pendingInquiries.resetDisplay()
        bookedInquiries.resetDisplay()
        general.hideOverlayElement()
        // TODO finish creating function
      })
    }
  },
  canceledButtonFunction: e => {
    if (e.target.classList.contains("display-pending--canceled-button")) {
      let inquiryIndex = e.target.dataset.index
      let dbData = { ...pendingInquiries.inquiryArray[inquiryIndex] }
      dbData.processed.status = "Canceled"
      dbData.processed.dates.canceled = new Date().toLocaleString()

      general.showOverlayElement()
      updateInquiry(dbData, dbData._id, () => {
        pendingInquiries.resetDisplay()
        canceledInquiries.resetDisplay()
        general.hideOverlayElement()
        // TODO finish creating function
      })
    }
  },
}
