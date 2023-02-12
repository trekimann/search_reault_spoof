let checkForKeywords = function () {
  chrome.storage.sync.get(["keywords", "options"], function (data) {
    if (data.keywords) {
      for (let i = 0; i < data.keywords.length; i++) {
        let keyword = data.keywords[i];
        if (document.body.innerText.indexOf(keyword) !== -1) {
          injectCustomResult(keyword, data.options);
        }
      }
    }
  });
};

let injectCustomResult = function (keyword, options) {
  let customResult = generateGoogleResult(options);
  let rso = document.getElementById("rso");
  if (rso) {
    rso.insertBefore(customResult, rso.childNodes[0]);
  }
};

let generateGoogleResult = function (options) {
  let customResult = document.createElement("div");
  customResult.className = "g";

  let innerDiv = document.createElement("div");
  customResult.appendChild(innerDiv);

  let innermostDiv = document.createElement("div");
  innermostDiv.style.width = "600px";
  innerDiv.appendChild(innermostDiv);

  let linkDiv = document.createElement("div");
  innermostDiv.appendChild(linkDiv);

  let link = document.createElement("a");
  link.href = options.hyperlink;
  linkDiv.appendChild(link);

  let title = document.createElement("h3");
  title.style.paddingTop = "5px";
  title.innerHTML = options.title;
  title.className = "LC20lb MBeuO DKV0Md";
  link.appendChild(title);

  let cite = document.createElement("cite");
  cite.style.paddingTop = "1px";
  cite.style.paddingBottom = "2px";
  cite.innerHTML = options.hyperlink;
  cite.className = "TbwUpd NJjxre iUh30 tjvcx";
  linkDiv.appendChild(cite);

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
