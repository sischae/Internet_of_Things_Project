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
    auth_user(req, res, next, 'index');
});


// return settings page
app.get('/settings', async (req, res, next) => {
    auth_user(req, res, next, 'settings');
});


// return logout page
app.get('/logout', async (req, res) => {
    res.render('logout');
});


// log out
app.get('/req_logout', async (req, res, next) => {
    auth_user(req, res, next, 'req_logout');
});


// return list of log in activity
app.get('/activity', async (req, res, next) => {
    auth_user(req, res, next, 'activity');
});





/******************************************************************************************
GET LOG-IN ACTIVITIY
******************************************************************************************/

function get_activity(req, res, next, username, role) {
    let log = JSON.parse('[]');
    
    // open database
    let db = new sqlite3.Database('./data/data.db', sqlite3.OPEN_READWRITE, (err) => {                      // connect to database
        if (err) {                                                                                          // catch errors
            return console.error(err.message);
        }
    });
    
    // check if user has permission to fetch all users data
    if(role == 'admin') {
        // fetch all entries
        db.serialize(() => {
            db.each(`SELECT timestamp as timestamp, user as user FROM log_users`, (err, row) => {               // read all entries from table
            if (err) {                                                                                          // catch errors
                console.error(err.message);                                                                     // log
            }
            
            let time = new Date(row.timestamp)
            let time_formatted = time.toLocaleString();
            log.push({"timestamp":time_formatted + ': ',"user":row.user.charAt(0).toUpperCase() + row.user.slice(1)});
            });
        });
    } else {
        // fetch users entries
        db.serialize(() => {
            db.each(`SELECT timestamp as timestamp, user as user FROM log_users WHERE user = "` + username + `"`, (err, row) => {
            if (err) {                                                                                          // catch errors
                console.error(err.message);                                                                     // log
            }
            
            let time = new Date(row.timestamp)
            let time_formatted = time.toLocaleString();
            log.push({"timestamp":time_formatted + ': ',"user":row.user.charAt(0).toUpperCase() + row.user.slice(1)});
            });
        });
    }
    // close the database connection
    db.close((err) => {                                                                                     // close database connection
        if (err) {                                                                                          // catch errors
            res.status(500).send('Internal Error');                                                         // send error information to client
            return console.error(err.message);                                                                  // log
        }
        
        res.status(200).send(JSON.stringify(log.reverse()));                                                    // reverse array to show latest activities first
        next();
    });
}




/******************************************************************************************
AUTHENTICATE USER
******************************************************************************************/

// authenticate user an redirect to correct page
function auth_user(req, res, next, redirect) {
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
            if (err) throw err;                                                                                 // catch errors
            
            let hash_in = derivedKey.toString('hex');                                                           // generate hash for given username and password
            let hash_db = 'init';                                                                               // stores hash from database
            let last_login = 0;
            let role = '';

            
            // open database
            let db = new sqlite3.Database('./data/data.db', sqlite3.OPEN_READWRITE, (err) => {                  // connect to database
                if (err) {                                                                                      // catch errors
                    return console.error(err.message);                                                          // log
                }
            });

            // fetch all users
            db.serialize(() => {
                db.each(`SELECT username as username, hash as hash, timestamp as timestamp, role as role FROM users`, (err, row) => {
                    if (err) {                                                                                  // catch errors
                        console.error(err.message);                                                             // log
                    }
                    
                    // filter username
                    if(row.username == username) {                                                              // filter users
                        hash_db = row.hash;                                                                     // get hash from database
                        last_login = row.timestamp;
                        role = row.role;
                    }
                });
            });

            // close the database connection
            db.close((err) => {                                                                                 // close database connection
                if (err) {                                                                                      // catch errors
                    return console.error(err.message);                                                          // log
                }
                
                
                // compare generated hash with hash from database
                if (hash_in == hash_db) {                                                                       // If Authorized user
                    // log activity
                    let db = new sqlite3.Database('./data/data.db');                                            // connect to database
                    
                    // update timestamp of last activity
                    let time = Date.now();
                    
                    if((time - last_login) > 30 * 60 * 1000) {                                                  // if users last login was more than 30 minutes ago -> new log in
                        db.run('INSERT INTO log_users(timestamp, user) VALUES("' + Date.now() + '", "' + username + '")', function(err) {
                            if (err) {                                                                          // catch errors
                                return console.log(err.message);                                                // log
                            }
                        });
                    }
                    
                    db.run('UPDATE users SET timestamp = ' + time + ' WHERE username = "' + username + '";', function(err) {
                        if (err) {                                                                              // catch errors
                            return console.log(err.message);                                                    // log
                        }
                    });
    
                    
                    db.close();                                                                                 // close database connection
                    
                    
                    res.setHeader('WWW-Authenticate', 'Basic');
                    switch(redirect) {
                            case 'activity':
                                get_activity(req, res, next, username, role);
                                break;
                            
                            case 'req_logout':
                                let db = new sqlite3.Database('./data/data.db');                                // connect to database
                            
                                // reset timestamp to indicate log out
                                db.run('UPDATE users SET timestamp = 0 WHERE username = "' + username + '";', function(err) {
                                    if (err) {                                                                              // catch errors
                                        return console.log(err.message);                                                    // log
                                    }
                                });
                            
                                db.close();                                                                                 // close database connection
                                res.status(200).send('OK');
                                break;
                            
                            default:
                                res.render(redirect, {username: username.charAt(0).toUpperCase() + username.slice(1)});     // make first letter uppercase
                                next();
                                break;
                    }
                } else {                                                                                        // invalid login
                    var err = new Error('You are not authenticated!');
                    err.status = 401;
                    return next(err);
                }
            });
          });
    }
}



app.listen(3000, () => {
    console.log('Server running. Listening on port 3000...');
});
