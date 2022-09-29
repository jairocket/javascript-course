'use strict';

// ///////////////////////////////////////
// /*
// synchronous is executed line by line in the order we defined in the execution thread.
// Execution thread is part of the execution context that actually executes the code
// in computer's cpu.
// Each line waits the previous one to be finished to be executed. The problem with that
// is long-running operations block code execution.

// Asynchronous code is executed after a task that runs in the "background" finishes.
// It prevents code blocking because execution doesn't wait for an asynchronous task to
// be finished.
// */

// // const p = document.querySelector('.p'); //synchronous
// // setTimeout(function () {
// //   // asynchronous
// //   p.textContent = 'My name is Jonas!'; //executed after 5 seconds
// // }, 5000);
// // p.getElementsByClassName.color = 'red'; //executed before callback function of setTimout

// /*
// AJAX
// Asynchronous JavaScript And XML allows us to communicate with remote web servers in an
// asynchronous way. With AJAX calls, we can request data from web servers dynamically.

// Client -- request --> Web Server
// Client <-- response -- Web Server

// The web server usually provides a web API in which we can access through GET, POST
// requests.

// API

// Application Programming Interface is a piece of software that can be used by another
// piece of software in order to allow applications to talk to each other.

// Ex. DOM API or Own Class API

// Online API is an application running on server that receives requests for data and
// sends data back as response

// We can build our own web APIs, which requires back end development knowledge or
// use 3rd party APIs.

// XML used to be popular, but now, JSON is widely used

// CORS - cross origin resource sharing: without it we can't interact with API's from our
// code

// https://restcountries.com/v2/

// Protocol -> https://
// Domain name -> restcountries.com
// Resource -> /v2/name/${country}

// DNS -> server that provides the actual server adress that matches with the domain name
// https://104.27.142.889:443

// number after the colon (443) refers to the port number. (Default 443 for HTTPS, 80 for HTTP)

// Once the browser has the actual adress of the server, a TCP/IP socket connection is estabilished. TCP/IP
// set rules for data traveling through the internet

// Then the HTTP request is done

// GET /rest/v2/alpha/PT HTTP/1.1  --> start line: contains HTTP method + request target + HTTP version
//                        _
// Host: www.google.com    |
// User-Agent: Mozilla/5.0 |--> HTTP request headers
// Accept-Language: en-US _|

// <BODY>  --> Request body (only when sending data to server, e.g. POST request)

// the server grabs the data requested and sends a HTTP response

// HTTP/1.1 200 ok --> start line: HTTP version + status code + status message
//                           _
// Date: Fri, 18 Jan 2021     |
// Content-Type: text/html    |--> HTTP response headers
// Transfer-Encoding: chunked_|

// <BODY> --> response body (JSON file, HTML page etc)

// index.html is the first to be loaded. then assets are scanned (JS, CSS, images) and for each file
// the process is repeated

// TCP -> HTTP requests and responses into small packages and send them through many paths across the web
// once they get in their destination, TCP reassembles the packages back into the original HTTP request or
// response

// IP -> is the protocol that ensures data to find their destination. computers adress

// */

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

// // const getCountryData = function (country) {
// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //   request.send();
// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);
// //     const html = `
// //   <article class="country">
// //     <img class="country__img" src=${data.flag} />
// //       <div class="country__data">
// //         <h3 class="country__name">${data.name}</h3>
// //         <h4 class="country__region">${data.region}</h4>
// //         <p class="country__row"><span>👫</span>${(
// //           data.population / 1000000
// //         ).toFixed(1)} Mi</p>
// //         <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
// //         <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
// //       </div>
// //   `;
// //     countriesContainer.insertAdjacentHTML('beforeend', html);
// //     countriesContainer.style.opacity = 1;
// //   });
// // };

// // getCountryData('portugal');
// // getCountryData('italy');
// // getCountryData('switzerland');
// // getCountryData('brazil');
// // getCountryData('usa');
// // getCountryData('portugal');
// // getCountryData('italy');
// // getCountryData('switzerland');
// // getCountryData('brazil');
// // getCountryData('usa');

const renderCountry = function (data, className = '') {
  console.log(data);
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
  countriesContainer.style.opacity = 1;
  console.log(html);
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  console.log('deu ruim');
  countriesContainer.style.opacity = 1;
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

// // getCountryAndNeighbor('portugal');

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request); //promise <pending>

