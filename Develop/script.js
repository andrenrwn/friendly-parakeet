// ------------------------
// Prompt user for criteria
// ------------------------
// The user is prompted to enter a criteria by clicking on the card-popoutlabel buttons
var promptcriteria = document.querySelectorAll(".card-popoutlabel");

// When we click on the popout label, we toggle the previous element's heigh and padding
function clickaccordion(event) {
  if (event.target.previousElementSibling.style.getPropertyValue("height")=="auto") {
    event.target.previousElementSibling.style = 
      "height:0; padding-top:0px; padding-bottom:0px;";
  } else {
    event.target.previousElementSibling.style = 
      "height:auto; padding-top:25px; padding-bottom:25px;";
  }
}

// Add an event listener when the buttons are clicked
promptcriteria.forEach( function(i) { i.addEventListener("click", clickaccordion); } );

// --------------------------------
// Password character type criteria
// --------------------------------

const validchars = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numeric: "0123456789",
  special: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};

const minlength = 8;
const maxlength = 128;

// options are presented as checkboxes to the user
var checkboxes = document.querySelectorAll("input[type='checkbox']");

// A function to check if all the checkboxes are unchecked
function at_least_one_checkbox() {
  var atleastone = false;
  for ( var i of checkboxes ) {
    // console.log(i + " - " + i.checked);
    atleastone = atleastone || i.checked;
  }
  return atleastone;
}

// A function that prevents the user from unchecking the last checkbox
function clickcheckbox(event) {
  // console.log("event clicked for " + event.target.name);
  if ( !at_least_one_checkbox() ) {
    alert("Warning: you must select at least one character option")
    event.preventDefault();
    // console.log(event.target.attributes);
  }
}

// Associate an event listener function for every time a checkbox is clicked
checkboxes.forEach( function(i) { i.addEventListener("click", clickcheckbox); } );

// ------------------------
// Password length criteria
// ------------------------

// Add a slider for the user to select the password length
var slider = document.getElementById("pwdlenslider"); // slider
var pwdlen = document.getElementById("pwdlen"); // number input

pwdlen.setAttribute("value", slider.value);

// Update the current password length (each time you drag the slider handle)
slider.oninput = function() {
  pwdlen.setAttribute("value", slider.value);
}

// Update the slider (each time the password input is changed)
pwdlen.addEventListener("input", function(event) {
    if (event.target.value < minlength) {
      event.target.value = minlength;
    } else if (event.target.value > maxlength) {
      event.target.value = maxlength;
    }
    slider.value=event.target.value;
  }
);

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Generate password based on previously user-selected parameters
function generatePassword() {
  var passwd="";

  // Generate a string of available characters based on selected parameters (uppercase, lowercase, etc)
  var availablechars="";
  for (var i of checkboxes) {
    // console.log(i.id + " " + i.checked);
    if (i.checked) {
      availablechars += validchars[i.id];
    }
  }
  // console.log(availablechars);

  // create a crypto-safe array of random numbers
  // console.log("pwd len " + pwdlen.getAttribute("value"));
  var myarray = new Uint16Array(pwdlen.getAttribute("value")); 
  crypto.getRandomValues(myarray);

  // add characters to the password based on the generated array of random numbers
  for (var i of myarray) {
    passwd += availablechars.charAt(availablechars.length*i/65536);
  };

  return passwd;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
