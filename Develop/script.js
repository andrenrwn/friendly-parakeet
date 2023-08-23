// Assignment code here
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

const validchars = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numeric: "0123456789",
  special: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
};

const min_length = 8;
const max_length = 128;

var checkboxes = document.querySelectorAll("input[type='checkbox']");

// A function to check if all the checkboxes are unchecked
function at_least_one_checkbox() {
  var atleastone = false;
  for ( var i of document.querySelectorAll("input[type='checkbox']") ) {
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

// Run a fucntion every time each checkbox is clicked
checkboxes.forEach( function(i) { i.addEventListener("click", clickcheckbox); } );

// Add a slider for the user to select the password length
var slider = document.getElementById("pwdlenslider");
var pwdlen = document.getElementById("pwdlen");

pwdlen.setAttribute("value", slider.value);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  pwdlen.setAttribute("value", slider.value);
}

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