// /*
// Promise is an object that is used as placeholder for the future result of an asynchronous operation.
// Could be imagine as a container for an asynchronously delivered value or a container for a future value.

// We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous
// results

// Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping
// callback hell

// Promise lifecycle

// Pending: Before the future value is available

// Settled: Asynchronous task has finished

// Settled and Fullfilled - the result is now available

// Settled and Rejected - An error ocurred

// We are able to handle these different states in our code

// We consume promise when we already have a promise. E.g. promise returned from Fetch API

// Sometimes we need to build promises
// */

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
  });
};

// // const getCountryData = function (country) {
// //   fetch(`https://restcountries.com/v2/name/${country}`)
// //     .then(function (response) {
// //       console.log(response);
// //       if (!response.ok) {
// //         throw new Error(`Country not found ${response.status}`);
// //       }
// //       return response.json();
// //     })
// //     .then(function (data) {
// //       console.log(data);
// //       renderCountry(data[0]);
// //       const neighbour = data[0].borders?.[0];

// //       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
// //     })
// //     .then(response => response.json())
// //     .then(data => renderCountry(data, 'neighbour'))
// //     .catch(err => {
// //       console.error(`Eita! ${err} :()`);
// //       renderError(
// //         `Shoots! Something went wrong: ${err.message} :( Try again :)`
// //       );
// //     })
// //     .finally(() => {
// //       countriesContainer.style.opacity = 1;
// //     });
// // };

// const getCountryData = function (country) {
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found!')
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) {
//         throw new Error('No neighbor found!');
//       }
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country not found!'
//       );
//     })
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
// //getCountryData('Brasil');

// ///////////////////////////////////////
// // Coding Challenge #1

// /*
// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS
// coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng)
// (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates
// to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json.
// Use the fetch API and promises to get the data. Do NOT use the getJSON function we created,
// that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you received
// about the provided location. Then, using this data, log a messsage like this to the console:
// 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from
// the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture
// (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀
// */

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude, longitude } = pos.coords;
//       return fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success === false) {
//         throw new Error('Oops! Reloaded too fast!!! take it eeeeasy...');
//       }
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return data;
//     })
//     .then(data => getCountryData(data.country))
//     .then(data => renderCountry(data))
//     .catch(err => console.error(err.message));
// };

// // whereAmI(52.508, 13.381);
// // whereAmI(19.037, 72.873);
// // whereAmI(-33.933, 18.474);

// /*
// Reviewing

// Runtime => container which includes all the pieces necessary to execute JavaScript code
// JS Engine => Runtime part in which code is executed (call stack) and objects are
// stored in memory (heap)
// JavaScript only executes one thread of execution.
// WEB Api +> API provided to the engine
// Callstack queue => ready to be executed callback functions (coming from events)
// Event loop sends callbacks from queue to call stack

// Asynchronous tasks run in the web API environment, that's why it doesn't block call stack.
// Once the asynchronous task is finished and its effect attached to the callback function, it is put on
// the callback queue, that works as a todo list for the call stack. it goes straight to the end of the line.
// Then Event loop checks if call stack is empty. If so, it sends the callback from the asynchronous task
// to the call stack
// Promises are executed on the web API's environment. When the data arrives, it is sent to the
// microtasks queue. It has priority over callback queue.

// */

// console.log('test start'); //1
// setTimeout(() => console.log('0 sec timer'), 0); //4
// Promise.resolve('Resolved promise1').then(res => console.log(res)); //3
// // Promise.resolve('Resolved promise 2').then(res => {
// //   for (let i = 0; i < 100000000; i++) {}
// // });
// console.log('Test end'); //2

// //Create promises
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lottery draw is happening');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN!');
//     } else {
//       reject(new Error('you lost money'));
//     }
//   }, 2000);
// });
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //primisifying setTimout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setInterval(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 seconds'));

// Promise.resolve('abc').then(x => console.log(x)); //resolve promises immediately
// Promise.reject(new Error('xyz')).catch(err => console.error(err)); //reject promises immediately

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// btn.addEventListener('click', whereAmI);

// ///////////////////////////////////////
// // Coding Challenge #2

// /*
// Build the image loading functionality that I just showed you on the screen.

// Tasks are not super-descriptive this time, so that you can figure out some stuff on your own.
// Pretend you're working on your own 😉

