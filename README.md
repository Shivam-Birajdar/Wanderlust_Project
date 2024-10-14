**Wanderlust: Explore & Review Unique Stays**
WanderLust is a comprehensive web application that allows users to discover, manage, and review travel accommodations. 
Designed with a focus on user experience, this application provides a seamless interface for travelers to browse listings, 
submit reviews, and manage their accounts. 
Leveraging modern web technologies, WanderLust ensures fast performance and responsiveness across devices.

**Features**
User Authentication:

Secure user registration and login functionality powered by Passport.js.
Supports user session management, ensuring that users remain logged in across sessions.
Dynamic Listings:

Users can browse various travel listings that include detailed information such as descriptions, pricing, availability, and images.
Listings can be filtered and searched based on user preferences, making it easy to find suitable accommodations.
Review System:

Users can submit reviews for listings, providing feedback that helps other users make informed decisions.
Reviews include a rating system and comments, enhancing community interaction and trust.
Responsive Design:

Built using EJS for templating and Bootstrap for styling, ensuring the application looks great on all devices, from mobile to desktop.
Session Management:

Utilizes connect-mongo for session storage, allowing for persistent user sessions.
Session cookies are configured for enhanced security, including HTTP-only flags to protect against cross-site scripting attacks.
Flash Messages:

Integrates connect-flash to provide users with immediate feedback on actions such as successful logins, registrations, or error messages.
Error Handling:

Includes custom error handling middleware to gracefully manage and display errors throughout the application.
RESTful API Design:

Implements a RESTful API structure for managing listings and reviews, promoting clean and organized code.
Tech Stack
Backend:

Node.js: Server-side JavaScript runtime environment.
Express.js: Web framework for Node.js, simplifying routing and middleware management.
Mongoose: ODM (Object Data Modeling) library for MongoDB, providing a schema-based solution to model application data.
Database:

MongoDB: NoSQL database for storing user information, listings, and reviews.
Frontend:

EJS (Embedded JavaScript): Templating engine for rendering HTML views.
Bootstrap: CSS framework for responsive design and styling.
HTML/CSS: Core technologies for structuring and styling web pages.
Authentication:

Passport.js: Middleware for authentication, supporting various strategies (local in this case).
Session Management:

express-session: Middleware for session handling.
connect-mongo: MongoDB session store for express-session.
Environment Management:

dotenv: Module to load environment variables from a .env file.
