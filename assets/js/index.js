(function () {
  const region = document.getElementById("region"),
    regionlist = document.getElementById("regionlist"),
    countries = document.getElementById("countries"),
    _detail = document.getElementById("_detail"),
    country_info = document.getElementById("country_info");
  let regionChosn = "auto";
    region.addEventListener("click" , _ => regionlist.classList.toggle("active"));
    window.addEventListener("click", evt => {
      if (!region.contains(evt.target) && !regionlist.contains(evt.target)) regionlist.classList.remove("active");
    });
    async function api(url) {
      try {
        url = await fetch(url);
        url = await url.json();
        return url;
      } catch (error) {
        throw error;
      }
    }
    function createCountry(obj) {
      return `<a href='javascript:detail("${obj.name}")' class="country">
  <img src="${obj.flags.png}" alt="${obj.name}">
  <div class="text">
    <h3>${obj.name}</h3>
    <p><b>Population: </b>${obj.population}</p>
    <p><b>Region: </b>${obj.region}</p>
    <p><b>Capital: </b>${obj.capital || 'None'}</p>
  </div>
</a>`;
    }
    function main () {
      regionChosn = "auto";
      countries.innerHTML = "";
    api("assets/json/data.json").then(data => {
      let i = 0;
      let count = 8;
      while (i < count) {
        countries.innerHTML  += createCountry(data[i]);
        i++;
      }
      const scroll = _ => {
        if (regionChosn != "auto") return false;
        let scrollY = window.scrollY;
        let screenHeight= window.innerHeight;
        let pageHeight = document.documentElement.offsetHeight;
        if (pageHeight - scrollY - screenHeight <= screenHeight) {
          count += 8;
          while (i < count) {
            if (i == data.length) break;
            countries.innerHTML  += createCountry(data[i]);
            i++;
          }
        }
      }
        document.addEventListener("scroll", scroll);
        document.addEventListener("wheel", scroll);
        document.addEventListener("touchmove", scroll);
      
      window.detail = function (name) {
        api("assets/json/data.json").then(data => {
          let num = 0;
          while (data[num].name != name) num++;
          if (data[num].name == name) {
            let html =
              `<img class="flag" src="${data[num].flags.png}" alt="${data[num].name}">
<div style="flex-grow:1;margin-left: 140px">
  <h2>${data[num].name}</h2>
  <div class="row between" style="align-items: flex-start">
    <div>
      <p><b>Native Name: </b>${data[num].nativeName || 'None'}</p>
      <p><b>Population: </b>${data[num].population || 'None'}</p>
      <p><b>Region: </b>${data[num].region || 'None'}</p>
      <p><b>Sub Region: </b>${data[num].subregion || 'None'}</p>
      <p><b>Capital: </b>${data[num].capital || 'None'}</p>
    </div>
    <div>
      <p><b>Top Level Domain: </b>${data[num].topLevelDomain.join(", ")}</p>
      <p><b>Currencies: </b>${data[num].currencies != undefined ? (_ => {
        return Array.isArray(data[num].currencies)  ? data[num].currencies[0].name : data[num].currencies.name;
      })() : 'None'}</p>
      <p><b>Languages: </b>`;
      let langs = [];
      for (let i = 0; i < Object.keys(data[num].languages).length; i++) {
        langs.push(data[num].languages[Object.keys(data[num].languages)[i]].name);
      };

      html += `${langs.join(", ")}</p>
    </div>
  </div>
  <div>
    <span class="border"><b>Border Countries: </b>`;
            if (data[num].borders != undefined) {
              let length = data[num].borders.length >= 3 ? 3 : data[num].borders.length;
              for (let i = 0; i < length; i++) {
                for (let count = 0; count < data.length; count++) {
                  if (data[num].borders[i] == data[count].alpha3Code) {
                    html += `<a href='javascript:detail("${data[count].name}")'>${data[count].name}</a>`;
                  }
                }
              }
            }
            html += `</span>
  </div>
</div>`;
            country_info.innerHTML = html;
            _detail.style.display ='block';
            window.scrollTo({top: 0})
            document.documentElement.style.overflow = 'hidden';
          }
        })
      }
    });
  }
    document.getElementById("back").addEventListener("click", _ => {
      _detail.style.display ='none';
      document.documentElement.style.overflow = 'auto';
    });
    window.africa = function () {
      regionChosn = "africa";
      api("assets/json/data.json").then(data => {
        countries.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].region == "Africa") {
            countries.innerHTML  += createCountry(data[i]);
          }
        }
      });
      regionlist.classList.remove("active");
    }
    window.america = function () {
      regionChosn = "americas";
      api("assets/json/data.json").then(data => {
        countries.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].region == "Americas") {
            countries.innerHTML  += createCountry(data[i]);
          }
        }
      });
      regionlist.classList.remove("active");
    }
    window.asia = function () {
      regionChosn = "asia";
      api("assets/json/data.json").then(data => {
        countries.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].region == "Asia") {
            countries.innerHTML  += createCountry(data[i]);
          }
        }
      });
      regionlist.classList.remove("active");
    }
    window.europe = function () {
      regionChosn = "europe";
      api("assets/json/data.json").then(data => {
        countries.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].region == "Europe") {
            countries.innerHTML  += createCountry(data[i]);
          }
        }
      });
      regionlist.classList.remove("active");
    }
    window.oceania = function () {
      regionChosn = "oceania";
      api("assets/json/data.json").then(data => {
        countries.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].region == "Oceania") {
            countries.innerHTML  += createCountry(data[i]);
          }
        }
      });
      regionlist.classList.remove("active");
    }
    const quest = document.getElementById("quest");
    quest.addEventListener("input", _ => {
      quest.value.trim() == '' ? main() : (_ => {
        api("assets/json/data.json").then(data => {
          regionChosn = quest.value;
          countries.innerHTML = "";
          for (let i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().startsWith(quest.value.trim().toLowerCase())) {
              countries.innerHTML  += createCountry(data[i]);
            }
          }
        });
      })();
    });
    main();
})();