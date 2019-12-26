const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./src/utils/geocode")
const forecast = require('./src/utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define patgs for express config
const publicPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory
app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        author: "Kalfian"
    });
});

app.get("/products", (req, res) => {
    let search = req.query.search;
    if (!search) {
        return res.send({
            error: "you must provide search term"
        });
    }

    res.send({
        products: []
    });
});

app.get("/weather", (req, res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({
            error: "you must provide address term"
        });
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast({
            latitude,
            longitude
        }, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast: data,
                location,
                address: address
            })
        })

    })
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        author: "Kalfian"
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help  Article Not found!",
        author: "Kalfian"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page",
        author: "Kalfian"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404! Not Found",
        author: "Kalfian"
    });
});

app.listen(port, () => {
    console.log("Server runing!");
});