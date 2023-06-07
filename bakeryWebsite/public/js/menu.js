document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtns = document.querySelectorAll(".addToCart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const productName = event.target
        .closest(".card-body")
        .querySelector(".card-title")
        .textContent.slice(0, -1);
      const checkboxes = event.target
        .closest(".card-body")
        .querySelectorAll('input[type="checkbox"]');
      const maxSelections = event.target
        .closest("form")
        .querySelector("#maxSelections").value;
      let numSelected = 0;
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          numSelected++;
        }
      });
      if (numSelected > maxSelections) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = `יש לבחור לכל היותר ${maxSelections} פריטים`;
        event.target.closest(".card-body").appendChild(errorMessage);
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
        return;
      }
      if (numSelected === 0) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "יש לבחור לפחות אחד מבין הפריטים ברשימה";
        event.target.closest(".card-body").appendChild(errorMessage);
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
        return;
      }
      const confirmAddToCart = confirm(
        `האם להוסיף את ה- ${productName} לעגלת הקניות`
      );
      if (confirmAddToCart) {
        const form = event.target.closest("form");
        form.submit();
      }
    });
  });

  //////////cart//////////

  const showCartButton = document.querySelector(".show-cart-btn");
  const cartModal = document.querySelector(".cart-modal");
  const closeCartButton = document.querySelector(".close-cart-btn");
  const cartItems = document.querySelector(".cart-items");

  // Show cart modal when show cart button is clicked
  showCartButton.addEventListener("click", () => {
    // Get the remove and checkout buttons
    const removeBtn = document.querySelector(".remove-btn");
    const checkoutBtn = document.querySelector(".checkout-btn");

    if (cartItems.querySelector("div > h6").textContent === "העגלה ריקה") {
      // // Get the remove and checkout buttons
      // const removeBtn = document.querySelector(".remove-btn");
      // const checkoutBtn = document.querySelector(".checkout-btn");

      // Hide the buttons
      removeBtn.style.display = "none";
      checkoutBtn.style.display = "none";
    } else {
      // // Get the remove and checkout buttons
      // const removeBtn = document.querySelector(".remove-btn");
      // const checkoutBtn = document.querySelector(".checkout-btn");

      // Show the buttons
      removeBtn.style.display = "block";
      checkoutBtn.style.display = "block";
    }

    cartModal.style.display = "block";
  });

  // Hide cart modal when close cart button is clicked
  closeCartButton.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  // Remove items from cart
  cartItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item-btn")) {
      const cartItem = event.target.closest(".cart-item");
      cartItem.remove();
    }
  });

  ///////////////////

  // Get all dropdown items
  var dropdownItems = document.querySelectorAll(".dropdown-item");

  // Add click event listener to each item
  dropdownItems.forEach(function (item) {
    var checkbox = item.querySelector("input[type='checkbox']");

    item.addEventListener("click", function (e) {
      e.preventDefault();
      var isChecked = checkbox.checked;

      // Toggle the checked state of the checkbox
      checkbox.checked = !isChecked;

      // Add or remove the class from the clicked item
      if (!isChecked) {
        item.classList.add("dropdown-item-clicked");
      } else {
        item.classList.remove("dropdown-item-clicked");
      }

      // Keep the dropdown open
      e.stopPropagation();
    });
  });

  /////////// start max selection

  ///////// end max selection
});
