const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');



request('https://www.programme-tv.net/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ =  cheerio.load(html);

    
        const allInfos = $('.doubleBroadcastCard'); // all info boxchaines
  

       allInfos.each((i, el) => {
           const item = $(el)
           .text()
           .replace(/\s\s+/g, ' ');
         

           const channel = $(el)
            .children('.doubleBroadcastCard-channel')
            .text()
            .replace(/\s\s+/g, ' ');
           

           const hour = $(el)
            .children('.doubleBroadcastCard-hour')
            .text()
            .replace(/\s\s+/g, ' ');
            
           const describ = $(el)
           .children('.doubleBroadcastCard-infos, doubleBroadcastCard-title')
           .text()
           .replace(/\s\s+/g, ' ');
         

           const duration = $(el)
           .children('.doubleBroadcastCard-infos , .doubleBroadcastCard-duration')
           .text()
           .replace(/\s\s+/g, ' ');
       

         // ecrit un csv
          writeStream.write(` ${channel}, \n ${hour} ,\n ${describ}, \n _________ \n`)
       })}
    });
 

    console.log('Scraping Done')

       // const tf1title = $('[title=tf1]');
       // const tf1Episode = $('allInfos, .doubleBroadcastCard-subtitle');
/*
       const outputChannel = allInfos.children('.doubleBroadcastCard-channel');
       const outputHour = allInfos.children('.doubleBroadcastCard-channel, .doubleBroadcastCard-hour');
       const outputInfos = allInfos.children('.doubleBroadcastCard-infos, doubleBroadcastCard-title');
       const outputDuration = allInfos.children('.doubleBroadcastCard-duration, span');       
       const outputExclu = allInfos.children('.doubleBroadcastCard-new');
       const outputRedif = allInfos.children('.doubleBroadcastCard-infosOffPeak, .doubleBroadcastCard-rebroadcast') 
        *
      
       // console.log(allInfos.text());
       //  console.log(allInfos.text());
        console.log(outputChannel.text());
        console.log(outputHour.text());
        console.log(outputInfos.text());
        console.log(outputDuration.text());
        console.log(outputExclu.text());
        console.log(outputRedif.text());
    }

    */


