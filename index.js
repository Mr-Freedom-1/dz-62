

import express from 'express'
import mongoose from 'mongoose';
import {Product} from './model/product.js';
import {Customer} from './model/customer.js';

const PORT = 3000;
const url = 'mongodb://127.0.0.1:27017/shop';
const app = express();

mongoose.connect(url)
    .then(()=> {
        console.log('Connected to DB');
        app.listen(PORT, ()=> {
            console.log(`Server started on http://localhost:${PORT}`);
        })
    })
    .catch((err)=> {console.log(`DB connection error: ${err}`)});

    // app.get('/', (req, res) => {
    //     Product.find()
    //         .then(products => {
    //             const productsHtml = products.map(product => `<div style="border: 1px solid #000; 
    //             width: fit-content; margin: 0 0 20px 0; padding: 0 10px">
    //             <h2>${product.title}</h2>
    //             <p>Price: ${product.price}</p>
    //         </div>`);
    //             const html = `<h1>Products:</h1> ${productsHtml.join('')}`;
    //             res.send(html);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // });

    app.get('/', async (req, res) => {
        try {
            const products = await Product.find();
            const customers = await Customer.find();
    
            const html = customers.map(customer => {
                const product = products.find(product => product._id.toString() === customer.product_id);
    
                return (`<div style="display: flex; align-items: center; border: 1px solid black; margin-bottom: 10px; width: 210px; padding: 0 10px">
                    <p style="margin: 0;">${customer.name}:</p>
                    <p style="margin: 0 15px;">${product.title}</p>
                    <p style="margin: 0;">Price: ${product.price}</p>
                </div>`);
            });
    
            res.send(`<h1>Users purchases:</h1> ${html.join('')}`);
        } catch (err) {
            console.log(err);
        }
    });

    