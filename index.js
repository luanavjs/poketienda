const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json());
app.use(cors());

let products = [
    {
        id:1,
        name:"Pikachu disfraz de Snorlax",
        price: 1500,
        image: "imgs/pikachu-1.jpg",
        stock: 3
    },
    {
        id:2,
        name:"Piplup",
        price: 500,
        image: "imgs/piplup-1.jpg",
        stock: 7
    },
    {
        id:3,
        name:"Torchic",
        price: 500,
        image: "imgs/torchic-1.jpg",
        stock: 5
    },
    {
        id:4,
        name:"Meowth",
        price: 600,
        image: "imgs/meowth-1.jpg",
        stock: 5
    },
    {
        id:5,
        name:"Greninja",
        price: 700,
        image: "imgs/greninja-1.jpg",
        stock: 5
    },
    {
        id:6,
        name:"Eeve",
        price: 500,
        image: "imgs/eeve-1.jpg",
        stock: 5
    }
    

]

require('dotenv').config()

app.get('/api/products', (req, res) => {
  res.send(products)
})

app.post('/api/pay', (req,res) => {
    const ids = req.body
    const productsCopy = products.map(p=>({...p}))
    ids.forEach(id=> {
        const product = productsCopy.find(p=> p.id === id)
        if(product.stock > 0){
            product.stock--
        } else {
            throw('Producto sin stock')
        }
        
    })
    products = productsCopy
    res.send(products)
})

app.use('/',express.static('frontend'))

const port = process.env.PORT

app.listen(port,() =>{
    console.log(`server running at port ${port}`)
})