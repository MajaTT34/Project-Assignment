# Project-Assignment
Final project assignment
README
Final project assignment – PRO1001 Frontend Essentials


## **Project Description**
This project is a responsive sustainable food delivery webshop built with HTML, CSS, and JavaScript. The website connects users with fresh products from local farms in Norway while focusing on sustainability and easy online ordering.

The project includes:

•	A landing page showcasing the service and featured products

•	A product listing page with available products

•	A chatbot for questions

•	A form in the footer to sign up for newsletter

•	Integration with the Google Maps API to display locations and improve user experience

The website is designed with responsiveness, accessibility, and performance in mind, following modern frontend development practices.


## **Setup and Installation**
1.	Clone the repository: 
git clone https://github.com/MajaTT34/Project-Assignment.git
2.	Open the project folder:
cd project-name
3.	Add your own Google Maps API key in the JavaScript file as described under
Do not upload your real API key to GitHub!

Google Maps API
This project uses the Google Maps Embed API to display the farm location on the products page.
o	For security reasons, the API key is not included in this repository. A placeholder (`YOUR_API_KEY`) is used instead.

How to add your API key
1.	Create a Google Maps API key through Google Cloud Console: https://console.cloud.google.com/

    a.	Sign in with Google

    b.	Create a new project

    c.	Search for: “Maps Embed API”

    d.	Click Enable

    e.	Go to: APIs & Services → Credentials

    f.	Click:

        o	Create Credentials	

        o	API Key

2.	Open `products.html`
3.	Find this code:
    <div class="partner-map">
      <iframe
        src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Braastad+Gaard+Norway&zoom=10"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

4.	Replace YOUR_API_KEY with your own Google Maps API Key
5.	Open index.html or products.html in your browser

## **How to run locally**
You can run the project locally by:

•	Opening the index.html file directly in your browser, or

•	Using the VS Code Live Server extension for a better development experience
No additional installations or backend setup are required.

## **Known Limitations**
•	The project does not include a backend or database

•	Products and form submissions are static and not permanently stored

•	Google Maps functionality requires an internet connection and a valid API key

•	No payment or checkout system is implemented

## **Future Improvements**
•	Add a shopping cart and checkout functionality

•	Connect the project to a backend and database

•	Add user accounts and login system

•	Improve filtering and search for products

•	Add more accessibility improvements and animations

•	Deploy the project online for public access
