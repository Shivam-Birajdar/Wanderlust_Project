require("dotenv").config(); // Load environment variables
console.log(process.env.CLOUD_API_KEY);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const mongoStore = require("connect-mongo"); // MongoStore for session storage
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Import Models and Routes
const listing = require("./models/listing");
const review = require("./models/reviews.js");
const User = require("./models/user.js");
const listingsRoute = require("./routes/listingsRoute.js");
const reviewRoute = require("./routes/reviewRoute.js");
const userRoute = require("./routes/userRoute.js");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");

// App settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const dbURL = process.env.ATLAS_DB;
// MongoDB Connection

main()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(`Database Connection Error: ${err}`);
  });
async function main() {
  await mongoose.connect(dbURL);
}

// Mongo Store for Session
const store = mongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // Updates the session after 24 hours if no changes
});

store.on("error", (err) => {
  console.log("Error in Mongo session store:", err);
});

// Session Configuration
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Security against XSS attacks
  },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Messages Middleware
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.get(
  "/",
  wrapAsync(async (req, res) => {
    const listingData = await listing.find({});
    res.render("listings/allListings.ejs", { listingData });
  })
);

// User routes
app.use("/", userRoute);

// Listings routes
app.use("/listings", listingsRoute);

// Review routes
app.use("/listings/:id/review", reviewRoute);

// 404 Handler for all other routes
app.all("*", (req, res, next) => {
  next(new expressError(404, "Page not found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

// Start the Server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
