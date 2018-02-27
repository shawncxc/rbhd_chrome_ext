const path = require("path");

module.exports = {
	entry: ["./js/app.js"],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["babel-preset-env", "babel-preset-react"]
					}
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
		]
	}
};