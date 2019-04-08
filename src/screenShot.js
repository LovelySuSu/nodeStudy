
const puppeteer = require('puppeteer')
const {  screenshot } = require('./config/default')

async function toShot()  {
    const broswer = await puppeteer.launch({headless: false})
    const page = await broswer.newPage()
    await page.goto('https://www.baidu.com')
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.png`
    })
    await broswer.close()
}

toShot()
