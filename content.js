function log(log) {
  console.log(log)
}

let checkForKeywords = function () {
  chrome.storage.sync.get(["keywords", "options"], function (data) {
    if (data.keywords) {
      let search = window.location.search.toLowerCase();
      for (let i = 0; i < data.keywords.length; i++) {
        let keyword = data.keywords[i].toLowerCase().split(" ").join("+");
        if (search.indexOf("q=" + keyword) !== -1) {
          log("Search term found")
          injectCustomResult(keyword, data.options);
          recordMetric(keyword);
          break;
        }
      }
    }
  });
};

let injectCustomResult = function (keyword, options) {
  let customResult = generateGoogleResult(options);
  let rso = document.getElementById("rso");
  if (rso) {
    let childNodeIndex = 0;
    if (options.childNodeIndex) {
      childNodeIndex = options.childNodeIndex;
    }
    rso.insertBefore(customResult, rso.childNodes[childNodeIndex]);
  }
};

let recordMetric = function (keyword) {
  let currentTime = new Date();
  let id = Date.now();
  let startTime = performance.now();
  let metric = {
    id: id,
    searchTerm: keyword,
    time: currentTime.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
    elapsedTime: 0,
  };
  chrome.storage.sync.get("metrics", function (data) {
    let metrics = [];
    if (data.metrics) {
      metrics = data.metrics;
    }
    metrics.push(metric);
    chrome.storage.sync.set({ metrics: metrics });
    log("Metric added");

    document.getElementById(`custom-result-link`).addEventListener("click", function () {
      let endTime = performance.now();
      let elapsedTime = endTime - startTime;
      metric.elapsedTime = elapsedTime;
      chrome.storage.sync.set({ metrics: metrics });
      log("Elapsed time updated: " + elapsedTime);
    });
  });
};





let generateGoogleResult = function (options) {
  let customResult = document.createElement("div");
  customResult.className = "g";

  let innerDiv = document.createElement("div");
  customResult.appendChild(innerDiv);

  let innermostDiv = document.createElement("div");
  innermostDiv.style.width = "600px";
  innerDiv.appendChild(innermostDiv);

  let cite = document.createElement("cite");
  cite.style.paddingTop = "1px";
  cite.style.paddingBottom = "2px";
  cite.innerHTML = options.hyperlink;
  innermostDiv.appendChild(cite);

  let linkDiv = document.createElement("div");
  innermostDiv.appendChild(linkDiv);

  let link = document.createElement("a");
  link.id = "custom-result-link";
  link.href = options.hyperlinkReal;
  linkDiv.appendChild(link);
  

  let title = document.createElement("h3");
  title.innerHTML = options.title;
  title.className = "LC20lb MBeuO DKV0Md";
  link.appendChild(title);

  let descriptionDiv = document.createElement("div");
  descriptionDiv.className = "IsZvec";
  innermostDiv.appendChild(descriptionDiv);

  let description = document.createElement("div");
  description.innerHTML = options.description;
  description.className = "VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf";
  description.style = "-webkit-line-clamp:2";
  descriptionDiv.appendChild(description);

  return customResult;
};

// Check for keywords when the page loads
checkForKeywords();
