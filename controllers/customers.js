const { Customer, validate, validateUpdate } = require('../models/customer');

async function getCustomers (req, res ) {
    const customer = await Customer.find();
    res.send(customer);
}

async function postCustomer (req, res ) {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({email: req.body.email});
    if (customer) return res.status(400).send('Email already registered');

    customer = new Customer({ 
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    await customer.save();

    res.send(customer);
}

async function updateCustomer (req, res ) {
    const { error } = validateUpdate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const emailCheck = await Customer.findOne({email: req.body.email});
    if (emailCheck) return res.status(400).send('Email already registered');

    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone }, {
        new: true
    });

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
}

async function deleteCustomer (req, res ) {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
}

async function updateCustByEmail (req, res ) {
    const customer = await Customer.find({email: req.query.email});

    if (!customer) return res.status(404).send('The customer with the given email was not found!');

    const customerID = customer[0];

    res.send(_.pick(customerID, ['_id']));
}

module.exports = {
    getCustomers,
    postCustomer,
    updateCustomer,
    deleteCustomer,
    updateCustByEmail
}