

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: String,
    product_id: String,
    })

const Customer = mongoose.model('customers', productSchema);

export {Customer};

