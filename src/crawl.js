const puppeteer = require('puppeteer')
const {mn} = require('./config/default')
const srcToImg = require('../util/srcToImage')

async function toCrawl() {
    const broswer = await puppeteer.launch()
    const page = await broswer.newPage()
    await page.goto('https://pic.sogou.com/')
    console.log('go to https://pic.sogou.com/')

    await page.setViewport({
        width: 1920,
        height: 1080
    })
    console.log('reset viewport')

    await page.focus('#form_querytext')
    await page.keyboard.sendCharacter('可爱头像')

    await page.click('#searchBtn')
    console.log('go to search list')

    page.on('load',async () => {
        console.log('page loading done,start fetch')

        const srcs = await page.evaluate(() => {
            console.log(location.href)
            const images = document.querySelectorAll('img.img-hover')
            return Array.prototype.map.call(images,img=>img.src)
        })
        console.log(`get ${srcs.length} images, start download`)
        srcs.forEach(async(src) => {
            await page.waitFor(200)
           await srcToImg(src,mn)
        })
        await broswer.close()
    })

}

toCrawl()
