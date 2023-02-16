import axios from 'axios';
import {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_SECRET_CLIENT} from '../config'

export const createOrder = async (req, res)=> {

    const order = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount:{
                currency_code: 'USD',
                value: '300.33',
            },
            description: "Instalador de aplicaciond edit",

        },
    ],
    application_context:{
        brand_name: "Mycompany.com",
        landing_page: "Login",
        user_action: "PAY_NOW",
        return_url: "http://localhost:3000/capturar-order",
        cancel_url: "http://localhost:3000/cancel-order",

     },

    };
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_SECRET_CLIENT,

        },

    });
    console.log(response)
    res.send('gay');
}

export const capturandoOrder = (req, res)=> {

    res.send('Capturando Orden')


}

export const cancelandoOrder = (req, res)=> {

    res.send('Cancelando Orden')


}