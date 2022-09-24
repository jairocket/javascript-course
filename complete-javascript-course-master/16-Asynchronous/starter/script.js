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

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
  <article class="country">
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
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('italy');
getCountryData('switzerland');
getCountryData('brazil');
getCountryData('usa');
