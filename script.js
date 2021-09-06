// Assignment Code
var generateBtn = document.querySelector("#generate");

//Generate password using criteria from prompts  
function generatePassword() {

  //Password criteria prompts

    //Prompt for desired length
    //Use do/while to repeat prompt if invalid desired length is entered
    do {  
      var desiredLength = prompt("How many characters does your password need to be?");
        
      //Validate that entry is between 8 & 128 characters
      if (parseInt(desiredLength) < 8 || parseInt(desiredLength) > 128) {
        alert ("Password length must be between 8 and 128 characters. Please try again.");
      }

      //Break out of the function early if user cancels prompt
      if (desiredLength === null) {
        return;
      }
    } while (parseInt(desiredLength) < 8 || parseInt(desiredLength) > 128);
    

    //Prompt for character types to include -- lowercase, uppercase, numeric, and/or special 
    //Use do/while loop to repeat prompts if all are declined and user confirms they want to try again
    do {
      //Define empty array to hold selected charTypes
      var selectedChars = [];
      
      //Prompt for charTypes to include and append array with selected charTypes
      var includeLowercase = confirm ("Do you want to include lowercase letters?");
        if (includeLowercase === true) {
          selectedChars.push("lowercase");
        }

      var includeUppercase = confirm ("Do you want to include uppercase letters?");
        if (includeUppercase === true) {
          selectedChars.push("uppercase");
        }

      var includeNumbers = confirm ("Do you want to include numbers?");
        if (includeNumbers === true) {
          selectedChars.push("numbers");
        }

      var includeSpecial = confirm ("Do you want to include special characters?");
        if (includeSpecial === true) {
          selectedChars.push("special");
        }

      //If all charTypes are declined, alert that at least one must be selected
      if (includeLowercase === false && includeUppercase === false && includeNumbers === false && includeSpecial === false) {
        var tryAgain = confirm ("At least one character type selection must be included. Do you want to try again?");
      }

      //Break out of function early if user cancels confirm (doesn't want to try again)
      if (tryAgain === false) {
          return;
        }
    } while (includeLowercase === false && includeUppercase === false && includeNumbers === false && includeSpecial === false);
    

  //Define charTypes
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    var uppercase = lowercase.toUpperCase();
    var numbers = "1234567890";
    var special = "!@$-\%#(^&/*)<?_>|+~";

  //Generate string of random characters from selected charTypes 
  //Use do/while loop with conditions on each charType to get a random char from the corresponding string and append it to a var until that var's length == desired length
    
    //Function for randomizing which of the selected charTypes should be used for the next character in the password
    function getNextCharType() {
      let nextCharTypeIndex = Math.floor(Math.random() * selectedChars.length)
      return selectedChars[nextCharTypeIndex];
    }

    //Function for getting a random character from the charType definitions
    function getRandomChar(charType) {
      var randomCharIndex = Math.floor(Math.random() * charType.length); 
      return charType.charAt(randomCharIndex);
    }
    
    //Define empty string variable to hold the string of characters as they're determined
    var randomPass = "";

    //Loop through each selected charType to get a character from that type until the desired length is satisfied
    do {
      //Determine next charType to pull from
      var nextCharType = getNextCharType();

      //Get next character by determining what the next randomized selected charType is and append character from that charType to the string
      if (nextCharType === "lowercase" && randomPass.length < parseInt(desiredLength)) {
        randomPass += getRandomChar(lowercase);
      }
      if (nextCharType === "uppercase" && randomPass.length < parseInt(desiredLength)) {
        randomPass += getRandomChar(uppercase);
      }
      if (nextCharType === "numbers" && randomPass.length < parseInt(desiredLength)) {
        randomPass += getRandomChar(numbers);
      }
      if (nextCharType === "special" && randomPass.length < parseInt(desiredLength)) {
        randomPass += getRandomChar(special);
      }

      //Version of character getter that ensures at least one character from each selectedType gets included 
      //Use without nextCharType and getNextCharType
        // if (includeLowercase === true && randomPass.length < parseInt(desiredLength)) {
        //   randomPass += getRandomChar(lowercase);
        // }
        // if (includeUppercase === true && randomPass.length < parseInt(desiredLength)) {
        //   randomPass += getRandomChar(uppercase);
        // }
        // if (includeNumbers === true && randomPass.length < parseInt(desiredLength)) {
        //   randomPass += getRandomChar(numbers);
        // }
        // if (includeSpecial === true && randomPass.length < parseInt(desiredLength)) {
        //   randomPass += getRandomChar(special);
        // }
    }
    while (randomPass.length < parseInt(desiredLength)); 

  //Return the string
  return randomPass;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);