// //runs on teh server, fetches data from api and process logic
require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/api/random-user", async (req, res)=>{
    try{
        const responseUser = await axios.get("https://randomuser.me/api/");
        const user = responseUser.data.results[0]

        const userData = {
            gender: user.gender,
            title: user.name.title,
            firstName: user.name.first,
            lastName: user.name.last,
            city: user.location.city,
            country: user.location.country,
            addressNumber: user.location.street.number,
            addressStreet: user.location.street.name,
            birth: user.dob.date,
            age: user.dob.age,
            picture: user.picture.medium
        };

        const responseCountry = await axios.get(`https://restcountries.com/v3.1/name/${user.location.country}`,
            {
                headers: {
                    Authorization: process.env.CONTRYLAYER_API_KEY
                }
            }
        );
        const country = responseCountry.data[0];

        const countryData = {
            name: country.name.common,
            capital: country.capital[0],
            language: Object.values(country.languages)[0],
            currency: Object.values(country.currencies)[0].name,
            flag: country.flags.png
        };


        const currencyCode = Object.keys(country.currencies)[0];
        const responseCurrency = await 
                    axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${currencyCode}`);
        const exchangeRates = responseCurrency.data.conversion_rates;
        
        const currencyData = {
            USD: exchangeRates.USD,
            KZT: exchangeRates.KZT
        }


        const responseNews = await axios.get("https://newsapi.org/v2/everything", {
            params: {
                q: countryData.name,
                language: "en",
                pageSize: 5
            },
            headers: {
                Authorization: process.env.NEWS_API_KEY
            }
        });
        const newsData = [];
        for(let i=0; i<5; i++){
            const article = responseNews.data.articles[i];
            const newsDetails={
                title: article.title,
                image: article.urlToImage ? article.urlToImage : "",
                description: article.description,
                url: article.url
            };
            newsData.push(newsDetails);
        }

        
        res.json({
            user: userData,
            country: countryData,
            currency: currencyData,
            news: newsData
        });
        }
        catch (error){
            console.error(error);
            res.status(500).json({error: "Error occured"});
        }
    }
)
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})








