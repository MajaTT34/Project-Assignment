# Project-Assignment - PRO1001 Frontend Essentials

## Project Description
This project is a responsive sustainable food delivery webshop built with HTML, CSS, and JavaScript. The website connects users with fresh products from local farms in Norway while focusing on sustainability and easy online ordering.

The project includes:

•	A landing page showcasing the service and featured products

•	A product listing page with available products

•	A chatbot powered by the OpenAI API

•	A newsletter sign-up form in the footer

•	Integration with the Google Maps API to display partner farm locations

The website is designed with responsiveness, accessibility, and performance in mind.


## Setup and Installation
1.	Clone the repository: 
git clone https://github.com/MajaTT34/Project-Assignment.git
2.	Open the project folder:
cd project-name
3.	Add your own Google Maps API key in the JavaScript file as described under.
Do not upload your real API key to GitHub!

**Google Maps API**

This project uses the Google Maps Embed API to display the farm location on the products page.

For security reasons, the API key is not included in this repository. A placeholder (`YOUR_API_KEY`) is used instead.

**How to add your API key**
1.	Create a Google Maps API key through Google Cloud Console: https://console.cloud.google.com/

    a.	Sign in with Google

    b.	Create a new project

    c.	Search for: “Maps Embed API”

    d.	Click Enable

    e.	Go to: APIs & Services → Credentials

    f.	Click:

       •	Create Credentials	

       •	API Key

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


**OpenAI API**

This project uses the OpenAI API to power the chatbot on the chat page. Users can ask questions about products and services. The API connection is implemented using JavaScript fetch requests with async/await. Error handling is included through try/catch blocks to display feedback if the API request fails.

For security reasons, the API key is not included in this repository. A placeholder (DIN_OPENAI_API_KEY_HER) is used instead.

**How to add your OpenAI API key**
1.	Create an OpenAI account at:
https://platform.openai.com/
2.	Generate an API key:

  	•	Go to: API Keys

  	•	Click: Create new secret key
4.	Open script.js
5.	Find this code:
const apiKey = "DIN_OPENAI_API_KEY_HER";
6.	Replace the placeholder with your own OpenAI API key

**Important:**
Do not upload your real API key to GitHub.

## **Ethical considerations:**
AI-generated responses may sometimes contain incorrect or misleading information. Because of this, the chatbot is designed to provide short and general answers only. 

The project does not store user conversations or personal data. Users are advised not to share personal or sensitive information in the chatbot.


## **How to run locally**
You can run the project locally by:

•	Opening the index.html file directly in your browser, or

•	Using the VS Code Live Server extension for a better development experience

No backend is included in this project. The application runs entirely in the browser using HTML, CSS, and JavaScript.

## **Technologies Used**
•	HTML5

•	CSS3

•	JavaScript (ES6)

•	OpenAI API

•	Google Maps Embed API

## **Accessibility**
•	Semantic HTML

•	ARIA attributes

•	Keyboard navigation support

•	Responsive design

•	Accessible labels and screen-reader support


## **Known Limitations**
•	The project does not include a backend or database

•	Products and form submissions are static and not permanently stored

•	Google Maps and OpenAI functionality require an internet connection and valid API keys

•	No payment or checkout system is implemented

•	Because this project is frontend-only, the OpenAI API key is exposed in the browser during development. In a production environment, the API requests should be handled through a secure backend server.

## **Future Improvements**
•	Add a shopping cart and checkout functionality

•	Connect the project to a backend and database

•	Add user accounts and login system

•	Improve filtering and search for products

•	Add more accessibility improvements and animations

•	Deploy the project online for public access
