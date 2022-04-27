const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const _ = require('lodash');

router.get('/', customersController.getCustomers);

router.post('/', customersController.postCustomer);

router.put('/:id', customersController.updateCustomer);

router.delete('/:id', customersController.deleteCustomer);

router.get('/customerID?:email', customersController.updateCustByEmail); 





module.exports = router;

