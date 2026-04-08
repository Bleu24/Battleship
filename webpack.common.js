import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js",
        clean: true
    },
    dotenv: {
        prefix: ["VISUAL_CROSSING_", "BIG_DATA_CLOUD_"]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|gif|jpeg|jpg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/i,
                type: "asset/source"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            title: "Basic Template" // change this, this changes the title docs
        })
    ]
};
