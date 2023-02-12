document.getElementById("save").addEventListener("click", saveOptions);

function saveOptions() {
let keywords = document.getElementById("keywords").value.split("\n");
let options = {
hyperlink: document.getElementById("hyperlink").value,
title: document.getElementById("title").value,
description: document.getElementById("description").value,
icon: document.getElementById("icon").value
};

chrome.storage.sync.set({
keywords: keywords,
options: options
}, function() {
let savedMessage = document.getElementById("saved-message");
savedMessage.innerHTML = "Options saved.";
setTimeout(function() {
savedMessage.innerHTML = "";
}, 750);
});
}

chrome.storage.sync.get(["keywords", "options"], function(data) {
document.getElementById("keywords").value = data.keywords.join("\n");
document.getElementById("hyperlink").value = data.options.hyperlink;
document.getElementById("title").value = data.options.title;
document.getElementById("description").value = data.options.description;
document.getElementById("icon").value = data.options.icon;
});