const { test, chromium, webkit, expect, Page } = require('@playwright/test');
const json = require("$/tools/data-process/json_parse");
const { JanboxCategoryPage } = require('$/model/crawler/category/janbox_category');
const { JanboxHomePage } = require('$/model/crawler/home/janbox_home');
const { YahooAuctionCategoryPage } = require('$/model/crawler/category/yahooauction_category')
test.describe.serial("Test e2e crawler", async () => {
    // let page;
    let homepage;
    let yahoopage
    let data
    test('janbox', async ({ page }) => {
        homepage = new JanboxHomePage(page)
        await homepage.go_to_page()
        await homepage.set_category_list()
        await console.log(homepage.data.length);
        for (var i = 0; i < homepage.data.length; i++) {
            if (homepage.data[i] == undefined) {
                break
            }
            await console.log("Click category " + i + ': ' + homepage.data[i]['text']);
            await homepage.page.locator(homepage.data[i]['xpath']).click()
            await homepage.page.waitForSelector('.widget__category')
            await homepage.page.waitForLoadState('networkidle')
            await homepage.set_product_list(i)
            await console.log(homepage.data[i]['products'].length);
            await homepage.page.goBack()
        }
        data = homepage.data
        await homepage.store_data()
    })
    test('yahoo', async ({ page }) => {

        yahoopage = new YahooAuctionCategoryPage(page)
        await console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            var category_id = data[i]['category_id']
            await yahoopage.go_to_page(category_id)
            await yahoopage.set_product_list()
            // await console.log(yahoopage.product_list);
            var janbox_products = data[i]['products']
            var yahoo_products = yahoopage.product_list
            for (var j = 0; j < yahoo_products.length; j++){
                // await console.log(yahoo_products[j]['product_id'] + '--' + janbox_products[j]['product_id']);
                if ()
                await expect.soft(yahoo_products[j]['product_id'], "Category "+ category_id + ': ' + data[i]['text'] +" product "+ j + " no match").toEqual(janbox_products[j]['product_id'])
            }
            await yahoopage.page.goBack()
        }

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