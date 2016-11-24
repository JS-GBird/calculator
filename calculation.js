// Declaring all DOM references in an object -> to clean the code!

var elems = {
  makingStaples: document.getElementById("makingStaples"),
  makingHoles: document.getElementById("makingHoles"),
  makingBinding: document.getElementById("makingBinding"),
  amountOfSetsResults: document.getElementById("amountOfSetsResults"),
  amountOfPagesResults: document.getElementById("amountOfPagesResults"),
  binding: document.getElementById("binding"),
  stapling: document.getElementById("stapling"),
  holes: document.getElementById("holes"),
  paperWeight: document.getElementById("paperWeight"),
  bindingResults: document.getElementById("bindingResults"),
  holesResults: document.getElementById("holesResults"),
  staplingResults: document.getElementById("staplingResults"),
  totalAmountOfPagesResults: document.getElementById("totalAmountOfPagesResults"),
  paperWeightResults: document.getElementById("paperWeightResults"),
  bindingMethod: document.getElementById("bindingMethod"),
  staplingMethod: document.getElementById("staplingMethod"),
  holesMethod: document.getElementById("holesMethod"),
  pricePaperWeightResults: document.getElementById("pricePaperWeightResults"),
  blackAndWhite: document.getElementById("blackAndWhite"),
  color: document.getElementById("color"),
  colorResults: document.getElementById("colorResults"),
  totalPricePrints: document.getElementById("totalPricePrints"),
  totalPrice: document.getElementById("totalPrice"),
  pricePerPageResults: document.getElementById("pricePerPageResults"),
  calculation: document.getElementById("calculation"),
  calculate: document.getElementById("calculate"),
  amountOfSetsInput: document.getElementById("amountOfSetsInput"),
  amountOfPagesInput: document.getElementById("amountOfPagesInput"),
  singleSided: document.getElementById("singleSided"),
  doubleSided: document.getElementById("doubleSided"),
  a4Size: document.getElementById("a4"),
  a3Size: document.getElementById("a3"),
  paperSizeResults: document.getElementById("paperSizeResults"),
  buttonReset: document.getElementById("buttonReset"),
  calculatePrice: document.getElementById("calculatePrice")

}

// Hiding calculations from page
toggleVisibility(elems.calculation, true);

// Defining the color prints pricelist
var priceListColor = {
  0: 0.8,
  10: 0.7,
  25: 0.6,
  50: 0.5,
  100: 0.4,
  250: 0.35,
  500: 0.3,
  1000: 0.25,
  2000: 0.2,
  5000: 0.18
}
  // Defining the black and white pricelist
var priceListBlackAndWhite = {
  0: 0.1,
  10: 0.09,
  25: 0.08,
  50: 0.07,
  100: 0.06,
  500: 0.05,
  1000: 0.045,
  5000: 0.04
}

// Defining the pricelist for paperweight
var priceListPaperWeight = {
  0: 0,
  1: 0.05,
  2: 0.1,
  3: 0.15,
  4: 0.2,
  5: 0.25,
  6: 0.3,
  7: 0.35,
  8: 0.4,
  9: 0.3,
  10: 0.5,
  11: 0.7,
  12: 0.9
}

// Defining the pricelist for binding
var priceListBinding = {
  0: 3,
  10: 2.75,
  25: 2.5
}

// Defining the pricelist for stapling
var priceListStaples = {
  0: 0.15,
  100: 0.12,
  250: 0.10,
  500: 0.08
}

// Defining the pricelist for holes
var priceListHoles = {
  0: 0.15,
  100: 0.12,
  250: 0.10,
  500: 0.08
}

// Reseting all values
function fullReset (){
	elems.calculatePrice.reset();
	toggleVisibility(elems.calculation, true);
	elems.makingBinding.style.display = "";
	elems.makingHoles.style.display = "";
	elems.makingStaples.style.display = "";
}


