# express-paypal-express-checkout
ExpressJs Paypal Express Checkout using REST API

## Installation & Configuration

```
npm install 
```

Configure client_id, secret and mode in configura.js

```
paypal.configure({
  'mode': 'sandbox', //sandbox or live 
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});
```

### Run Express App

```
npm start
```

Access the app in http://localhost:3000 and follow the workflow
