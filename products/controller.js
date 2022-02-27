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
    const {  name, price, stock, status } = req.body;
    connection.query({
        sql: 'INSERT INTO products ( name, price, stock, status ) VALUES ( ?, ?, ?, ? )',
        values: [ name, price, stock, status ]
    }, _response(res));
}

const update = (req, res) => {
    const {  name, price, stock, status } = req.body;
    connection.query({
        sql: 'UPDATE products SET name = ?, price = ?, stock = ?, status = ? WHERE id = ?',
        values: [ name, price, stock, status, req.params.id ]
    }, _response(res));
}

const destroy = (req, res) => {
    connection.query({
        sql: 'DELETE FROM products WHERE id = ?',
        values: [req.params.id]
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


module.exports = { index, view, store, update ,destroy }