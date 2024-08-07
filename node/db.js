const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/data.db');

// Ensure the state table exists; create it if it doesn't
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS state (
      username TEXT PRIMARY KEY,
      balance INTEGER,
      email TEXT,
      phone TEXT
    )`);

    const initialData = [
        { username: 'alice', balance: 1000, email: 'alice@example.com', phone: '123-456-7890' },
        { username: 'bob', balance: 500, email: 'bob@example.com', phone: '234-567-8901' },
        { username: 'charlie', balance: 1500, email: 'charlie@example.com', phone: '345-678-9012' },
        { username: 'david', balance: 200, email: 'david@example.com', phone: '456-789-0123' },
        { username: 'eve', balance: 3000, email: 'eve@example.com', phone: '567-890-1234' },
        { username: 'frank', balance: 800, email: 'frank@example.com', phone: '678-901-2345' },
        { username: 'grace', balance: 1200, email: 'grace@example.com', phone: '789-012-3456' },
        { username: 'henry', balance: 250, email: 'henry@example.com', phone: '890-123-4567' },
        { username: 'ivy', balance: 600, email: 'ivy@example.com', phone: '901-234-5678' },
        { username: 'jack', balance: 900, email: 'jack@example.com', phone: '012-345-6789' }
    ];

    // Insert initial data into the state table
    const stmt = db.prepare('INSERT OR IGNORE INTO state(username, balance, email, phone) VALUES (?, ?, ?, ?)');
    initialData.forEach(({ username, balance, email, phone }) => {
        stmt.run(username, balance, email, phone);
    });
    stmt.finalize();
});

// Function to run SQL queries
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        // Check if the query is a SELECT statement or not
        const isSelect = sql.trim().startsWith('SELECT');
        
        if (isSelect) {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        } else {
            db.run(sql, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        }
    });
}

// Function to close the database connection
function close() {
    db.close();
}

module.exports = {
    query,
    close
};
