import { cssPath, xPath } from "playwright-dompath";
const json = require("$/tools/data-process/json_parse");

exports.JanboxHomePage = class JanboxHomePage{
    constructor(page, id){
        this.base_url = 'http://103.139.103.33:19000/'
        this.page = page
        this.data =[]
    }
    async go_to_page(){
        await this.page.goto('http://103.139.103.33:19000')
        await this.page.waitForSelector('.widget__category')
        await this.page.waitForLoadState('networkidle') 
        // this.page.waitForTimeout(100)
    }
    async set_category_list(){
        var category_elements = await this.page.locator('xpath=//ul[@class="widget__category"]/li')
        this.category_list_count = await category_elements.count()
        for (var i = 0; i < this.category_list_count; i++){
            var category = {}
            category['xpath'] = await xPath(category_elements.nth(i))
            // await console.log(await category_elements.nth(i).locator('//a').getAttribute('href'));
            category['category_id'] = (await category_elements.nth(i).locator('//a').getAttribute('href')).replace('index.html?category=', '')
            category['product'] = await this.get_product_list()
            await this.data.push(category)
            // await console.log(await xPath(category_element.nth(i)));
        }
        // await console.log(await this.category_list_count);
        // await console.log(await this.category_list[0].innerText());
    }
    async store_data(){
        await json.write_json_to_file('test-data/crawler/homepage/janbox_homepage_category_list.json', this.data)
    }
    // async store_product_list(board){
    //     var product_elements = await this.page.locator('xpath=//li[@class="product"]')
    //     this.product_list_count = await product_elements.count()
    //     for (var i = 0; i< this.product_list_count; i++){
    //         await this.product_list.push(await product_elements.nth(i))
    //     }
    //     await json.write_json_to_file()
    // }
    async get_product_list(){
        var product_elements = await this.page.locator('xpath=//li[@class="product"]')
        this.product_list_count = await product_elements.count()
        for (var i = 0; i< this.product_list_count; i++){
            var product = {}
            
            await this.product_list.push(await product_elements.nth(i))
        }
    }
}