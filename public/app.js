//runs in client's browser, fetches data from server and displays it with DOM
function getRandomUser(){
    fetch("/api/random-user")
    .then(response => response.json())
    .then(data =>{
        const user = data.user;
        const country = data.country;
        const currency = data.currency;
        const news = data.news;

        const userElement = document.getElementById("userContainer");
        userElement.innerHTML=
            `<div class="info-container">
                <div class="card">
                    <h3>User Information</h3>
                    <img src="${user.picture}" alt="User Picture">
                    <h2>${user.title} ${user.firstName} ${user.lastName}</h2>
                    <p>Gender: ${user.gender}</p>
                    <p>Age: ${user.age}</p>
                    <p>Date of Birth: ${user.birth.slice(0, 10)}</p>
                    <p>City: ${user.city}</p>
                    <p>Country: ${user.country}</p>
                    <p>Address: ${user.addressStreet} ${user.addressNumber}</p>
                </div>

                <div class="card">
                    <h3>Country Information</h3>
                    <h2>${country.name}</h2>
                    <img src="${country.flag}" alt="Country Flag">
                    <p>Capital City: ${country.capital}</p>
                    <p>Language: ${country.language}</p>
                    <p>Currency: ${country.currency}</p>
                    <ul>
                        <li> 1 ${country.currency} = ${currency.USD} USD</li>
                        <li> 1 ${country.currency} = ${currency.KZT} KZT</li>
                    </ul>
                </div>
            </div>
        `;
        let newsHTML = `
            <div class="news-container">
                <h3 style="align-self:center">News in ${country.name}</h3>
                <div class="news-grid">
                    <div class="news-card">
                        <h4>${news[0].title}</h4>
                        <img src="${news[0].image}">
                        <p>${news[0].description}</p>
                        <a href="${news[0].url}">Read more</a>
                    </div>
                    <div class="news-card">
                        <h4>${news[1].title}</h4>
                        <img src=" ${news[1].image}">
                        <p>${news[1].description}</p>
                        <a href="${news[1].url}">Read more</a>
                    </div>
                    <div class="news-card">
                        <h4>${news[2].title}</h4>
                        <img src="${news[2].image}">
                        <p>${news[2].description}</p>
                        <a href="${news[2].url}">Read more</a>
                    </div>
                    <div class="news-card">
                        <h4>${news[3].title}</h4>
                        <img src="${news[3].image}">
                        <p>${news[3].description}</p>
                        <a href="${news[3].url}">Read more</a>
                    </div>
                    <div class="news-card">
                        <h4>${news[4].title}</h4>
                        <img src="${news[4].image}">
                        <p>${news[4].description}</p>
                        <a href="${news[4].url}">Read more</a>
                    </div>
                </div>
            </div>
        `;

    userElement.innerHTML += newsHTML;

    }).catch(error=> console.error(error));
}
document.getElementById("getUserBtn").addEventListener("click", getRandomUser);

