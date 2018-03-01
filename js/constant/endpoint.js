// https://github.com/aurbano/robinhood-node/blob/master/src/robinhood.js

/* 
examples:

historical quotes:
https://api.robinhood.com/quotes/historicals/?symbols=IRBT&interval=5minute&span=day&bounds=trading

current positions:
https://api.robinhood.com/accounts/5QZ22711/positions/?nonzero=true

*/


const endpoint = {
	getQuote: (symbols, interval, span) => {
		if (span === "day")
			return ["https://api.robinhood.com/quotes/historicals/?symbols=", `&interval=${interval}&span=${span}&bounds=extended`].join(symbols);

		return ["https://api.robinhood.com/quotes/historicals/?symbols=", `&interval=${interval}&span=${span}`].join(symbols)
	},
	getCurrentQuote: (symbol) => `https://api.robinhood.com/quotes/${symbol}/`,
	login: "https://api.robinhood.com/api-token-auth/",
	getAccount: "https://api.robinhood.com/accounts/",
	getWatchList: "https://api.robinhood.com/watchlists/Default",
	addWatchList: "https://api.robinhood.com/watchlists/Default/bulk_add/",
	placeOrder: "https://api.robinhood.com/orders/",
	getNews: (symbol, url) => {
		if (!url) {
			return `https://api.robinhood.com/midlands/news/${symbol}/?page=1`;
		}

		let urlArr = url.split("/");
		let pageParam = urlArr[urlArr.length - 1];
		if (pageParam === "") {
			return `https://api.robinhood.com/midlands/news/${symbol}/?page=1`;
		} else {
			return `https://api.robinhood.com/midlands/news/${symbol}/${pageParam}`;
		}
	},
	getFundamental: (symbol) => `https://api.robinhood.com/fundamentals/${symbol}/`,
};

export default endpoint;