// Getting the value for the amount of pages given in by user
function finalAmountOfPages() {
  var totalAmountOfSets = elems.amountOfSetsInput.value || 0;
  var totalAmountOfPages = elems.amountOfPagesInput.value || 0;

  // Validation process, returns true or false; if true we proceed
  if (validateForm(totalAmountOfSets, totalAmountOfPages)) {
    totalAmountOfPages = parseInt(totalAmountOfPages);
    totalAmountOfSets = parseInt(totalAmountOfSets);

    // Calculating total amount of pages
    var finalPagesAmount = totalAmountOfPages * totalAmountOfSets;

    // Calculating price per page
    var pricePerColorPage = getPricePerPage(priceListColor, finalPagesAmount, 0);
    var pricePerBlackAndWhitePage = getPricePerPage(priceListBlackAndWhite, finalPagesAmount, 0);

    // Calculating price for binding
    var bindingPrice = findPrice(elems.binding, priceListBinding, totalAmountOfSets, 0);

    // Calculating price for paper weight
    var paperWeightPricePerPage = findPaperWeightPrice(paperWeight, 0)

    // Calculation price for stapling and making holes
    var staplePrice = findPrice(elems.stapling, priceListStaples, totalAmountOfSets, 0);
    var holesPrice = findPrice(elems.holes, priceListHoles, totalAmountOfSets, 0);

    // Calling the updateView function
    updateView({
      totalAmountOfSets: totalAmountOfSets,
      totalAmountOfPages: totalAmountOfPages,
      pricePerColorPage: pricePerColorPage,
      pricePerBlackAndWhitePage: pricePerBlackAndWhitePage,
      paperWeightPricePerPage: paperWeightPricePerPage,
      totalPricePaper: (totalAmountOfSets * totalAmountOfPages) * paperWeightPricePerPage,
      totalPricePaperDoubleSided: (totalAmountOfSets * (totalAmountOfPages / 2)) * paperWeightPricePerPage,
      bindingPrice: bindingPrice,
      totalBindingPrice: totalAmountOfSets * bindingPrice,
      totalPriceBlackAndWhitePrinting: (totalAmountOfPages * totalAmountOfSets) * pricePerBlackAndWhitePage,
      totalPriceColorPrinting: (totalAmountOfPages * totalAmountOfSets) * pricePerColorPage,
      startUpCosts: 2.95,
      totalHolesPrice: totalAmountOfSets * holesPrice,
      totalStaplePrice: totalAmountOfSets * staplePrice,
    });
    
    // Calling the function the show the calculation table
    showCalculation();
  }
}

// Function to hide or show elements on the page
function toggleVisibility(selector, hide) {
  var showStyle = hide ? "none" : "";
  selector.style.display = showStyle;
}

// Defining a function to hide specific elements
function toggleSelect(element, select1, select2) {
  return function() {
    if (getValue(element) !== 0) {
      toggleVisibility(select1, true);
      toggleVisibility(select2, true);
    } else {
      toggleVisibility(select1, false);
      toggleVisibility(select2, false);
    }
  }
}

// Function to show the calculation table after pressing the button
function showCalculation() {
  toggleVisibility(elems.calculation, false);
}

// Defining a function to validate all fields
function validateForm(totalAmountOfSets, totalAmountOfPages) {
  elems.amountOfSetsResults.innerHTML = "";
  elems.amountOfPagesResults.innerHTML = "";
  // Validating the input fields
  if (!totalAmountOfPages || isNaN(totalAmountOfPages) || totalAmountOfPages <= 0) {
    elems.amountOfPagesResults.innerHTML = "Controleer uw invoer!";
    return false; //validation not passed
  } else if (!totalAmountOfSets || isNaN(totalAmountOfSets) || totalAmountOfSets <= 0) {
    elems.amountOfSetsResults.innerHTML = "Controleer uw invoer!";
    return false; //validation not passed
  } else {
    return true; //validation passed
  }
}

// Defining a price per page for printing
function getPricePerPage(priceList, finalPagesAmount, initialNumber) {
  var pagePrice = initialNumber;
 	for (var amount in priceList) {
  	if (finalPagesAmount > amount) {
    	pagePrice = priceList[amount]
    }
  }
	return pagePrice;
}

// Get the values from the select elements
function getValue(selector) {
  return parseInt(selector.options[selector.selectedIndex].value);
};

// Get the text from the select elements
function getText(selector) {
  return selector.options[selector.selectedIndex].text;
};

// Get prices for finishing options
function findPrice(options, priceList, totalAmountOfSets, initialNumber) {
  var price = initialNumber;
  if (getValue(options) === 0) {
    return price = 0;
  } else {
    for (var amount in priceList) {
      if (totalAmountOfSets > amount) {
        price = priceList[amount]
      }
    }
  }
  return price;
}

// Get paperweight price
function findPaperWeightPrice(paperWeight, initialNumber) {
  paperWeightPricePerPage = initialNumber;
  for (var amount in priceListPaperWeight) {
    if (getValue(elems.paperWeight) >= amount) {
      paperWeightPricePerPage = priceListPaperWeight[amount]
    }
  }
  return parseFloat(paperWeightPricePerPage);
}

