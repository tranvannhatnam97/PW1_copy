import { cssPath, xPath } from "playwright-dompath";
exports.YahooAuctionCategoryPage = class YahooAuctionCategoryPage{
    constructor(page){
        this.page = page
        this.url = this.page.url()
        this.product_list = []
        // this.product_name_text = this.page.locator('.ProductTitle__text')
        // this.current_price_text = this.page.locator('xpath=//dd[@class="Price__value"] >> nth=0')
        // this.current_price_text = this.page.locator('.Price__value').nth(0)
    }
    async go_to_page(id){
        await this.page.goto('https://auctions.yahoo.co.jp/category/list/' + id)
        await this.page.waitForLoadState('domcontentloaded')
        // await this.page.waitForTimeout(5000)
        // await this.page.mouse.click(1,1)
        // await this.close_popup()
        
    }
    async close_popup(){
        await this.page.locator('#js-close').click()
    }
    async set_product_list(){
        
        var product_elements  = await this.page.locator('.Product')
        var product_count = await product_elements.count()
        var product_list = []
        for (var i = 0; i< product_count; i++){
            // console.log('Product: ' + i);
            var product = {}
            product['order'] = i
            product['xpath'] = (await xPath(product_elements.nth(i))).replace('/html', 'xpath=/')
            product['product_id'] = (await product_elements.nth(i).locator('//div[@class="Product__image"]/a').getAttribute('href')).replace('https://page.auctions.yahoo.co.jp/jp/auction/', '')
            product_list.push(product)
            // await data[index]['products'].push(product)
        }
        this.product_list = product_list
    }
    
    
}