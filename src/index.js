'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const util = require('util');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');



// return landing page
app.get('/', async (req, res, next) => {
    var authheader = req.headers.authorization;
    res.setHeader('WWW-Authenticate', 'Basic');
 
    // ceck if authheader is empty
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
    } else {
        // get username and password from header
        var auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];
        
        // generate and compare hashes
        crypto.pbkdf2(password, username, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) throw err;                                                                             // catch errors
            
            let hash_in = derivedKey.toString('hex');                                                       // generate hash for given username and password
            let hash_db = 'init';                                                                           // stores hash from database
            
            
            // open database
            let db = new sqlite3.Database('./data/data.db', sqlite3.OPEN_READWRITE, (err) => {              // connect to database
                if (err) {                                                                                  // catch errors
                    return console.error(err.message);                                                      // log
                }
            });

            // fetch all users
            db.serialize(() => {
                db.each(`SELECT username as username, hash as hash FROM users`, (err, row) => { // read all cars from database
                    if (err) {                                                                              // catch errors
                        console.error(err.message);                                                         // log
                    }
                    
                    // filter username
                    if(row.username == username) {                                                          // filter users
                        hash_db = row.hash;                                                                 // get hash from database
                    }
                });
            });

            // close the database connection
            db.close((err) => {                                                                             // close database connection
                if (err) {                                                                                  // catch errors
                    return console.error(err.message);                                                      // log
                }
                
                
                // compare generated hash with hash from database
                if (hash_in == hash_db) {
                    // If Authorized user
                    res.setHeader('WWW-Authenticate', 'Basic');
                    res.render('index', {username: username.charAt(0).toUpperCase() + username.slice(1)});  // make first letter uppercase
                    next();
                } else {                                                                                    // invalid login
                    var err = new Error('You are not authenticated!');
                    err.status = 401;
                    return next(err);
                }
            });
          });
    }
});


// return logout page
app.get('/logout', async (req, res) => {
    res.render('logout');
});




app.listen(3000, () => {
    console.log('Server running. Listening on port 3000...');
});
