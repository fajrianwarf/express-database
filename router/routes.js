const router = require('express').Router();
const connection = require('../config/mysql')

router.get('/', (req, res) => {
    connection.query({
        sql: 'SELECT * FROM products'
    }, (error, result) => {
        if(error) {
            res.send({
                status: 'failed',
                response: 'failed to fetch data'
            });
        }else {
            res.send({
                status: 'success',
                response: 'result'
            })
        }
    })
});

module.exports = router;