window.onload = function () {
	const error = text => document.body.innerHTML = text;
	const download = url => {
		if (!url) return error("No URL!");
		if (url.indexOf("raw.githubusercontent.com") == -1 && url.indexOf("github.io") == -1) return error(`<a href="${url}">${url}</a> not a valid GitHub File URL!`);
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if (this.status == 200) {
				const tempLink = document.createElement("a");
				tempLink.href = window.URL.createObjectURL(new Blob([this.response]));
				tempLink.download = url.split("/").pop();
				tempLink.click();
			}
			if (this.status == 404) error(`GitHub File <a href"${url}">${url}</a> does not exist!`);
		};
		xhttp.onerror = function() {error(`GitHub File <a href="${url}">${url}</a> does not exist!`);};
		xhttp.open("GET", url, true);
		xhttp.send();
	};
	
	if (!window.location.search) error("No Parameters");
	else {
		const parameterList = {
			plugin: arg => `https://raw.githubusercontent.com/Matt-js-3K/999-theme/main/${arg}/${arg}.plugin.js`,
			theme: arg => `https://raw.githubusercontent.com/Matt-js-3K/999-theme/main/${arg}/${arg}.theme.css`,
			url: arg => arg = arg.startsWith("https://") || arg.startsWith("http://") ? arg : `https://raw.githubusercontent.com/Matt-js-3K/999-theme/master/${arg}`
		};
		for (let parameter in parameterList) {
			let arg = (window.location.search.split(`?${parameter}=`)[1] || "").split("?")[0] || "";
			if (arg) {
				download(parameterList[parameter](arg));
				break;
			}
		}
	}
};
