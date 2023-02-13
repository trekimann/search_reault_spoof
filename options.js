document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("save").addEventListener("click", saveOptions);
    document.getElementById("clear").addEventListener("click", clearMetrics);

    chrome.storage.sync.get(["keywords", "options", "metrics"], function (data) {
        document.getElementById("keywords").value = data.keywords.join("\n");
        document.getElementById("hyperlink").value = data.options.hyperlink;
        document.getElementById("hyperlink_real").value = data.options.hyperlinkReal;
        document.getElementById("title").value = data.options.title;
        document.getElementById("description").value = data.options.description;
        document.getElementById("icon").value = data.options.icon;
        document.getElementById("childNodeIndex").value = data.options.childNodeIndex;

        let metrics = data.metrics;
        let metricsTable = document.createElement("table");
        metricsTable.style.width = "100%";
        metricsTable.setAttribute("border", "1");

        let headerRow = document.createElement("tr");
        metricsTable.appendChild(headerRow);

        let searchTermHeader = document.createElement("th");
        searchTermHeader.innerHTML = "Search Term";
        headerRow.appendChild(searchTermHeader);

        let searchCount = document.createElement("th");
        searchCount.innerHTML = "Count";
        headerRow.appendChild(searchCount);

        let timeHeader = document.createElement("th");
        timeHeader.innerHTML = "Time";
        headerRow.appendChild(timeHeader);

        for (let i = 0; i < metrics.length; i++) {
            let metric = metrics[i];

            let row = document.createElement("tr");
            metricsTable.appendChild(row);

            let searchTerm = document.createElement("td");
            searchTerm.innerHTML = metric.keyword;
            row.appendChild(searchTerm);
            
            let count = document.createElement("td");
            count.innerHTML = metric.count;
            row.appendChild(count);
            
            let timeSearched = document.createElement("td");
            timeSearched.innerHTML = metric.time;
            row.appendChild(timeSearched);
        }

        document.getElementById("metrics-table").appendChild(metricsTable);
    });
});

function clearMetrics() {
    chrome.storage.sync.set({
        metrics: []
    }, function () {
        let metricsTable = document.getElementById("metrics-table");
        metricsTable.innerHTML = "";
    });
}

function saveOptions() {
    let keywords = document.getElementById("keywords").value.split("\n");
    let options = {
        hyperlink: document.getElementById("hyperlink").value,
        hyperlinkReal: document.getElementById("hyperlink_real").value,
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        icon: document.getElementById("icon").value,
        childNodeIndex: document.getElementById("childNodeIndex").value,
    };

    chrome.storage.sync.set({
        keywords: keywords,
        options: options,
    }, function () {
        let savedMessage = document.getElementById("saved-message");
        savedMessage.innerHTML = "Options saved.";
        setTimeout(function () {
            savedMessage.innerHTML = "";
        }, 750);
    });
}
