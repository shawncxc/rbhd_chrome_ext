// https://github.com/aurbano/robinhood-node/blob/master/src/robinhood.js

/* 
examples:

historical quotes:
https://api.robinhood.com/quotes/historicals/?symbols=IRBT&interval=5minute&span=day&bounds=trading

*/


const endpoint = {
	getQuote: (symbols, interval, span) => ["https://api.robinhood.com/quotes/historicals/?symbols=", `&interval=${interval}&span=${span}`].join(symbols),
	login: "https://api.robinhood.com/api-token-auth/",
	getAccount: "https://api.robinhood.com/accounts/",
	getWatchList: "https://api.robinhood.com/watchlists/Default",
};

export default endpoint;