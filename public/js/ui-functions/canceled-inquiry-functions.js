const canceledInquiries = {
  headerIdBaseName: "canceled-header-base--",
  collapseIdBaseName: "canceled-collapse-base--",
  dateTimeIdBaseName: "canceled-date-time-base--",
  inquiryArray: [],
  inquiryDisplayHolder: document.querySelector("#inquiry-accordion-holder--canceled"),
  inquiryDisplayTemplate: document.querySelector("#canceled-inquiry-template"),
  startFunctions: () => {
    requestTypeProcessor.getCanceledRequests(data => {
      canceledInquiries.inquiryArray = data
      console.log(canceledInquiries.inquiryArray)
      canceledInquiries.populateInquiries()
      document
        .querySelector("body")
        .addEventListener("click", canceledInquiries.initialDeleteButtonFunction)
      document
        .querySelector("body")
        .addEventListener("click", canceledInquiries.finalDeleteButtonFunction)
    })
  },
  resetDisplay: () => {
    canceledInquiries.inquiryDisplayHolder.innerHTML = ""
    requestTypeProcessor.getCanceledRequests(data => {
      canceledInquiries.inquiryArray = data
      canceledInquiries.populateInquiries()
    })
  },
  createInquiryDisplayFromTemplate: (_inquiry, _index) => {
    const item = canceledInquiries.inquiryDisplayTemplate.content.cloneNode(true)
    // ID/target changing elements
    let accordionHeader = item.querySelector(".accordion-header")
    let accordionButton = item.querySelector(".accordion-button")
    let accordionCollapse = item.querySelector(".accordion-collapse")

    // data setting elements
    let className = item.querySelector(".display-canceled--class")
    let dateSent = item.querySelector(".display-canceled--Date")
    let firstName = item.querySelector(".display-canceled--f-name")
    let lastName = item.querySelector(".display-canceled--l-name")
    let email = item.querySelector(".display-canceled--email")
    let phoneNumber = item.querySelector(".display-canceled--phone")
    let phoneType = item.querySelector(".display-canceled--phone-type")
    let participants = item.querySelector(".display-canceled--participants")
    let classType = item.querySelector(".display-canceled--class-type")
    let ageGroup = item.querySelector(".display-canceled--age")
    let location = item.querySelector(".display-canceled--location")
    let locationAddress = item.querySelector(".display-canceled--location-address")
    let addressHolder = item.querySelector(".display-canceled--address-holder")
    let gift = item.querySelector(".display-canceled--gift")
    let comments = item.querySelector(".display-canceled--comments")
    let deleteButton = item.querySelector(".display-canceled--delete-button-final")
    // let responseEmailBody = item.querySelector(".display-canceled--response-email")

    // date/time
    let dateHolderTwo = item.querySelector(".display-canceled--date-holder-2")
    let dateHolderThree = item.querySelector(".display-canceled--date-holder-3")
    let dateOne = item.querySelector(".display-canceled--date-1")
    let dateTwo = item.querySelector(".display-canceled--date-2")
    let dateThree = item.querySelector(".display-canceled--date-3")
    let timeOne = item.querySelector(".display-canceled--time-1")
    let timeTwo = item.querySelector(".display-canceled--time-2")
    let timeThree = item.querySelector(".display-canceled--time-3")
    let altHolderOne = item.querySelector(".display-canceled--alt-timezone-holder-1")
    let altHolderTwo = item.querySelector(".display-canceled--alt-timezone-holder-2")
    let altHolderThree = item.querySelector(".display-canceled--alt-timezone-holder-3")
    let localDateOne = item.querySelector(".display-canceled--local-date-1")
    let localDateTwo = item.querySelector(".display-canceled--local-date-2")
    let localDateThree = item.querySelector(".display-canceled--local-date-3")
    let localTimeOne = item.querySelector(".display-canceled--local-time-1")
    let localTimeTwo = item.querySelector(".display-canceled--local-time-2")
    let localTimeThree = item.querySelector(".display-canceled--local-time-3")

    // check if same timezone
    if (_inquiry.timezone == "-05:00") {
      altHolderOne.classList.add("d-none")
      altHolderTwo.classList.add("d-none")
      altHolderThree.classList.add("d-none")
    } else {
      localDateOne.innerHTML = _inquiry.localDate.split("T").shift()
      localTimeOne.innerHTML = _inquiry.localTime
    }

    dateOne.innerHTML = _inquiry.requestedDate.split("T").shift()
    timeOne.innerHTML = _inquiry.requestedTime

    // check alternate dates
    if (_inquiry?.dateTimeFallbackOptions?.secondChoice) {
      dateTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.requestedDate
        .split("T")
        .shift()
      timeTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.requestedTime
      localDateTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.localDate
        .split("T")
        .shift()
      localTimeTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.localTime
    } else {
      dateHolderTwo.classList.add("d-none")
    }
    if (_inquiry?.dateTimeFallbackOptions?.thirdChoice) {
      dateThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.requestedDate
        .split("T")
        .shift()
      timeThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.requestedTime
      localDateThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.localDate
        .split("T")
        .shift()
      localTimeThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.localTime
    } else {
      dateHolderThree.classList.add("d-none")
    }

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
    ageGroup.innerHTML = _inquiry.ageGroup
    location.innerHTML = _inquiry.location.locationType
    if (_inquiry.location.locationType == "Host Venue") {
      locationAddress.innerHTML = _inquiry.location.hostAddress
      addressHolder.classList.remove("d-none")
    }
    gift.innerHTML = _inquiry.giftOption ? "Yes" : "No"
    comments.innerHTML = _inquiry.comments

    // TODO display date it was canceled to on
    // set name of accordion options
    accordionButton.innerHTML = `Canceled on: ${_inquiry.processed.dates.canceled} || Class: ${_inquiry.nameOfRequestedClass}`

    // set ids and attributes for bootstrap accordion functions
    accordionHeader.id = `${canceledInquiries.headerIdBaseName}${_index}`
    accordionCollapse.id = `${canceledInquiries.collapseIdBaseName}${_index}`
    accordionCollapse.setAttribute(
      "aria-labelledby",
      `${canceledInquiries.headerIdBaseName}${_index}`
    )
    accordionCollapse.setAttribute("data-bs-parent", "#inquiry-accordion-holder--canceled")
    accordionButton.setAttribute(
      "aria-controls",
      `${canceledInquiries.collapseIdBaseName}${_index}`
    )
    accordionButton.setAttribute(
      "data-bs-target",
      `#${canceledInquiries.collapseIdBaseName}${_index}`
    )

    deleteButton.setAttribute("data-inquiry-id", _inquiry._id)

    // dateHasBeenChangedInput.id = `${canceledInquiries.dateTimeIdBaseName}${_index}`
    // dateHasBeenChangedLabel.setAttribute("for", `${canceledInquiries.dateTimeIdBaseName}${_index}`)

    // canceledButton.setAttribute("data-index", _index)

    return item
  },
  populateInquiries: () => {
    for (let i = 0; i < canceledInquiries.inquiryArray.length; i++) {
      canceledInquiries.inquiryDisplayHolder.append(
        canceledInquiries.createInquiryDisplayFromTemplate(canceledInquiries.inquiryArray[i], i)
      )
    }
  },

  initialDeleteButtonFunction: e => {
    if (e.target.classList.contains("display-canceled--delete-button-initial")) {
      let mainHolder = e.target.closest(".display-canceled--holder")
      console.log(mainHolder)
      let buttonHolder = mainHolder.querySelector(".display-canceled--delete-confirm")
      console.log(buttonHolder)
      buttonHolder.classList.remove("d-none")
    }
  },
  finalDeleteButtonFunction: e => {
    if (e.target.classList.contains("display-canceled--delete-button-final")) {
      general.showOverlayElement()
      deleteInquiry(e.target.dataset.inquiryId, () => {
        canceledInquiries.resetDisplay()
        general.hideOverlayElement()
      })
    }
  },
}
