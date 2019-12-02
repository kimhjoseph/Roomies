# Roomies

Roomies is a web platform used by roommates to make living with roommates easier.

Before starting the application, run `npm install` in the backend, frontend, and main directories to install the required dependencies.

To enable integration with PayPal's API, a .env file is required in the main directory with PayPal credentials (PayPalClientID and PayPalClientSecret).

To start the application, run `npm start`.

To generate the JSDoc documentation simply navigate to the backend/routes directory and run npm install -g jsdoc. Then you can generate documentation for any file using jsdoc <file_name> <additional file names separated by a single space>. This will produce a folder named out in the routes directory with the HTML files containing the generated documentation.
