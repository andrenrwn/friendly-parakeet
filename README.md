# Password Generator

## About

This webpage showcases how JavaScript can be used to produce interactive user interface elements.

On a web browser, javascript:
- uses the DOM API to control HTML elements
- gets callbacks on user interface events using event listeners
- manipulates attributes, styles, and properties of the webpage elements using selectors and document object methods

This example application fulfills the following requiremets:
- Generate random passwords following a set of user-defined parameters
- Prompts the user for password criteria using accordion buttons to present further options
- Allows the user to specify a length from 8 to 128 characters
- Ensures user input are validated
- Allows the user to select four character types:
  - lowercase
  - uppercase
  - numeric
  - special characters
- Ensures that users select at least one character type

The user interface approach minimizes user clicks by supplying default values, so users can immediately generate a password with minimal clicks.
The accordion is implemented to fulfill the requiement to prompt the user while keeping the interface as simple as possible, without the user needing to apply additional clicks if they do not wish to change the default values.

## Submission

Repository: https://github.com/andrenrwn/friendly-parakeet

Webpage: https://andrenrwn.github.io/friendly-parakeet/Develop/

Screenshot:
![Image of password generator application](/screenshot.png "Screenshot of password generator app").
