const connection = require('../config/mysql')

// --- Router start ---
const index = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products'
    }, _response(res));
}

const view = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products WHERE id = ?',
        values: [req.params.id]
    }, _response(res));
}

const store = (req, res) => {
    const { id, name, price, stock, status } = req.body
    connection.query({
        sql: 'INSERT INTO products (id, name, price, stock, status) VALUES (?, ?, ?, ?, ?)',
        values: [id, name, price, stock, status]
    }, _response(res));
}

// --- Router end ---

const _response = (res) => {
    return (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: error
            });
        }else {
            res.send({
                status: 'success',
                response: result
            });
        }
    }
}


module.exports = { index, view, store }