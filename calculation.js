$(document).ready(function() {
    

// Declaring all DOM references in an object -> to clean the code!
var elems = {
  makingStaples: $("#makingStaples"),
  makingHoles: $("#makingHoles"),
  makingBinding: $("#makingBinding"),
  amountOfSetsResults: $("#amountOfSetsResults"),
  amountOfPagesResults: $("#amountOfPagesResults"),
  binding: $("#binding"),
  stapling: $("#stapling"),
  holes: $("#holes"),
  paperWeight: $("#paperWeight"),
  bindingResults: $("#bindingResults"),
  holesResults: $("#holesResults"),
  staplingResults: $("#staplingResults"),
  totalAmountOfPagesResults: $("#totalAmountOfPagesResults"),
  paperWeightResults: $("#paperWeightResults"),
  bindingMethod: $("#bindingMethod"),
  staplingMethod: $("#staplingMethod"),
  holesMethod: $("#holesMethod"),
  pricePaperWeightResults: $("#pricePaperWeightResults"),
  blackAndWhite: $("#blackAndWhite"),
  color: $("#color"),
  colorResults: $("#colorResults"),
  totalPricePrints: $("#totalPricePrints"),
  totalPrice: $("#totalPrice"),
  pricePerPageResults: $("#pricePerPageResults"),
  calculation: $("#calculation"),
  calculate: $("#calculate"),
  amountOfSetsInput: $("#amountOfSetsInput"),
  amountOfPagesInput: $("#amountOfPagesInput"),
  singleSided: $("#singleSided"),
  doubleSided: $("#doubleSided"),
  a4Size: $("#a4"),
  a3Size: $("#a3"),
  paperSizeResults: $("#paperSizeResults")
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
  80: 0,
  120: 0.05,
  160: 0.1,
  190: 0.15,
  210: 0.2,
  250: 0.25,
  280: 0.3,
  300: 0.35,
  350: 0.4
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

// Getting the value for the amount of pages given in by user
function finalAmountOfPages() {
  var totalAmountOfSets = elems.amountOfSetsInput.val() || 0;
  var totalAmountOfPages = elems.amountOfPagesInput.val() || 0;

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
  hide ? selector.hide() : selector.show();
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
  elems.amountOfSetsResults.html("");
  elems.amountOfPagesResults.html("");
  // Validating the input fields
  if (!totalAmountOfPages || isNaN(totalAmountOfPages) || totalAmountOfPages <= 0) {
    elems.amountOfPagesResults.html("Controleer uw invoer!");
    return false; //validation not passed
  } else if (!totalAmountOfSets || isNaN(totalAmountOfSets) || totalAmountOfSets <= 0) {
    elems.amountOfSetsResults.html("Controleer uw invoer!");
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
  return parseInt(selector.val());
};

// Get the text from the select elements
function getText(selector) {
  return selector.find("option:selected").text();
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
	if (elems.doubleSided.is(":checked") && elems.blackAndWhite.is(":checked") && elems.a4Size.is(":checked")) {
  	totalPrice += amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaperDoubleSided;
  } else if (elems.doubleSided.is(":checked") && elems.color.is(":checked") && elems.a4Size.is(":checked")) {
  	totalPrice += amount.totalPriceColorPrinting + amount.totalPricePaperDoubleSided;
  } else if (elems.singleSided.is(":checked") && elems.blackAndWhite.is(":checked") && elems.a4Size.is(":checked")) {
  	totalPrice += amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaper;
  } else if (elems.singleSided.is(":checked") && elems.color.is(":checked") && elems.a4Size.is(":checked")) {
  	totalPrice += amount.totalPriceColorPrinting + amount.totalPricePaper;
  } else if (elems.doubleSided.is(":checked") && elems.blackAndWhite.is(":checked") && elems.a3Size.is(":checked")) {
  	totalPrice += (amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaperDoubleSided) * 2;
  } else if (elems.doubleSided.is(":checked") && elems.color.is(":checked") && elems.a3Size.is(":checked")) {
  	totalPrice += (amount.totalPriceColorPrinting + amount.totalPricePaperDoubleSided) * 2;
  } else if (elems.singleSided.is(":checked") && elems.blackAndWhite.is(":checked") && elems.a3Size.is(":checked")) {
  	totalPrice += (amount.totalPriceBlackAndWhitePrinting + amount.totalPricePaper) * 2;
  } else {
  	totalPrice += (amount.totalPriceColorPrinting + amount.totalPricePaper) * 2;
  }
  return totalPrice.toFixed(2); 
}

// Update the price
function updateView(amount) {
  elems.bindingResults.html("\u20ac " + amount.totalBindingPrice.toFixed(2));
  elems.holesResults.html("\u20ac " + amount.totalHolesPrice.toFixed(2));
  elems.staplingResults.html("\u20ac " + amount.totalStaplePrice.toFixed(2));
  elems.totalAmountOfPagesResults.html(amount.totalAmountOfSets * amount.totalAmountOfPages);
  elems.paperWeightResults.html(getText(elems.paperWeight));
  elems.bindingMethod.html(getText(elems.binding));
  elems.staplingMethod.html(getText(elems.stapling));
  elems.holesMethod.html(getText(elems.holes));
  elems.totalPrice.html("\u20ac " + getTotalPrice(amount));
  if (elems.doubleSided.is(":checked") && elems.a4Size.is(":checked")) {
    elems.pricePaperWeightResults.html("\u20ac " + amount.totalPricePaperDoubleSided.toFixed(2));
  } else if (elems.doubleSided.is(":checked") && elems.a3Size.is(":checked")) {
    elems.pricePaperWeightResults.html("\u20ac " + amount.totalPricePaper.toFixed(2));
	} else if (elems.singleSided.is(":checked") && elems.a3Size.is(":checked")) {
  	elems.pricePaperWeightResults.html("\u20ac " + (2 * amount.totalPricePaper).toFixed(2));
  } else {
    elems.pricePaperWeightResults.html("\u20ac " + amount.totalPricePaper.toFixed(2));
  }
  // Show Black and White total print price and price per page
  if (elems.blackAndWhite.is(":checked") && elems.a4Size.is(":checked")) {
    elems.colorResults.html("Zwart-Wit");
    elems.paperSizeResults.html("A4");
    elems.totalPricePrints.html("\u20ac " + amount.totalPriceBlackAndWhitePrinting.toFixed(2));
    elems.pricePerPageResults.html("\u20ac " + amount.pricePerBlackAndWhitePage.toFixed(2));
  } else if (elems.blackAndWhite.is(":checked") && elems.a3Size.is(":checked")) {
  	elems.colorResults.html("Zwart-Wit");
    elems.paperSizeResults.html("A3");
    elems.totalPricePrints.html("\u20ac " + (2 * amount.totalPriceBlackAndWhitePrinting).toFixed(2));
    elems.pricePerPageResults.html("\u20ac " + (2 * amount.pricePerBlackAndWhitePage).toFixed(2));
  }
  // OR show the color total print price and price per page
  else if (elems.color.is(":checked") && elems.a3Size.is(":checked")) {
    elems.colorResults.html("Kleur");
    elems.paperSizeResults.html("A3");
    elems.totalPricePrints.html("\u20ac " + (2 * amount.totalPriceColorPrinting).toFixed(2));
    elems.pricePerPageResults.html("\u20ac " + (2 * amount.pricePerColorPage).toFixed(2));
  } else {
    elems.colorResults.html("Kleur");
    elems.paperSizeResults.html("A4");
    elems.totalPricePrints.html("\u20ac " + amount.totalPriceColorPrinting.toFixed(2));
    elems.pricePerPageResults.html("\u20ac " + amount.pricePerColorPage.toFixed(2));
  }
}

// Defining an Event Listener with an on click function
elems.calculate.on("click", finalAmountOfPages);

// Defining the onChange Event Listeners to hide or show 'makingHoles', 'makingStaples' and 'makingBinding'
elems.stapling.on("change", toggleSelect(elems.stapling, elems.makingBinding, elems.makingHoles));
elems.binding.on("change", toggleSelect(elems.binding, elems.makingStaples, elems.makingHoles));
elems.holes.on("change", toggleSelect(elems.holes, elems.makingBinding, elems.makingStaples));

});
