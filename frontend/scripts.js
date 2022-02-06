let productList = []
let carrito = []
let total = 0


function add(productId,price){

    const product = productList.find(p=> p.id === productId)
    product.stock--

    console.log(productId,price)
    carrito.push(productId)
    total = total + price
    document.getElementById('checkout').innerHTML = `Pagar $${total}`
}

async function pay(){
    try{
        const productList = await (await fetch('/api/pay',{
            method: 'post',
            body: JSON.stringify(carrito),
            headers:{
                'Content-Type': 'application/json'
            }
        })).json()
    }
    catch{
        window.alert('Producto sin stock')
    }
    carrito = []
    total = 0
    await fetchProducts()
    document.getElementById('checkout').innerHTML = `Pagar $${total}`
}

////////

function displayProducts(){
    let productsHTML = ''
    productList.forEach((p) => {

        let buttonHTML = `<button class="buttonAdd" onClick="add(${p.id},${p.price})">Agregar</button>`

        if(p.stock <= 0){
            buttonHTML = `<button disabled class="buttonAdd" style="background-color: grey;" onClick="add(${p.id},${p.price})">Sin stock</button>`
        }

        productsHTML +=
        `<div class="productContainer">
            <h3>${p.name}</h3>
            <img src="${p.image}"/>
            <h2>$${p.price}</h2>
            <br>
            ${buttonHTML}
        </div>`
    })
    document.getElementById('page-content').innerHTML = productsHTML
}


async function fetchProducts(){
    productList = await (await fetch('/api/products')).json()
    displayProducts()
}


window.onload = async () =>{
    await fetchProducts()
}

