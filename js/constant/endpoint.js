// https://github.com/aurbano/robinhood-node/blob/master/src/robinhood.js

/* 
examples:

quotes:
1D: https://api.robinhood.com/quotes/NVDA/
1W: https://api.robinhood.com/quotes/historicals/NVDA/?symbol=NVDA&bounds=regular&span=week&interval=10minute
1M: https://api.robinhood.com/quotes/historicals/NVDA/?symbol=NVDA&bounds=regular&span=year&interval=day
3M: https://api.robinhood.com/quotes/historicals/NVDA/?symbol=NVDA&bounds=regular&span=year&interval=day
1Y: https://api.robinhood.com/quotes/historicals/NVDA/?symbol=NVDA&bounds=regular&span=year&interval=day
5Y: https://api.robinhood.com/quotes/historicals/NVDA/?symbol=NVDA&bounds=regular&span=5year&interval=week

current positions:
https://api.robinhood.com/accounts/5QZ22711/positions/?nonzero=true

ratings:
https://api.robinhood.com/midlands/ratings/?ids=<instrument_ids>
https://api.robinhood.com/midlands/ratings/a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb/

popularity:
https://api.robinhood.com/instruments/a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb/popularity/

tags:
https://api.robinhood.com/midlands/tags/instrument/a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb/

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
	removeWatchList: (instrumentId) => `https://api.robinhood.com/watchlists/Default/${instrumentId}/`,
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
	getRating: (instrumentIds) => `https://api.robinhood.com/midlands/ratings/?ids=${instrumentIds}`,
	getPopularity: (instrumentId) => `https://api.robinhood.com/instruments/${instrumentId}/popularity/`,
};

export default endpoint;