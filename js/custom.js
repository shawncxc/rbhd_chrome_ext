// https://api.robinhood.com/quotes/?symbols=

// adjusted_previous_close: "240.5000"
// ask_price: "232.5000"
// ask_size: 100
// bid_price: "231.5200"
// bid_size: 200
// has_traded: true
// instrument: "http://api.robinhood.com/instruments/a4ecd608-e7b4-4ff3-afa5-f77ae7632dfb/"
// last_extended_hours_trade_price: "232.2500"
// last_trade_price: "233.5200"
// last_trade_price_source: "consolidated"
// previous_close: "240.5000"
// previous_close_date: "2018-02-01"
// symbol: "NVDA"
// trading_halted: false
// updated_at: "2018-02-03T01:00:00Z"

function getTick(tick) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.robinhood.com/quotes/?symbols=" + tick, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			// JSON.parse does not evaluate the attacker's scripts.
			var resp = JSON.parse(xhr.responseText);
			var quote = resp.results[0];
			var lastPrice = document.getElementById("last_price");
			lastPrice.innerHTML = quote.last_trade_price;
			var askPrice = document.getElementById("ask_price");
			askPrice.innerHTML = quote.ask_price;
			var bidPrice = document.getElementById("bid_price");
			bidPrice.innerHTML = quote.bid_price;
		}
	}
	xhr.send();
}

var tickInput = document.getElementById("tick");
var submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function() {
	var tick = tickInput.value;
	getTick(tick);
});


