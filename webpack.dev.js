import common from "./webpack.common.js";
import { merge } from "webpack-merge";

export default merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        port: 5500, // default 8080
        watchFiles: ["./src/main.js"],
        open: true
    },
});
