toHaveHeader: This matcher checks if the HTTP response has a specific header with the expected value. Here's an example implementation:
javascript
Copy code
expect.extend({
  toHaveHeader(received, headerName, expectedValue) {
    const headerValue = received.headers[headerName.toLowerCase()];
    const pass = headerValue === expectedValue;
    if (pass) {
      return {
        message: () =>
          `Expected HTTP response header '${headerName}' not to be '${expectedValue}', but received '${headerValue}'`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected HTTP response header '${headerName}' to be '${expectedValue}', but received '${headerValue}'`,
        pass: false,
      };
    }
  },
});

toBeValidJSON: This matcher checks if the response body is a valid JSON string. Here's an example implementation:
javascript
Copy code
expect.extend({
  toBeValidJSON(received) {
    let pass = true;
    let error = null;
    try {
      JSON.parse(received);
    } catch (e) {
      pass = false;
      error = e;
    }
    if (pass) {
      return {
        message: () => `Expected '${received}' not to be a valid JSON string`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected '${received}' to be a valid JSON string, but received error: ${error}`,
        pass: false,
      };
    }
  },
});

ation for a toHaveKeysAndValues matcher that checks if an object has certain keys and their corresponding values:

javascript
Copy code
expect.extend({
  toHaveKeysAndValues(received, expected) {
    const receivedKeys = Object.keys(received);
    const expectedKeys = Object.keys(expected);

    const missingKeys = expectedKeys.filter((key) => !receivedKeys.includes(key));
    const extraKeys = receivedKeys.filter((key) => !expectedKeys.includes(key));
    const incorrectValues = expectedKeys.filter((key) => received[key] !== expected[key]);

    const pass = missingKeys.length === 0 && extraKeys.length === 0 && incorrectValues.length === 0;

    if (pass) {
      return {
        message: () =>
          `Expected object ${JSON.stringify(received)} not to have keys and values ${JSON.stringify(
            expected
          )}, but it did`,
        pass: true,
      };
    } else {
      let errorMessage = "";
      if (missingKeys.length > 0) {
        errorMessage += `Expected object ${JSON.stringify(received)} to have keys ${JSON.stringify(
          missingKeys
        )}, but they were missing. `;
      }
      if (extraKeys.length > 0) {
        errorMessage += `Expected object ${JSON.stringify(received)} not to have keys ${JSON.stringify(
          extraKeys
        )}, but they were present. `;
      }
      if (incorrectValues.length > 0) {
        errorMessage += `Expected object ${JSON.stringify(received)} to have values ${JSON.stringify(
          expected
        )}, but the values were ${JSON.stringify(
          received
        )}. `;
      }
      return {
        message: () => errorMessage,
        pass: false,
      };
    }
  },
});
You can use this matcher like this:

php
Copy code
it("should have the correct keys and values", () => {
  const obj = { name: "Alice", age: 25 };
  expect(obj).toHaveKeysAndValues({ name: "Alice", age: 25 });
});
