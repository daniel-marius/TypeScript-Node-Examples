"use strict";
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
(0, node_fetch_1["default"])("https://pokeapi.co/api/v2/pokemon/")
    .then(function (res) { return res.json(); })
    .then(function (data) { return console.log(data); });
