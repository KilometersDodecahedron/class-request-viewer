const newInquiries = {
  dateIdBaseName: {
    first: "display-new--date-1-radio--",
    second: "display-new--date-2-radio--",
    third: "display-new--date-3-radio--",
    name: "display-new--date-name-group--",
  },
  headerIdBaseName: "new-header-base--",
  collapseIdBaseName: "new-collapse-base",

  inquiryArray: [],
  inquiryDisplayHolder: document.querySelector("#inquiry-accordion-holder--new"),
  inquiryDisplayTemplate: document.querySelector("#new-inquiry-template"),
  startFunctions: () => {
    requestTypeProcessor.getNewRequests(data => {
      newInquiries.inquiryArray = data
      newInquiries.populateInquiries()
    })
  },
  createInquiryDisplayFromTemplate: (_inquiry, _index) => {
    const item = newInquiries.inquiryDisplayTemplate.content.cloneNode(true)
    // ID/target changing elements
    let accordionHeader = item.querySelector(".accordion-header")
    let accordionButton = item.querySelector(".accordion-button")
    let accordionCollapse = item.querySelector(".accordion-collapse")
    let displayDateInputOne = item.querySelector("#display-new--date-1-radio--SET")
    let displayDateInputTwo = item.querySelector("#display-new--date-2-radio--SET")
    let displayDateInputThree = item.querySelector("#display-new--date-3-radio--SET")
    let displayDateLabelOne = item.querySelector(".display-new--date-1-label")
    let displayDateLabelTwo = item.querySelector(".display-new--date-2-label")
    let displayDateLabelThree = item.querySelector(".display-new--date-3-label")

    // data setting elements
    let className = item.querySelector(".display-new--class")
    let dateSent = item.querySelector(".display-new--Date")
    let firstName = item.querySelector(".display-new--f-name")
    let lastName = item.querySelector(".display-new--l-name")
    let email = item.querySelector(".display-new--email")
    let phoneNumber = item.querySelector(".display-new--phone")
    let phoneType = item.querySelector(".display-new--phone-type")
    let participants = item.querySelector(".display-new--participants")
    let classType = item.querySelector(".display-new--class-type")
    let dateOne = item.querySelector(".display-new--date-1")
    let dateTwo = item.querySelector(".display-new--date-2")
    let dateThree = item.querySelector(".display-new--date-3")
    let timeOne = item.querySelector(".display-new--time-1")
    let timeTwo = item.querySelector(".display-new--time-2")
    let timeThree = item.querySelector(".display-new--time-3")
    let altHolderOne = item.querySelector(".display-new--alt-timezone-holder-1")
    let altHolderTwo = item.querySelector(".display-new--alt-timezone-holder-2")
    let altHolderThree = item.querySelector(".display-new--alt-timezone-holder-3")
    let altDateOne = item.querySelector(".display-new--local-date-1")
    let altDateTwo = item.querySelector(".display-new--local-date-2")
    let altDateThree = item.querySelector(".display-new--local-date-3")
    let altTimeOne = item.querySelector(".display-new--local-time-1")
    let altTimeTwo = item.querySelector(".display-new--local-time-2")
    let altTimeThree = item.querySelector(".display-new--local-time-3")
    let dateTimeSecondChoiceHolder = item.querySelector(".display-new--date-2-holder")
    let dateTimeThirdChoiceHolder = item.querySelector(".display-new--date-3-holder")
    let ageGroup = item.querySelector(".display-new--age")
    let location = item.querySelector(".display-new--location")
    let locationAddress = item.querySelector(".display-new--location-address")
    let gift = item.querySelector(".display-new--gift")
    let comments = item.querySelector(".display-new--comments")

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
    dateOne.innerHTML = _inquiry.requestedDate.split("T").shift()
    timeOne.innerHTML = _inquiry.requestedTime
    // check if same timezone
    if (_inquiry.timezone == "-05:00") {
      altHolderOne.classList.add("d-none")
      altHolderTwo.classList.add("d-none")
      altHolderThree.classList.add("d-none")
    } else {
      altDateOne.innerHTML = _inquiry.localDate.split("T").shift()
      altTimeOne.innerHTML = _inquiry.localTime
    }
    // check alternate dates
    if (_inquiry?.dateTimeFallbackOptions?.secondChoice) {
      dateTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.requestedDate
        .split("T")
        .shift()
      timeTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.requestedTime
      altDateTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.localDate
        .split("T")
        .shift()
      altTimeTwo.innerHTML = _inquiry.dateTimeFallbackOptions.secondChoice.localTime
    } else {
      dateTimeSecondChoiceHolder.classList.add("d-none")
    }
    if (_inquiry?.dateTimeFallbackOptions?.thirdChoice) {
      dateThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.requestedDate
        .split("T")
        .shift()
      timeThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.requestedTime
      altDateThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.localDate
        .split("T")
        .shift()
      altTimeThree.innerHTML = _inquiry.dateTimeFallbackOptions.thirdChoice.localTime
    } else {
      dateTimeThirdChoiceHolder.classList.add("d-none")
    }
    ageGroup.innerHTML = _inquiry.ageGroup
    location.innerHTML = _inquiry.location.locationType
    if (_inquiry.location.locationType == "Host Venue") {
      locationAddress.innerHTML = _inquiry.location.hostAddress
    }
    gift.innerHTML = _inquiry.giftOption ? "Yes" : "No"
    comments.innerHTML = _inquiry.comments

    // set name of accordion options
    accordionButton.innerHTML = `Sent on: ${_inquiry.date.split("T").shift()} || Class: ${
      _inquiry.nameOfRequestedClass
    }`

    // set ids and attributes for bootstrap accordion functions
    accordionHeader.id = `${newInquiries.headerIdBaseName}${_index}`
    accordionCollapse.id = `${newInquiries.collapseIdBaseName}${_index}`
    accordionCollapse.setAttribute("aria-labelledby", `${newInquiries.headerIdBaseName}${_index}`)
    accordionCollapse.setAttribute("data-bs-parent", "#inquiry-accordion-holder--new")
    accordionButton.setAttribute("aria-controls", `${newInquiries.collapseIdBaseName}${_index}`)
    accordionButton.setAttribute("data-bs-target", `#${newInquiries.collapseIdBaseName}${_index}`)

    // set ids and attributes for bootstrap radio button functions
    displayDateInputOne.id = `${newInquiries.dateIdBaseName.first}${_index}`
    displayDateInputTwo.id = `${newInquiries.dateIdBaseName.second}${_index}`
    displayDateInputThree.id = `${newInquiries.dateIdBaseName.third}${_index}`
    displayDateInputOne.setAttribute("name", `${newInquiries.dateIdBaseName.name}${_index}`)
    displayDateInputTwo.setAttribute("name", `${newInquiries.dateIdBaseName.name}${_index}`)
    displayDateInputThree.setAttribute("name", `${newInquiries.dateIdBaseName.name}${_index}`)
    displayDateLabelOne.setAttribute("for", `${newInquiries.dateIdBaseName.first}${_index}`)
    displayDateLabelTwo.setAttribute("for", `${newInquiries.dateIdBaseName.second}${_index}`)
    displayDateLabelThree.setAttribute("for", `${newInquiries.dateIdBaseName.third}${_index}`)

    return item
  },
  testTemplate: () => {
    newInquiries.inquiryDisplayHolder.append(
      newInquiries.createInquiryDisplayFromTemplate(newInquiries.inquiryArray[5], 5)
    )
  },
  populateInquiries: () => {
    for (let i = 0; i < newInquiries.inquiryArray.length; i++) {
      newInquiries.inquiryDisplayHolder.append(
        newInquiries.createInquiryDisplayFromTemplate(newInquiries.inquiryArray[i], i)
      )
    }
  },
}
