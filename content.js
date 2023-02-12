fetch(chrome.runtime.getURL("keywords.json"))
  .then(response => response.json())
  .then(data => {
    let keywords = data.keywords;
    let searchQuery = new URL(window.location.href).searchParams.get("q");

    if (searchQuery) {
      for (let i = 0; i < keywords.length; i++) {
        if (searchQuery.includes(keywords[i])) {
          console.log("Keyword found:", keywords[i]);
          let firstResult = document.querySelector("#rso > div:nth-child(5)");
          fetch(chrome.runtime.getURL("custom-result.html"))
            .then(response => response.text())
            .then(html => {
              let customResult = document.createElement("div");
              customResult.innerHTML = html.replace("{KEYWORD}", keywords[i]);
              firstResult.insertAdjacentElement("beforebegin", customResult);
            })
            .catch(error => console.error(error));
          break;
        }
      }
    }
  })
  .catch(error => console.error(error));
