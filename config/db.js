// config/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to SQLite database file
const dbPath = path.resolve(__dirname, '../database/database.sqlite');

// Create and export the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
        // Create products table if it doesn't exist
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    price REAL,
                    quantity INTEGER
                )
            `, (err) => {
                if (err) {
                    console.error('Could not create table', err);
                } else {
                    console.log('Products table ready');
                    
                    // Insert sample data if the table is empty
                    db.get('SELECT COUNT(*) AS count FROM products', (err, row) => {
                        if (err) {
                            console.error('Error checking products count', err);
                        } else if (row.count === 0) {
                            const insert = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
                            const sampleProducts = [
                                { name: 'Product 1', price: 10.0, quantity: 5 },
                                { name: 'Product 2', price: 20.5, quantity: 2 },
                                { name: 'Product 3', price: 15.75, quantity: 1 },
                            ];

                            sampleProducts.forEach((product) => {
                                db.run(insert, [product.name, product.price, product.quantity], (insertErr) => {
                                    if (insertErr) {
                                        console.error('Error inserting sample product', insertErr);
                                    }
                                });
                            });
                            console.log('Sample products inserted');
                        }
                    });
                }
            });
        });
    }
});

module.exports = db;