// Get total price
function getTotalPrice (amount) {
	var totalPrice = amount.totalBindingPrice + amount.totalStaplePrice + amount.totalHolesPrice + amount.startUpCosts;
	if (elems.doubleSided.checked && elems.blackAndWhite.checked && elems.a4Size.checked) {
  	totalPrice += amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaperDoubleSided;
  } else if (elems.doubleSided.checked && elems.color.checked && elems.a4Size.checked) {
  	totalPrice += amount.totalPriceColorPrinting + amount.totalPricePaperDoubleSided;
  } else if (elems.singleSided.checked && elems.blackAndWhite.checked && elems.a4Size.checked) {
  	totalPrice += amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaper;
  } else if (elems.singleSided.checked && elems.color.checked && elems.a4Size.checked) {
  	totalPrice += amount.totalPriceColorPrinting + amount.totalPricePaper;
  } else if (elems.doubleSided.checked && elems.blackAndWhite.checked && elems.a3Size.checked) {
  	totalPrice += (amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaperDoubleSided) * 2;
  } else if (elems.doubleSided.checked && elems.color.checked && elems.a3Size.checked) {
  	totalPrice += (amount.totalPriceColorPrinting + amount.totalPricePaperDoubleSided) * 2;
  } else if (elems.singleSided.checked && elems.blackAndWhite.checked && elems.a3Size.checked) {
  	totalPrice += (amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaper) * 2;
  } else {
  	totalPrice += (amount.totalPriceColorPrinting + amount.totalPricePaper) * 2;
  }
  return totalPrice.toFixed(2); 
}

// Update the price
function updateView(amount) {
  elems.bindingResults.innerHTML = "\u20ac " + amount.totalBindingPrice.toFixed(2);
  elems.holesResults.innerHTML = "\u20ac " + amount.totalHolesPrice.toFixed(2);
  elems.staplingResults.innerHTML = "\u20ac " + amount.totalStaplePrice.toFixed(2);
  elems.totalAmountOfPagesResults.innerHTML = amount.totalAmountOfSets * amount.totalAmountOfPages;
  elems.paperWeightResults.innerHTML = getText(elems.paperWeight);
  elems.bindingMethod.innerHTML = getText(elems.binding);
  elems.staplingMethod.innerHTML = getText(elems.stapling);
  elems.holesMethod.innerHTML = getText(elems.holes);
  elems.totalPrice.innerHTML = "\u20ac " + getTotalPrice(amount);
  if (elems.doubleSided.checked && elems.a4Size.checked) {
    elems.pricePaperWeightResults.innerHTML = "\u20ac " + amount.totalPricePaperDoubleSided.toFixed(2);
  } else if (elems.doubleSided.checked && elems.a3Size.checked) {
    elems.pricePaperWeightResults.innerHTML = "\u20ac " + amount.totalPricePaper.toFixed(2);
	} else if (elems.singleSided.checked && elems.a3Size.checked) {
  	elems.pricePaperWeightResults.innerHTML = "\u20ac " + (2 * amount.totalPricePaper).toFixed(2);
  } else {
    elems.pricePaperWeightResults.innerHTML = "\u20ac " + amount.totalPricePaper.toFixed(2);
  }
  // Show Black and White total print price and price per page
  if (elems.blackAndWhite.checked && elems.a4Size.checked) {
    elems.colorResults.innerHTML = "Zwart-Wit"
    elems.paperSizeResults.innerHTML = "A4"
    elems.totalPricePrints.innerHTML = "\u20ac " + amount.totalPriceBlackAndWhitePrinting.toFixed(2);
    elems.pricePerPageResults.innerHTML = "\u20ac " + amount.pricePerBlackAndWhitePage.toFixed(2);
  } else if (elems.blackAndWhite.checked && elems.a3Size.checked) {
  	elems.colorResults.innerHTML = "Zwart-Wit"
    elems.paperSizeResults.innerHTML = "A3"
    elems.totalPricePrints.innerHTML = "\u20ac " + (2 * amount.totalPriceBlackAndWhitePrinting).toFixed(2);
    elems.pricePerPageResults.innerHTML = "\u20ac " + (2 * amount.pricePerBlackAndWhitePage).toFixed(2);
  }
  // OR show the color total print price and price per page
  else if (elems.color.checked && elems.a3Size.checked) {
    elems.colorResults.innerHTML = "Kleur"
    elems.paperSizeResults.innerHTML = "A3"
    elems.totalPricePrints.innerHTML = "\u20ac " + (2 * amount.totalPriceColorPrinting).toFixed(2);
    elems.pricePerPageResults.innerHTML = "\u20ac " + (2 * amount.pricePerColorPage).toFixed(2);
  } else {
    elems.colorResults.innerHTML = "Kleur"
    elems.paperSizeResults.innerHTML = "A4"
    elems.totalPricePrints.innerHTML = "\u20ac " + amount.totalPriceColorPrinting.toFixed(2);
    elems.pricePerPageResults.innerHTML = "\u20ac " + amount.pricePerColorPage.toFixed(2);
  }
}

// Defining an Event Listener with an on click function
elems.calculate.addEventListener("click", finalAmountOfPages);
elems.buttonReset.addEventListener("click", fullReset);

// Defining the onChange Event Listeners to hide or show 'makingHoles', 'makingStaples' and 'makingBinding'
elems.stapling.addEventListener("change", toggleSelect(elems.stapling, elems.makingBinding, elems.makingHoles));
elems.binding.addEventListener("change", toggleSelect(elems.binding, elems.makingStaples, elems.makingHoles));
elems.holes.addEventListener("change", toggleSelect(elems.holes, elems.makingBinding, elems.makingStaples));
