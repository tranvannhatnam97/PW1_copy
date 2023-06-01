const test = require('$/fixture/example_todo');

console.log(test.use);
test('New test', async({helloWorld, page})=>{
    await console.log('Before call use');
    await console.log(helloWorld);
    // await page.goto('http://103.139.103.33:19000/')
    await console.log('After call use');
})