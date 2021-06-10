require('dotenv').config()

const fetch = require('node-fetch')
const telegram = require('node-telegram-bot-api')
const bot = new telegram(process.env.TELEGRAM_TOKEN)

const weatherToken = process.env.WEATHER_API_TOKEN

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set('zip', '52070,de')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'metric')


const getWeatherData = async () => {
    const resp = await fetch(weatherURL.toString())
    const body = await resp.json()
    return body
}

const generateWeatherMessage = weatherData =>
  `The weather in ${weatherData.name}: ${weatherData.weather[0].description}. 
    Current temperature is ${weatherData.main.temp}, with a low temp of 
    ${weatherData.main.temp_min} and high of ${weatherData.main.temp_max}.`

const main = async () => {
    const weatherData = await getWeatherData()
    const weatherString = generateWeatherMessage(weatherData)
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
    console.log(weatherString)
}

main()
