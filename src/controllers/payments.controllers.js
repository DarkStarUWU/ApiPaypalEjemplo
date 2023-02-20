import axios from 'axios';
import {PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, HOSTs, HOST} from '../config'

export const createOrder = async (req, res)=> {
    try {
        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "300.70",
                    },
                    description: "COMPRAR SERVICIOS GAY DE XIXICO",
                }
    
            ],
            application_context: {
                brand_name: "MyCompany",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `${HOST}/capturar-order`,
                cancel_url: `${HOST}/cancelar-order`,
            }
        };
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
    
        const {data: {access_token}} = await axios.post(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, params, {
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded',
                
            },
            auth: {
                username: PAYPAL_API_CLIENT,
                password: PAYPAL_API_SECRET,
    
        }
    
        });
        // console.log(data);
    
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
            headers:{
                Authorization: `Bearer ${access_token}`
    
            }
        });
    
        console.log(response.data)
        res.json(response.data)
    
    } catch (error) {
        return res.status(500).send('algo fue mal')
    }
}

export const capturandoOrder = async(req, res)=> {

    const {token, PayerID} = req.query;

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, 
    {        
        auth:{
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET,
    }})

    console.log(response.data)
    res.send("xixixcogay");


}

export const cancelandoOrder = (req, res)=> {

    res.send('Cancelando Orden')


}