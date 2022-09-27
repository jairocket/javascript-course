'use strict';

///////////////////////////////////////
/*
synchronous is executed line by line in the order we defined in the execution thread.
Execution thread is part of the execution context that actually executes the code
in computer's cpu.
Each line waits the previous one to be finished to be executed. The problem with that
is long-running operations block code execution.

Asynchronous code is executed after a task that runs in the "background" finishes.
It prevents code blocking because execution doesn't wait for an asynchronous task to
be finished.
*/

// const p = document.querySelector('.p'); //synchronous
// setTimeout(function () {
//   // asynchronous
//   p.textContent = 'My name is Jonas!'; //executed after 5 seconds
// }, 5000);
// p.getElementsByClassName.color = 'red'; //executed before callback function of setTimout

/*
AJAX
Asynchronous JavaScript And XML allows us to communicate with remote web servers in an
asynchronous way. With AJAX calls, we can request data from web servers dynamically.

Client -- request --> Web Server
Client <-- response -- Web Server

The web server usually provides a web API in which we can access through GET, POST 
requests.

API

Application Programming Interface is a piece of software that can be used by another 
piece of software in order to allow applications to talk to each other.

Ex. DOM API or Own Class API

Online API is an application running on server that receives requests for data and 
sends data back as response

We can build our own web APIs, which requires back end development knowledge or
use 3rd party APIs.

XML used to be popular, but now, JSON is widely used

CORS - cross origin resource sharing: without it we can't interact with API's from our
code

https://restcountries.com/v2/

Protocol -> https://
Domain name -> restcountries.com
Resource -> /v2/name/${country}

DNS -> server that provides the actual server adress that matches with the domain name
https://104.27.142.889:443

number after the colon (443) refers to the port number. (Default 443 for HTTPS, 80 for HTTP)

Once the browser has the actual adress of the server, a TCP/IP socket connection is estabilished. TCP/IP
set rules for data traveling through the internet

Then the HTTP request is done

GET /rest/v2/alpha/PT HTTP/1.1  --> start line: contains HTTP method + request target + HTTP version
                       _
Host: www.google.com    |
User-Agent: Mozilla/5.0 |--> HTTP request headers
Accept-Language: en-US _| 

<BODY>  --> Request body (only when sending data to server, e.g. POST request)

the server grabs the data requested and sends a HTTP response

HTTP/1.1 200 ok --> start line: HTTP version + status code + status message
                          _
Date: Fri, 18 Jan 2021     |
Content-Type: text/html    |--> HTTP response headers
Transfer-Encoding: chunked_|

<BODY> --> response body (JSON file, HTML page etc)

index.html is the first to be loaded. then assets are scanned (JS, CSS, images) and for each file
the process is repeated

TCP -> HTTP requests and responses into small packages and send them through many paths across the web
once they get in their destination, TCP reassembles the packages back into the original HTTP request or 
response

IP -> is the protocol that ensures data to find their destination. computers adress

*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//   <article class="country">
//     <img class="country__img" src=${data.flag} />
//       <div class="country__data">
//         <h3 class="country__name">${data.name}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           data.population / 1000000
//         ).toFixed(1)} Mi</p>
//         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//       </div>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('italy');
// getCountryData('switzerland');
// getCountryData('brazil');
// getCountryData('usa');
// getCountryData('portugal');
// getCountryData('italy');
// getCountryData('switzerland');
// getCountryData('brazil');
// getCountryData('usa');

const renderCountry = function (data, className = '') {
  const html = `
    <article class=${className}>
      <img class="country__img" src=${data.flag} />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            data.population / 1000000
          ).toFixed(1)} Mi</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);
//     const neighbour = data.borders?.[0];

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbor('portugal');

const request = fetch('https://restcountries.com/v2/name/portugal');
console.log(request); //promise <pending>

/* 
Promise is an object that is used as placeholder for the future result of an asynchronous operation.
Could be imagine as a container for an asynchronously delivered value or a container for a future value.

We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous
results

Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping
callback hell

Promise lifecycle

Pending: Before the future value is available

Settled: Asynchronous task has finished

Settled and Fullfilled - the result is now available

Settled and Rejected - An error ocurred

We are able to handle these different states in our code

We consume promise when we already have a promise. E.g. promise returned from Fetch API

Sometimes we need to build promises
*/

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`Eita! ${err} :()`);
//       renderError(
//         `Shoots! Something went wrong: ${err.message} :( Try again :)`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) {
        throw new Error('No neighbor found!');
      }
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`Eita! ${err} :()`);
      renderError(
        `Shoots! Something went wrong: ${err.message} :( Try again :)`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
getCountryData('Brasil');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS 
coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) 
(these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates 
to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. 
Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, 
that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received 
about the provided location. Then, using this data, log a messsage like this to the console: 
'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from 
the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture 
(you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?json=1`)
    .then(response => response.json())
    .then(data => {
      if (data.success === false) {
        throw new Error('Oops! Reloaded too fast!!! take it eeeeasy...');
      }
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return data;
    })
    .then(data => getCountryData(data.country))
    .then(data => renderCountry(data))
    .catch(err => console.log(err));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
