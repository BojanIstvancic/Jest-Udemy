import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { logRoles } from "@testing-library/react";
import { replaceCamelWithSpaces } from "./App";

/* React Testing Library 
    - renders component into virtual dom
    - searches virtual dom
    - interacts with virtual dom
*/

/*
  JEST
  - runs tests
  - makes assertions (statements)
  - runs in test mode - if something changes it reruns the test
*/

/* 
  TDD - write tests before writing code
*/

/* 
    Test Types
    - unit - test one unit in isolation
    - intergration - test how multiplle units works together
    - functional tests - test particular function of software (enter data in form, click) 
    RTL encourages functional tests
    - Acceptance/E2E - cypress, selenium
  */

/*
    Functional Testing vs Unit Test
    
    UNIT 
      - isolated, mock dependencies
      - very easy find failures

      - it's not much connected how the users are using the app
      - more likely to break with refactoring

    FUNCTIONAL
      - include all relevant units 
      - close to how users interact with software
      - robust test

      - more difficult to debug failing tests
    */

// TDD EXAMPLE

// https://www.w3.org/TR/wai-aria/#role_definitions - role definitions
// https://github.com/testing-library/jest-dom - jest matchers

test("button has correct initial color, button turns blue when clicked", () => {
  /*
    test - jest test method
    1 argument - test name
    2 argument - test function
  */
  const { container } = render(<App />);
  logRoles(container);
  // destructure the container with its elements and check the roles of elements

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // find an element with a role of button and text of "Change to blue"

  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
  // expect() - global in JEST - expect button background-color to be red

  fireEvent.click(colorButton);
  // test clicks - trigger click

  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  // expect button background-color to be blue

  expect(colorButton).toHaveTextContent("Change to red");
  // expect button to have text change to red
});

test("initial conditions", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // check that the button starts out enabled
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  // checkbox starts out uncecked
  expect(checkbox).not.toBeChecked(); // .not is to negate the assertion
});

test("checbox disables button on first click and enables on second", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  // checkbox starts out uncecked

  fireEvent.click(checkbox);
  // fire the event on checkbox

  expect(colorButton).toBeDisabled();
  // test if the button is disabled

  expect(checkbox).toBeChecked();
  // check if checkbox is checked

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
});

test("disabled button has gray background and reverts to red", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkbox);
  // disable button
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  // enable button
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("disabled button has gray background and reverts to blue", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(colorButton);
  // change color to blue

  fireEvent.click(checkbox);
  // disable button
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  // enable button
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});

// Unit Testing functions

describe("spaces before camel-case capital letters", () => {
  // describe - combine tests, used for grouping tests
  // we need to export the function that we want to test

  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
    // trigger the function with 'red' argument and expect result to be 'red'
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
