const asyncHandler = require("express-async-handler");
const Contact =  require("../models/contactModel");

//@desc get all contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async(req, res) =>{
    const contact = await Contact.find({user_id:req.user.id});
    res.status(200).json(contact);
});

//@desc create new contact
//@route POST /api/contacts 
//@access private 
const createContact = asyncHandler(async(req, res) =>{
    console.log("The request body is:", req.body);
    const {name, phone} = req.body;
    if (!name || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    };
    const contact = await Contact.create({
        name,
        phone, 
        user_id: req.user.id
    });
    res.status(201).json({contact});
});

//@desc get a contact
//@route GET /api/contacts/:id
//@access private 
const getContact = asyncHandler(async(req, res) =>{

    // check the existence of the contact 
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    };

    res.status(200).json(contact);
});

//@desc update contact
//@route PUT /api/contacts/:id
//@access private 
const updateContact = asyncHandler(async(req, res) =>{
    // check the existence of the contact 
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    };

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private 
const deleteContact = asyncHandler(async(req, res) =>{
    // check the existence of the contact 
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error ("Contact not found");
    };

    await Contact.remove(contact);
    res.status(200).json(contact);
});


module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
}