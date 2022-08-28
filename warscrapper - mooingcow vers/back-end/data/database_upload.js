const fs = require('fs');
var db = require('./databaseConnect.js');

var data = fs.readFileSync('./all_items.json', 'utf8');
var jsondata = JSON.parse(data);
var items = jsondata.items;

//write into database
var dbConn = db.getConnection();
dbConn.connect(function (err) {
    if (err) {//database connection gt issue!
        console.log(err);
        return callback(err, null);
    } else {
        for(var i = 0; i < items.length; i++) {
            var item_name = items[i].item_name;
            var item_url = items[i].url_name;
            console.log(item_name);
            var insertItem =
            `
            INSERT INTO items (item_name, item_url)
            VALUES (?, ?);
            `;
            dbConn.query(
            insertItem,
            [item_name, item_url],
            (error, results) => {
                if (error == 'ER_DUP_ENTRY') {
                    console.log('Duplicate entry');
                } else if (error) {
                    console.log(error)
                }
            })
        }
    }
});