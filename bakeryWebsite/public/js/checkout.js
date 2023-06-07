document.addEventListener("DOMContentLoaded", function () {
  // Get the current date
  var today = new Date();

  // Set the minimum selectable date to tomorrow
  var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  var minDate = tomorrow.toISOString().split("T")[0];
  document.getElementById("toDate").setAttribute("min", minDate);
  // Add event listeners to the date picker
  var datepicker = document.getElementById("toDate");

  // Disable all Saturdays in the date picker
  datepicker.addEventListener("input", function () {
    var selectedDate = new Date(this.value);
    if (selectedDate.getDay() === 6) {
      alert("החנות סגורה בימי שבת, יש לבחור תהריך מבוקש אחר");
      this.value = "";
    }
  });

  const pickupDelivery = document.getElementById("pickupDelivery");
  const addressInputsContainer = document.getElementById(
    "addressInputsContainer"
  );

  pickupDelivery.addEventListener("change", function () {
    // Remove any existing address inputs
    addressInputsContainer.innerHTML = "";

    if (pickupDelivery.value === "pickup") {
      //   // Create the container for the address inputs
      //   const addressInputsContainer = document.createElement("div");
      //   addressInputsContainer.classList.add("form-row");

      // Create the street input group
      const streetInputGroup = document.createElement("div");
      streetInputGroup.classList.add("form-group", "col-md-6");
      const streetLabel = document.createElement("label");
      streetLabel.innerText = "כתובת חנות:";
      streetLabel.setAttribute("for", "pickupStreet");
      streetInputGroup.appendChild(streetLabel);
      const streetInput = document.createElement("input");
      streetInput.type = "text";
      streetInput.name = "pickupStreet";
      streetInput.value = "הלהב";
      streetInput.readOnly = true;
      streetInput.classList.add("form-control");
      streetInputGroup.appendChild(streetInput);

      // Create the building number input group
      const buildingInputGroup = document.createElement("div");
      buildingInputGroup.classList.add("form-group", "col-md-6");
      const buildingLabel = document.createElement("label");
      buildingLabel.innerText = "מספר בית:";
      buildingLabel.setAttribute("for", "pickupBuilding");
      buildingInputGroup.appendChild(buildingLabel);
      const buildingInput = document.createElement("input");
      buildingInput.type = "text";
      buildingInput.name = "pickupBuilding";
      buildingInput.value = "13";
      buildingInput.readOnly = true;
      buildingInput.classList.add("form-control");
      buildingInputGroup.appendChild(buildingInput);

      // Create the city input group
      const cityInputGroup = document.createElement("div");
      cityInputGroup.classList.add("form-group", "col-md-6");
      const cityLabel = document.createElement("label");
      cityLabel.innerText = "עיר:";
      cityLabel.setAttribute("for", "pickupCity");
      cityInputGroup.appendChild(cityLabel);
      const cityInput = document.createElement("input");
      cityInput.type = "text";
      cityInput.name = "pickupCity";
      cityInput.value = "חולון";
      cityInput.readOnly = true;
      cityInput.classList.add("form-control");
      cityInputGroup.appendChild(cityInput);

      // Create the floor input group
      const floorInputGroup = document.createElement("div");
      floorInputGroup.classList.add("form-group", "col-md-6");
      const floorLabel = document.createElement("label");
      floorLabel.innerText = "קומה:";
      floorLabel.setAttribute("for", "pickupFloor");
      floorInputGroup.appendChild(floorLabel);
      const floorInput = document.createElement("input");
      floorInput.type = "text";
      floorInput.name = "pickupFloor";
      floorInput.value = "קרקע";
      floorInput.readOnly = true;
      floorInput.classList.add("form-control");
      floorInputGroup.appendChild(floorInput);

      // Create the apartment number input group
      const apartmentInputGroup = document.createElement("div");
      apartmentInputGroup.classList.add("form-group", "col-md-6");
      const apartmentLabel = document.createElement("label");
      apartmentLabel.innerText = "מספר דירה:";
      apartmentLabel.setAttribute("for", "pickupApartment");
      apartmentInputGroup.appendChild(apartmentLabel);
      const apartmentInput = document.createElement("input");
      apartmentInput.type = "text";
      apartmentInput.name = "pickupApartment";
      apartmentInput.value = "אין";
      apartmentInput.readOnly = true;
      apartmentInput.classList.add("form-control");
      apartmentInputGroup.appendChild(apartmentInput);

      // Append the input groups to the address container
      addressInputsContainer.appendChild(streetInputGroup);
      addressInputsContainer.appendChild(buildingInputGroup);
      addressInputsContainer.appendChild(cityInputGroup);
      addressInputsContainer.appendChild(floorInputGroup);
      addressInputsContainer.appendChild(apartmentInputGroup);
    } else if (pickupDelivery.value === "delivery") {
      // Create the street input group
      const streetInputGroup = document.createElement("div");
      streetInputGroup.classList.add("form-group", "col-md-6");
      const streetLabel = document.createElement("label");
      streetLabel.innerText = "כתובת:";
      streetLabel.setAttribute("for", "pickupStreet");
      streetInputGroup.appendChild(streetLabel);
      const streetInput = document.createElement("input");
      streetInput.type = "text";
      streetInput.name = "pickupStreet";
      streetInput.classList.add("form-control");
      streetInputGroup.appendChild(streetInput);

      // Create the building number input group
      const buildingInputGroup = document.createElement("div");
      buildingInputGroup.classList.add("form-group", "col-md-6");
      const buildingLabel = document.createElement("label");
      buildingLabel.innerText = "מספר בית:";
      buildingLabel.setAttribute("for", "pickupBuilding");
      buildingInputGroup.appendChild(buildingLabel);
      const buildingInput = document.createElement("input");
      buildingInput.type = "text";
      buildingInput.name = "pickupBuilding";
      buildingInput.classList.add("form-control");
      buildingInputGroup.appendChild(buildingInput);

      // Create the city input group
      const cityInputGroup = document.createElement("div");
      cityInputGroup.classList.add("form-group", "col-md-6");
      const cityLabel = document.createElement("label");
      cityLabel.innerText = "עיר:";
      cityLabel.setAttribute("for", "pickupCity");
      cityInputGroup.appendChild(cityLabel);
      const cityInput = document.createElement("input");
      cityInput.type = "text";
      cityInput.name = "pickupCity";
      cityInput.classList.add("form-control");
      cityInputGroup.appendChild(cityInput);

      // Create the floor input group
      const floorInputGroup = document.createElement("div");
      floorInputGroup.classList.add("form-group", "col-md-6");
      const floorLabel = document.createElement("label");
      floorLabel.innerText = "קומה:";
      floorLabel.setAttribute("for", "pickupFloor");
      floorInputGroup.appendChild(floorLabel);
      const floorInput = document.createElement("input");
      floorInput.type = "text";
      floorInput.name = "pickupFloor";
      floorInput.classList.add("form-control");
      floorInputGroup.appendChild(floorInput);

      // Create the apartment number input group
      const apartmentInputGroup = document.createElement("div");
      apartmentInputGroup.classList.add("form-group", "col-md-6");
      const apartmentLabel = document.createElement("label");
      apartmentLabel.innerText = "מספר דירה:";
      apartmentLabel.setAttribute("for", "pickupApartment");
      apartmentInputGroup.appendChild(apartmentLabel);
      const apartmentInput = document.createElement("input");
      apartmentInput.type = "text";
      apartmentInput.name = "pickupApartment";
      apartmentInput.classList.add("form-control");
      apartmentInputGroup.appendChild(apartmentInput);

      // Append the input groups to the address container
      addressInputsContainer.appendChild(streetInputGroup);
      addressInputsContainer.appendChild(buildingInputGroup);
      addressInputsContainer.appendChild(cityInputGroup);
      addressInputsContainer.appendChild(floorInputGroup);
      addressInputsContainer.appendChild(apartmentInputGroup);
    }
  });
});
