
# Neighborhood Map

This is a neighborhood map the displays the numerous museums in Chicago, Illinois.
This project is a capstone for the Udacity Front End Developer(FEND) Nanodegree.
The application is a combination of everything that I learn during React, third party API, accessibility and css responsive design principles.

## Demo
![Demo of Map app](mapDemo.gif)

## Technologies 

- [React](https://reactjs.org/)
- [FourSquare](https://foursquare.com)
- [Google API](https://developers.google.com/maps/documentation/)
- [Materialize](https://material-ui.com/)


## File Structure
```
├── README.md           # You are here
├── package-lock.json
├── package.json        #dependencies 
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json   # For possible mobile web apps
└── src
    |__ App.js          # Main App component
    |__ Header.js       # Header component
    |__ SearchBar.js    # Searching component
    |__ SideBar.js      # List component
    ├── index.css                           # App root styling
    ├── index.js                            # App root
    ├── location_data.js                    # Venue data
    └── registerServiceWorker.js            # Default service worker

```

## Installation

In order to install the necessary packages to run
this app in the command line `npm i`

## How to Run App
To run the app in the bash command line type `npm start`.
The app should run in your default browser `localhost:3000`


**Note**: The service worker only runs in the production build. To view the app with service worker:
`npm run build`
`serve -s build`

Service worker should run in your default browser `localhost:5000`


## Resources

I want to give a thank  [youtuber Elharony](https://www.youtube.com/watch?v=W5LhLZqj76s) for his tutorial on rendering Google Maps in React

[Jason Arnold's Article](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5) on the differences between Fetch and Axios

[Stack Overflow](https://stackoverflow.com/questions/48493960/using-google-map-in-react-component)


