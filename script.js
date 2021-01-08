'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', ` https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(1)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

/*
const renderCountry = function (data, className = '') {
  const html = ` 
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
*/

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', ` https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country 1
    renderCountry(data);

    // get neighbour country 2
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      ` https://restcountries.eu/rest/v2/alpha/${neighbour}`
    );
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('usa');
*/

///////////// PROMISES

///// OLD WAY
//   const request = new XMLHttpRequest();
//   request.open('GET', ` https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

// const getCountryData = function (country) {
//   fetch(` https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

/*
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(` https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Conutry not found (${response.status})`);

//       response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //Country 2
//       return fetch(` https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {

//       response.json()
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥`);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbouring country!');

      //Country 2
      return getJSON(
        ` https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});

// getCountryData('dsdlakjslk');
*/

/////////////////////////////////////////////////
///////////// CODING CHALLENGE #1 ///////////////
/////////////////////////////////////////////////

/*

In this challenge you will build a function 'whereAmI' which renders a country
only based on GPS coordinates. For that, you will use a second API to geocode
coordinates. 

So in this challenge, you’ll use an API on your own for the first time 😁

Your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
and a longitude value ('lng') (these are GPS coordinates, examples are in test
data below).

2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
to convert coordinates to a meaningful location, like a city and country name.
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
will be done to a URL with this format:
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉

3. Once you have the data, take a look at it in the console to see all the attributes
that you received about the provided location. Then, using this data, log a
message like this to the console: “You are in Berlin, Germany”

4. Chain a .catch method to the end of the promise chain and log errors to the
console

5. This API allows you to make only 3 requests per second. If you reload fast, you
will get this error with code 403. This is an error with the request. Remember,
fetch() does not reject the promise in this case. So create an error to reject
the promise yourself, with a meaningful error message

PART 2
6. Now it's time to use the received data to render a country. So take the relevant
attribute from the geocoding API result, and plug it into the countries API that
we have been using.

7. Render the country and catch any errors, just like we have done in the last
lecture (you can even copy this code, no need to type the same code)

Test data:

§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK 😀
*/

// url = https://geocode.xyz/${},${}?geoit=json

/*
const randomCoords = (min, max) => {
  return +(Math.random() * (max - min) + min).toFixed(3);
};

// console.log(randomCoords(-180, 180));

const renderCountry = function (data, className = '') {
  const html = ` 
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const whereAmI = (lat, lng) => {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(
          `Something went wrong ${error.message}, ${response.status}`
        );
      return response.json();
    })
    .then(data => {
      // console.log(data);
      if (!data.country) throw new Error(`Not valid coordinates`);
      console.log(`You are in ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Whoops, something went wrong ${response.status}`);
      return response.json();
    })
    .then(data => {
      // console.log(data);
      if (!data[1]) {
        renderCountry(data[0]);
      } else {
        renderCountry(data[1]);
      }
    })
    .catch(err => {
      console.error(`${err.message}`);
    })
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  whereAmI(19.037, 72.873);
});


§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
*/

/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved Promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');
*/

///////////////////// Building a Simple Promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw is happening!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win! 🤑');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/////////// PROMISIFYING
/*
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

const getPosition = () => {
  return new Promise((resolve, reject) => {
    //   navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // )
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const whereAmI = () => {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(
          `Something went wrong ${error.message}, ${response.status}`
        );
      return response.json();
    })
    .then(data => {
      // console.log(data);
      if (!data.country) throw new Error(`Not valid coordinates`);
      console.log(`You are in ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Whoops, something went wrong ${response.status}`);
      return response.json();
    })
    .then(data => {
      // console.log(data);
      if (!data[1]) {
        renderCountry(data[0]);
      } else {
        renderCountry(data[1]);
      }
    })
    .catch(err => {
      console.error(`${err.message}`);
    })
    .finally((countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
*/

