const countapi = require("countapi-js");
import './styles.css'

// Initially we need to create namespace & key
// By key I mean see the comments below
// in any index.js terminal run below .create
// request once to tie namespace with key and UUID.
// Also to enable key reset. value defaults to 1
const myNamespace = "localhost";
const myKey = "visitors";

const counterElement = document.querySelectorAll("span");

/*  .create TEMPLATE:
countapi.create({
    namespace: www.mysite.com,
    key: 'clicks', 'uniqueVisitors', etc.
    enable_reset: 1 // will enable changing that key
}).then(result => console.log(result)).catch(error => console.log(error))
*/

// in countapi.get(namespace, key), key refers
// to arbitrary designation chosen by me (e.g.
//  'gatavebuli', 'shemosuli', 'visited' etc.)
// and not the UUID. the documentation is lousy
const getCount = async () => {
    const result = await countapi.get(myNamespace, myKey);
    console.log(result);
    displayCount(result.value);
};
  
const incrementCount = async () => {
    const result = await countapi.hit(myNamespace, myKey);
    console.log(result);
    displayCount(result.value);
};
  
const displayCount = (count) => {
    let initialFormat = count.toString().padStart(6, "0");
    counterElement.forEach((span, index) => {
      span.innerHTML = initialFormat[index];
    });
};

// if else block to distinguish between first time and 
// existing visitor to this site
if (!localStorage.getItem("repeatVisitor")) {
    console.log("key not created yet");
    incrementCount();
    localStorage.setItem("repeatVisitor", true);
  } else {
    console.log("existing viewer, displaying w/o incrementing");
    getCount();
  }