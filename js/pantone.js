Vue.prototype.$store = new Vue({
    data: function () {
        var tiles = ["#b5b2b0", "#c5a68b", "#ffffff", "#e8d9c6", "#e50031", "#2d2a28"],
            grouts = [{
                "id": 1,
                "set": 1,
                "name": "White",
                "value": "#f7f3ef"
            }, {
                "id": 39,
                "set": 1,
                "name": "Pergamon",
                "value": "#e8dfd8"
            }, {
                "id": 3,
                "set": 1,
                "name": "Carrara",
                "value": "#e2e0de"
            }, {
                "id": 4,
                "set": 1,
                "name": "Silver",
                "value": "#d8d0c7"
            }, {
                "id": 10,
                "set": 1,
                "name": "Manhattan",
                "value": "#968f86"
            }, {
                "id": 7,
                "set": 1,
                "name": "Gray",
                "value": "#bcaa99"
            }, {
                "id": 12,
                "set": 1,
                "name": "Cementgrey",
                "value": "#aaa49c"
            }, {
                "id": 13,
                "set": 1,
                "name": "Antracite",
                "value": "#968f86"
            }, {
                "id": 14,
                "set": 1,
                "name": "Platinum",
                "value": "#514f4b"
            }, {
                "id": 16,
                "set": 1,
                "name": "Graphite",
                "value": "#514f4e"
            }, {
                "id": 18,
                "set": 1,
                "name": "Coal",
                "value": "#2d2a28"
            }, {
                "id": 79,
                "set": 2,
                "name": "Crocus",
                "value": "#b6c8d1"
            }, {
                "id": 80,
                "set": 2,
                "name": "Sky",
                "value": "#aedeeb"
            }, {
                "id": 64,
                "set": 2,
                "name": "Mint",
                "value": "#b5dcc7"
            }, {
                "id": 67,
                "set": 2,
                "name": "Kiwi",
                "value": "#96be9f"
            }, {
                "id": 70,
                "set": 2,
                "name": "Amazon",
                "value": "#296b66"
            }, {
                "id": 88,
                "set": 2,
                "name": "Ocean",
                "value": "#064760"
            }, {
                "id": 40,
                "set": 3,
                "name": "Jasmine",
                "value": "#e8d9c7"
            }, {
                "id": 22,
                "set": 3,
                "name": "Melba",
                "value": "#fec289"
            }, {
                "id": 41,
                "set": 3,
                "name": "Natura",
                "value": "#f6d3b8"
            }, {
                "id": 43,
                "set": 3,
                "name": "Bahama",
                "value": "#c4a68d"
            }, {
                "id": 46,
                "set": 3,
                "name": "Caramel",
                "value": "#c99475"
            }, {
                "id": 44,
                "set": 3,
                "name": "Toffi",
                "value": "#cb9a74"
            }, {
                "id": 47,
                "set": 3,
                "name": "Siena",
                "value": "#a06b56"
            }, {
                "id": 52,
                "set": 3,
                "name": "Cocoa",
                "value": "#816058"
            }, {
                "id": 55,
                "set": 3,
                "name": "Terra",
                "value": "#a26854"
            }, {
                "id": 58,
                "set": 3,
                "name": "Chocolate",
                "value": "#b85b3d"
            }, {
                "id": 59,
                "set": 3,
                "name": "Brown",
                "value": "#97442d"
            }, {
                "id": 31,
                "set": 4,
                "name": "Rosa",
                "value": "#fee0d4"
            }, {
                "id": 28,
                "set": 4,
                "name": "Cream",
                "value": "#f6d3b8"
            }, {
                "id": 25,
                "set": 4,
                "name": "Sahara",
                "value": "#c4a68d"
            }, {
                "id": 49,
                "set": 4,
                "name": "Clinker",
                "value": "#a3665a"
            }, {
                "id": 37,
                "set": 4,
                "name": "Chilli",
                "value": "#e20c37"
            }, {
                "id": 90,
                "set": 4,
                "name": "Lila",
                "value": "#d2cce8"
            }, {
                "id": 197,
                "set": 4,
                "name": "Pink",
                "value": "#ed96a7"
            }];

        return {
            ver: '1527171480',
            rooms: [{
                "name": "bathroom",
                "wall": true,
                "floor": true
            }, {
                "name": "exterior",
                "wall": false,
                "floor": true
            }, {
                "name": "kitchen",
                "wall": true,
                "floor": true
            }, {
                "name": "livingroom",
                "wall": false,
                "floor": true
            }],
            tiles: tiles,
            grouts: grouts,
            trendCollection: [{
                "id": 102,
                "name": "Marble White",
                "value": "#ffffff"
            }, {
                "id": 111,
                "name": "Iron Grey",
                "value": "#4f6369"
            }, {
                "id": 145,
                "name": "Almondtree",
                "value": "#846453"
            }, {
                "id": 191,
                "name": "Night Glow",
                "value": "#5a5e5d",
                "glow": true
            }, {
                "id": 195,
                "name": "Ice Glow",
                "value": "#a5bdbd",
                "glow": true
            }, {
                "id": 199,
                "name": "Luminous Light",
                "value": "#f89842"
            }],

            roomOn: {},
            colorsOn: {
                wall: {
                    tiles: tiles[0],
                    grout: grouts[0],
                },
                floor: {
                    tiles: tiles[0],
                    grout: grouts[0],
                },
            },
            trans: {
                wall: 'Wall',
                floor: 'Floor',
                rooms: 'Rooms',
                colors: {
                    grout: 'Grout colors',
                    tiles: 'Tiles colors',
                },
            },
        };
    },
});

window.$app().$mount('#root');