////////////////// Coding Challenge #2
/*
For this challenge you will actually have to watch the video! Then, build the image
loading functionality that I just showed you on the screen.

Your tasks:

Tasks are not super-descriptive this time, so that you can figure out some stuff by
yourself. Pretend you're working on your own 😉

PART 1

1. Create a function 'createImage' which receives 'imgPath' as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path

2. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image (listen for the'error' event), reject the promise

3. If this part is too tricky for you, just watch the first part of the solution

PART 2
4. Consume the promise using .then and also add an error handler

5. After the image has loaded, pause execution for 2 seconds using the 'wait'
function we created earlier

6. After the 2 seconds have passed, hide the current image (set display CSS
property to 'none'), and load a second image

(Hint: Use the image element returned by the 'createImage' promise to hide the current image. You will need a global variable for that 😉)

7. After the second image has loaded, pause execution for 2 seconds again

8. After the 2 seconds have passed, hide the current image

Test data: Images in the img folder. Test the error handler by passing a wrong
image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
otherwise images load too fast

GOOD LUCK 😀
*/

/*


createImage('/img/img-1.jpg')
  .then(pic => {
    wait(2).then(() => {
      pic.style.display = 'none';
    });
    return wait(2);
  })
  .then(pic => {
    return createImage('/img/img-2.jpg');
  })
  .then(pic => {
    wait(2).then(() => {
      pic.style.display = 'none';
    });
    return wait(2);
  })
  .then(_ => {
    return createImage('/img/img-3.jpg');
  });
  */
/*
fetch('https://statsapi.web.nhl.com/api/v1/teams')
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
  });
*/

/////////// ASYNC AWAIT

const renderCountry = function (data, className = '') {
  const html = ` 
  <article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // Country data
    const res = await fetch(`https://restcountries.eu/rest/v2/name/usa`);
    if (!resGeo.ok) throw new Error('Problem getting Country');
    const data = await res.json();
    renderCountry(data[0]);

    return `you are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`${err.message}`);

    // REject promise returned from async function
    throw err;
  }
};

// console.log('1: Will get location');
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log('1: Will get location');
    console.log(`2: ${city} `);
  } catch {
    console.error(`2: Error`);
  }
  console.log('3: Finished getting location');
})();
*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

/*
const get3Countries = async (c1, c2, c3) => {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

//////////// RACE, ALLSETTLED AND ANY

// Promise.race()
// Recieves an array of promises and returns an array.
// First settled promise wins the race.
// Short circuits whenever first promise is settled (wheter it is resolved or rejected)
/*
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = sec => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
// Takes an array of promises and puts out an array of all settled promises (whether they are resolved or rejected)
// unlike promise.all which short cuirtuts on reject

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

// Promise.any [ES2021]
// Takes an arrayof promises, returns first fulfilled promies and ignore any rejected promises.

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));
*/

///////////////// Challenge #3
/*
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time using async/await (only the part where the promise is consumed, reuse the 'createImage' function from before)

2. Compare the two versions, think about the big differences, and see which one
you like more

3. Don't forget to test the error handler, and to set the network speed to “Fast 3G” in the dev tools Network tab

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr'

2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')

3. Check out the 'imgs' array in the console! Is it like you expected?

4. Use a promise combinator function to actually get the images from the array 😉

5. Add the 'parallel' class to all the images (it has some CSS styles)

Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function

GOOD LUCK 😀
*/

const wait = seconds => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2).then(x => console.log('Hello'));

const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    let pic = document.createElement('img');
    pic.src = imgPath;
    const imgEl = document.querySelector('.images');
    resolve(imgEl.appendChild(pic));
    reject(new Error('Whoops'));
  });
};

/*
const loadNPause = async () => {
  try {
    // Load first img
    const pic1 = await createImage('/img/img-1.jpg');
    await wait(2);
    pic1.style.display = 'none';
    // img 2
    const pic2 = await createImage('/img/img-2.jpg');
    await wait(2);
    pic2.style.display = 'none';
    // img 3
    const pic3 = await createImage('/img/img-3.jpg');
    await wait(2);
    pic3.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

loadNPause();
*/

const loadAll = async imgArr => {
  try {
    const imgs = imgArr.map(async pic => await createImage(pic));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
