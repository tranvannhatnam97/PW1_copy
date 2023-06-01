import { cssPath, xPath } from "playwright-dompath";
const {  expect } = require('@playwright/test');

import { timeout } from "../../../playwright.config";
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
        for (var i = 7; i < 9; i++){
            console.log('Category: ' + i);
            var category = {}
            category['text']= await category_elements.nth(i).innerText()
            var xpath = (await xPath(category_elements.nth(i))).replace('/html', 'xpath=/')
            category['xpath'] = xpath
            await console.log(await category_elements.nth(i).locator('//a').getAttribute('href'));
            category['category_id'] = (await category_elements.nth(i).locator('//a').getAttribute('href')).replace('index.html?category=', '')
            category['products'] = []
            // await this.page.locator(xpath).click()
            // await this.page.waitForSelector('.product')
            // await this.page.waitForLoadState('domcontentloaded')
            
            // category['product'] = await this.get_product_list()
            // await this.page.goBack()
            await this.data.push(category)

        }
        
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
    async set_product_list(index){
        var product_list = []
        if ( this.page.locator('xpath=//li[@class="product"]')==undefined) {
            return product_list
        }
        var product_elements = await this.page.locator('xpath=//li[@class="product"]')
        var product_list_count = await product_elements.count()
        for (var i = 0; i< product_list_count; i++){
            // console.log('Product: ' + i);
            var product = {}
            product['order'] = i
            product['xpath'] = (await xPath(product_elements.nth(i))).replace('/html', 'xpath=/')
            // await console.log(await category_elements.nth(i).locator('//a').getAttribute('href'));
            product['product_id'] = (await product_elements.nth(i).locator('//div[@class="product-holder"]/a').getAttribute('href')).replace('shop-single.html?id=', '')
            await product_list.push(product)
            // await data[index]['products'].push(product)
        }
        this.data[index]['products'] = product_list
    }
    async set_product_detail(index){
        
    }
}