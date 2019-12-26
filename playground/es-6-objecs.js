// Object property shorthand

const name = 'Andrew'
const userAge = 27

// Make it shorthand
const user = {
    name: 'Andrew',
    age: 27,
    location: 'Philadelphia'
}

console.log(user)


// Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

//const label = product.label
//const stock = product.stock

const {
    label: productLabel,
    stock
} = product
console.log(productLabel)


const transaction = (type, {
    label,
    stock
}) => {
    console.log(type, label, stock)
}

transaction('order', product)