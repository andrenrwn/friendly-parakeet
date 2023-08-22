// Assignment code here
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function generatePassword(){
  var passwd="";
  var myarray = new Uint8Array(32);
  crypto.getRandomValues(myarray);
  for (i in myarray) {
    passwd += characters.charAt(myarray[i]%characters.length);
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
