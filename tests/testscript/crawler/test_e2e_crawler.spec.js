const { test, chromium, expect, Page } = require('@playwright/test');
const json = require("$/tools/data-process/json_parse");
const { JanboxCategoryPage } = require('$/model/crawler/category/janbox_category');
const { JanboxHomePage } = require('$/model/crawler/home/janbox_home');
test.describe.serial("Test e2e crawler", async () => {
    let page;
    let homepage;
    test('janbox', async ({ page }) => {
        var i = 0
        homepage = new JanboxHomePage(page)
        await homepage.go_to_page()
        await homepage.set_category_list()
        await homepage.store_data()
        // for (var category of await homepage.category_list){
        //     console.log("Click category "+ i++);
            
        //     await category.click()
        //     await homepage.page.waitForSelector('.widget__category')
        //     await homepage.page.waitForLoadState('networkidle')

        //     await homepage.page.goBack()
        // }
    })






    // test('Test category0', async ({ browser }) => {
    //     // page = await browser.newPage()
    //     // homepage = new JanboxHomePage(page)
    //     var data = await json.read_json_from_file('test-data/crawler/homepage/janbox_homepage_category_list.json')
    //     var category_path_list = []
    //     data.forEach(element => {
    //         category_path_list.push(element['_selector'])
    //     });
    //     await console.log(category_path_list);
    //     category_path_list.forEach(async category_path => {
    //         await page.goto('http://103.139.103.33:19000')
    //         await page.locator(category_path).click()
    //         await page.waitForSelector('.widget__category')
    //         await page.waitForLoadState('networkidle')
    //     })
    // })

})