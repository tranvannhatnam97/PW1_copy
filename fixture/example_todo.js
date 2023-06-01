const {test} = require('@playwright/test');

type TestTalk(){}
TestTalk.hello='',
TestTalk.helloWorld='';
exports.test = test.extend<TestTalk>({
    hello: "Hello",
    helloWorld: async ({ hello }, use) => {
        // Set up the fixture.
        const value = hello + ', world!';
    
        // Use the fixture value in the test.
        await use(value);
    }

})