// PART 1
// 1. Create a function 'createImage' which receives imgPath as an input. This function
// returns a promise which creates a new image (use document.createElement('img')) and
// sets the .src attribute to the provided image path. When the image is done loading,
// append it to the DOM element with the 'images' class, and resolve the promise.
// The fulfilled value should be the image element itself.
// In case there is an error loading the image ('error' event), reject the promise.

// If this part is too tricky for you, just watch the first part of the solution.
// */
const createImage = function (imgPath) {
  const image = document.createElement('img');
  image.src = imgPath;
  return new Promise((resolve, reject) => {
    resolve(imgContainer.insertAdjacentElement('beforeend', image)),
      err => reject(err.message);
  });
};

/*
PART 2
2. Comsume the promise using .then and also add an error handler;
*/
// createImage('img/img-1.jpg').then(image => {
//   wait(2)
//     .then(() => {
//       image.style.display = 'none';
//       return image;
//     })
//     .then(image => {
//       wait(2)
//         .then(() => {
//           image.src = 'img/img-2.jpg';
//           image.style.display = '';
//           return image;
//         })
//         .then(image => {
//           wait(2).then(() => (image.style.display = 'none'));
//         });
//     })
//     .catch(err => console.error(err));

//   return image;
// });

/*

3. After the image has loaded, pause execution for 2 seconds using the wait function 
we created earlier;

4. After the 2 seconds have passed, hide the current image (set display to 'none'), 
and load a second image (HINT: Use the image element returned by the createImage 
  promise to hide the current image. You will need a global variable for that 😉);

5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  try {
    const pos = await getPosition();
    console.log(pos);
    const { latitude, longitude } = pos.coords;
    const geo = await fetch(
      `https://geocode.xyz/${latitude},${longitude}?geoit=json`
    );
    if (!geo.ok) {
      throw new Error('Easy bro... reloading too fast 8)');
    }
    const dataGeo = await geo.json();
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) {
      throw new Error('Oh, Jeez! Never heard of this country before...');
    }
    const [data] = await res.json();
    console.log(data);
    renderCountry(data);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (error) {
    console.error(error.message);
    renderError(`Something went wrong... ${error.message}`);
  }
};
// const city = whereAmI();

// // try {
// //   let y = 1;
// //   const x = 2;
// //   x = 3;
// // } catch (err) {
// //   alert(err.message);
// // }

// console.log(city); //<Promise>
// whereAmI().then(city => console.log(city)); //"you are in Salvador, Brasil"

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log('Finished getting location');
  }
})();

//Promise.all

const get3Countries = async function (c1, c2, c3) {
  try {
    //Considering the promises below do not depend on each other, instead of run them
    //one at a time as commented, we can use Promise.all() to run them in parallel:

    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log(data1.capital, data2.capital, data3.capital);
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (error) {
    console.error(error);
  }
};

// get3Countries('portugal', 'tanzania', 'brazil');

//Promise.race

//The first promise passed in the Promise.race array to be fullfilled will be the
//returned value from Promise.race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/Russia`),
    getJSON(`https://restcountries.com/v2/name/Italy`),
    getJSON(`https://restcountries.com/v2/name/Japan`),
  ]);
  console.log(res[0]);
})();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, s);
  });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/Japan`), timeout(30)])
  .then(res => console.log(res))
  .catch(error => console.error(error));

//  Promise.allSettled

//return all resolved promises

Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res));

//Promise.any

//returns the first fullfilled promise

Promise.any([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res)); //success or another success

// PART 1
// Write an async function 'loadNPause' that recreates Coding Challenge #2, this time
//using async/await (only the part where the promise is consumed).
//Compare the two versions, think about the big differences, and see which one you like
// more.
// Don't forget to test the error handler, and to set the network speed to 'Fast 3G'
//in the dev tools Network tab.

// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the 'createImage'
//function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'paralell' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

// GOOD LUCK 😀
// */

/*
let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));

  */
const loadNPause = async function () {
  try {
    let image = await createImage('img/img-1.jpg');
    await wait(2);
    image.style.display = 'none';
    image = await createImage('img/img-2.jpg');
    await wait(2);
    image.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
};

//loadNPause();

const loadAll = async function (imgArr) {
  try {
    let imgs = imgArr.map(async img => {
      const i = await createImage(img);
      i.classList.add('parallel');
    });

    await Promise.all(imgs);
  } catch (error) {
    console.error(error);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
