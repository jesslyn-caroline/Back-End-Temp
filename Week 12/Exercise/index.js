import express from 'express';
import Supplier from './supplier.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded())
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})

app.get('/', (req, res) => {
    Supplier.findAll().then((result) => {
        res.render('pages/home', { supplier: result })
    })
})

app.get('/create', (req, res) => {
    res.render('pages/add');
})

app.get('/edit/:id', (req, res) => {
    Supplier.findOne({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.render('pages/edit', { supplier: result })
    })
})

app.delete('/api/supplier/:id', (req, res) => {
    Supplier.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json({
            status: 500,
            error: null,
            response: 'Data successfully deleted'
        })
    }).catch((err) => {
        res.json({
            status: 400,
            error: err,
            response: {}
        })
    })
})

app.post('/api/suppliers', (req, res) => {
    Supplier.create({
        company_name: req.body.company_name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active
    }).then(() => {
        res.json({
            status: 500,
            error: null,
            response: 'Data successfully added'
        })
    }).catch((err) => {
        res.json({
            status: 400,
            error: err,
            response: {}
        })
    })
})

app.put('/api/supplier/:id', (req, res) => {
    Supplier.update({
        company_name: req.body.company_name,
        contact_name: req.body.contact_name,
        email: req.body.email,
        phone: req.body.phone,
        active: req.body.active
    }, {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.json({
            status: 500,
            error: null,
            response: 'Data successfully updated'
        })
    }).catch((err) => {
        res.json({
            status: 400,
            error: err,
            response: {}
        })
    })
})