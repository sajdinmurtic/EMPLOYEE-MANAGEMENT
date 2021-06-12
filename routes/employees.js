const express = require('express');
const router = express.Router();
const employee = require("../controllers/emp-controller");


router.get('/', employee.list);


router.get('/view/:id', employee.findById);


router.get('/create', employee.create);


router.post('/save', employee.save);




router.get('/delete/:id', employee.delete);

module.exports = router;