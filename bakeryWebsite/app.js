const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const nodemailer = require("nodemailer");
//javascript;
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const app = express();

var orderList = [];

/////////- CONFIG VARS

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const mongooseVar = process.env.MONGOOSEV_VAR;
const mailchimpVar = process.env.MAILCHIMP_VAR;

///// ensure https protocol
app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});
/////
const client = require("twilio")(accountSid, authToken);

/////////
////////- functions

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${year}-${month}-${day}`;
}
function createOrderConfirmationString(
  Fname,
  Lname,
  id,
  phoneNumber,
  email,
  orderDate,
  toDate,
  notes,
  pickupDelivery
) {
  const confirmationString = `תודה רבה על ההזמנה, ${Fname} ${Lname}!\n\nפרטי ההזמנה שלך הם :\nתעודת זהות: ${id}\nמספר פלאפון: ${phoneNumber}\nאימייל: ${email}\nתאריך הזמנה: ${orderDate}\nהזמנה לתאריך: ${toDate}\nהערות: ${notes}\nאיסוף עצמי או משלוח : ${pickupDelivery}\n\nנשלח לך מייל ונתקשר שהזמנתך מוכנה . אם ברצונך לבצע שינויים או ביטולים בזמנה צור איתנו קשר בפרטים הבאים : avivaviv111211@gmail.com or 0528714888\n\nים תודות והמשך שבוע נפלא`;
  return confirmationString;
}

////////
//// mongo db ///

const mongoose = require("mongoose");
const { stringify } = require("querystring");

// Connect to the MongoDB database
mongoose
  .connect(mongooseVar, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Define a schema for the orders collection
const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  products: String,
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  dueDate: Date,
});

// Define a schema for the customers collection
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  discount: Number,
  id: String,
});

// Define a schema for the products collection
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

// Define models for the orders, customers, and products collections
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Product = mongoose.model("Product", productSchema);

////finish mongo db ///
//// insert data to DB ///

const aviv = new Customer({
  firstName: "Aviv",
  lastName: "Ashkenazi",
  phoneNumber: "0528714888",
  email: "avivaviv11211@gmail.com",
  discount: 0,
  id: "315900878",
});

const sweetBox = new Product({
  name: "מארז מתוקים",
  price: 150,
  description: "מארז מתוקים עם מגוון טעמים",
});

const royalBox = new Product({
  name: "מארז מלוכים",
  price: 150,
  description: "מארז מלוכים עם מגוון טעמים",
});

const wrapBox = new Product({
  name: "מארז כריכים",
  price: 150,
  description: "מארז כריכים עם מגוון טעמים",
});

const order = new Order({
  customer: aviv._id,
  products: [sweetBox._id, royalBox._id, wrapBox._id],
  totalPrice: sweetBox.price + royalBox.price + wrapBox.price,
  orderDate: Date.now(),
});

// order.save().then(() => console.log("Order saved"));

/// end insert data ///

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // res.render("list", { currentdate: "today" });
  res.sendFile(__dirname + "/product.html");
});
// app.get("/menu", function (req, res) {
//   res.sendFile(__dirname + "/menu.html");
// });
// app.get("/menu", function (req, res) {
//   // Retrieve the orderList from the query parameter
//   const orderList = JSON.parse(req.query.orderList || "[]");

//   for (let element of orderList) {
//     for (let key in element) {
//       element[key] = element[key].split("").reverse().join("");
//     }
//   }

//   console.log("get ", orderList);

//   // Render the "/menu" page with the orderList passed as a variable to the template engine
//   res.render("menu", { orderList: orderList });
// });
// app.get("/addToCart", function (req, res) {
//   res.render("menu", { orderList: orderList });
// });
app.get("/addToCart", function (req, res) {
  if (orderList.length === 0) {
    res.render("menu", {
      orderList: [
        {
          boxName: "העגלה ריקה",
          boxProducta: ["ניתן לבחור מבין כל המגשים באתר"],
        },
      ],
    });
    // res.render("menu", { orderList: orderList });
  } else {
    res.render("menu", { orderList: orderList });
  }
});
app.get("/Checkout", function (req, res) {
  res.render("Checkout", { orderList: orderList });
});

app.get("/sandwichMenu", function (req, res) {
  res.sendFile(__dirname + "/sandwichMenu.html");
});
app.get("/breadMenu", function (req, res) {
  res.sendFile(__dirname + "/breadMenu.html");
});
app.get("/saladMenu", function (req, res) {
  res.sendFile(__dirname + "/saladMenu.html");
});
app.get("/fokachaMenu", function (req, res) {
  res.sendFile(__dirname + "/fokachaMenu.html");
});
app.get("/shmarimMenu", function (req, res) {
  res.sendFile(__dirname + "/shmarimMenu.html");
});
app.get("/gabrielStory", function (req, res) {
  res.sendFile(__dirname + "/gabrielStory.html");
});
app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/product.html");
});

app.post("/", function (req, res) {
  //
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/43d0f5cc19";

  const options = {
    method: "POST",
    auth: "avivkey:" + mailchimpVar,
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.post("/signup", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

// app.post("/menu", function (req, res) {
//   res.sendFile(__dirname + "/menu.html");
// });
app.post("/sandwichMenu", function (req, res) {
  res.sendFile(__dirname + "/sandwichMenu.html");
});
app.post("/breadMenu", function (req, res) {
  res.sendFile(__dirname + "/breadMenu.html");
});
app.post("/saladMenu", function (req, res) {
  res.sendFile(__dirname + "/saladMenu.html");
});
app.post("/fokachaMenu", function (req, res) {
  res.sendFile(__dirname + "/fokachaMenu.html");
});
app.post("/shmarimMenu", function (req, res) {
  res.sendFile(__dirname + "/shmarimMenu.html");
});
app.post("/gabrielStory", function (req, res) {
  res.sendFile(__dirname + "/gabrielStory.html");
});
app.post("/home", function (req, res) {
  res.sendFile(__dirname + "/product.html");
});
// app.post("/addToCart", function (req, res) {
//   const cartItems = req.body.item;
//   if (typeof cartItems === "undefined") {
//     console.log("first if", req.body);
//     res.redirect("/menu");
//   } else {
//     if (typeof cartItems === "string") {
//       var fixedNames = [cartItems.split("").reverse().join("")];
//     } else {
//       var fixedNames = cartItems.map((name) => {
//         const reversedChars = name.split("").reverse();
//         return reversedChars.join("");
//       });
//     }
//     // const boxName = document.querySelector(".card-title").textContent;
//     const boxName = req.body.boxName;
//     const boxProducta = fixedNames;

//     const order = {
//       boxName: boxName.split("").reverse().join(""),
//       boxProducta: boxProducta,
//     };

//     orderList.push(order);

//     console.log(orderList);
//     res.redirect("/menu");
//   }
// });
app.post("/addToCart", function (req, res) {
  const cartItems = req.body.item;
  const price = req.body.price;
  console.log("this is the body", req.body);
  if (typeof cartItems === "undefined") {
    console.log("first if", req.body);
    res.redirect("/menu");
  } else {
    if (typeof cartItems === "string") {
      // var fixedNames = [cartItems.split("").reverse().join("")];
      var fixedNames = [cartItems];
    } else {
      var fixedNames = cartItems.map((name) => {
        // const reversedChars = name.split("").reverse();
        const reversedChars = name;
        // return reversedChars.join("");
        return reversedChars;
      });
    }
    const boxName = req.body.boxName;
    const boxProducta = fixedNames;

    const order = {
      // boxName: boxName.split("").reverse().join(""),
      boxName: boxName,
      boxProducta: boxProducta,
      price: price,
    };

    orderList.push(order);

    console.log(orderList);

    // Pass the orderList as a variable in the response object when redirecting to the "/menu" page
    // res.redirect("/menu?orderList=" + JSON.stringify(orderList));
    res.render("menu", { orderList: orderList });
  }
});

app.post("/removeFromCart", function (req, res) {
  // Get the item index from the request body
  var itemIndex = req.body.itemIndex;

  // Get the cart from the session
  // var cart = req.session.cart;

  // Remove the item at the specified index
  orderList.splice(itemIndex, 1);

  // Send a success response
  if (orderList.length === 0) {
    res.render("menu", {
      orderList: [
        {
          boxName: "העגלה ריקה",
          boxProducta: ["ניתן לבחור מבין כל המגשים באתר"],
        },
      ],
    });
    // res.render("menu", { orderList: orderList });
  } else {
    res.render("menu", { orderList: orderList });
  }
});

app.post("/submit", function (req, res) {
  // console.log("submit", req.body);
  const Fname = req.body.firstName;
  const Lname = req.body.lastName;
  const id = req.body.idNumber;
  const phoneNumberString = req.body.phoneNumber;
  const email = req.body.email;
  const orderDate = getCurrentDate();
  const toDate = req.body.toDate;
  const notes = req.body.notes;
  const pickupDelivery = req.body.pickupDelivery;
  const pickupStreet = req.body.pickupStreet;
  const pickupBuilding = req.body.pickupBuilding;
  const pickupCity = req.body.pickupCity;
  const pickupFloor = req.body.pickupFloor;
  const pickupApartment = req.body.pickupApartment;

  //// fix phone number
  // Assume phoneNumberString is the string received from user input
  const phoneNumber = phoneNumberString.replace(/[^\d]/g, ""); // Extract digits from the string
  const phoneNumberDigits = phoneNumber.slice(phoneNumber.length - 9); // Get the last 7 digits
  const formattedPhoneNumber = "+972" + phoneNumberDigits; // Add the country code prefix

  //////

  // for (let i = 0; i < orderList.length; i++) {
  //   orderList[i].boxName = orderList[i].boxName.split("").reverse().join(""); // reverse the boxName string

  //   // reverse each item in the boxProducta array
  //   orderList[i].boxProducta = orderList[i].boxProducta
  //     .map((item) => item.split("").reverse().join(""))
  //     .reverse();
  // }

  let totalPrice = 0; // initialize total price variable to 0

  for (let i = 0; i < orderList.length; i++) {
    totalPrice += parseInt(orderList[i].price); // add the price of each box to the total price
  }

  const customer = new Customer({
    firstName: Fname,
    lastName: Lname,
    phoneNumber: formattedPhoneNumber,
    email: email,
    discount: 0,
    id: id,
  });

  const order = new Order({
    customer: customer._id,
    products: JSON.stringify(orderList),
    totalPrice: totalPrice,
    orderDate: Date.now(),
  });

  // console.log("submit", orderList, "to" + Fname + Lname); orderList
  order.save().then(() => console.log("Order saved"));
  customer.save().then(() => console.log("customer saved"));
  /////
  const orderConfirmationString = createOrderConfirmationString(
    Fname,
    Lname,
    id,
    formattedPhoneNumber,
    email,
    orderDate,
    toDate,
    notes,
    pickupDelivery
  );
  const jsonString = orderList
    .map((item) => {
      return `${item.boxName} כולל: ${item.boxProducta.join(", ")} במחיר של ${
        item.price
      } ש"ח.`;
    })
    .join("\n");
  client.messages.create({
    body: orderConfirmationString + "\n" + jsonString,
    from: "whatsapp:+14155238886",
    to: "whatsapp:" + formattedPhoneNumber,
  });
  ///// sand and confirmation email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: "avivaviv11211@gmail.com",
      pass: "bbamvfpqsnhpxksz",
    },
  });

  const mailOptions = {
    from: "avivaviv11211@gmail.com",
    to: "avivaviv11211@gmail.com",
    subject: "אישור הזמנה",
    text: `שלום לקוחות יקרים,

    תודה רבה על הזמנתכם. אנו מאשרים כי הזמנתכם התקבלה ומתבצעת כעת.

    פרטי ההזמנה:

    שם פרטי: ${Fname}
    שם משפחה: ${Lname}
    מספר תעודת זהות: ${id}
    מספר טלפון: ${phoneNumber}
    כתובת אימייל: ${email}
    תאריך הזמנה: ${orderDate}
    תאריך לקוח: ${toDate}
    הערות: ${notes}
    איסוף/משלוח: ${pickupDelivery}
    רשימת הזמנות: ${jsonString}

    תודה רבה על בחירת השירות שלנו.

    כל הכבוד,
    Gabriel Patisserie`,
  };
  const mailOptions2 = {
    from: "avivaviv11211@gmail.com",
    to: email,
    subject: "אישור הזמנה",
    text: `שלום לקוחות יקרים,

    תודה רבה על הזמנתכם. אנו מאשרים כי הזמנתכם התקבלה ומתבצעת כעת.

    פרטי ההזמנה:

    שם פרטי: ${Fname}
    שם משפחה: ${Lname}
    מספר תעודת זהות: ${id}
    מספר טלפון: ${phoneNumber}
    כתובת אימייל: ${email}
    תאריך הזמנה: ${orderDate}
    תאריך לקוח: ${toDate}
    הערות: ${notes}
    איסוף/משלוח: ${pickupDelivery}
    רשימת הזמנות: ${jsonString}

    תודה רבה על בחירת השירות שלנו.

    כל הכבוד,
    Gabriel Patisserie`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  transporter.sendMail(mailOptions2, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent2: " + info.response);
    }
  });
  ////
  const orderDetails = {
    customer: {
      name: Fname + " " + Lname,
      email: email,
      phone: phoneNumber,
    },
    delivery: {
      address: pickupStreet,
      city: pickupBuilding + "," + pickupApartment,
      state: pickupCity,
      zipCode: pickupFloor,
    },
    order: {
      orderDate: orderDate,
      toDate: toDate,
      notes: notes,
      pickupDelivery: pickupDelivery,
      items: orderList,
      total: totalPrice,
    },
  };

  console.log(formattedPhoneNumber);
  orderList = [];
  res.sendFile(__dirname + "/success.html");
  res.render("success", { orderDetails: orderDetails });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("my Server is running on port 3000.");
});

