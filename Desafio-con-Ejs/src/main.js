
const express = require('express');
const path = require('path')
const publicPath = path.resolve(__dirname, '../public');


let productos = [
  {
		"id": 1,
		"title": "The Very Best of the Doors 2CD",
		"price": 13.07,
		"thumbnail": "https://m.media-amazon.com/images/I/91hrbype4aL._SY355_.jpg"
	},
	{
		"id": 2,
		"title": "Blood Sugar Sex Magik",
		"price": 9.99,
		"thumbnail": "https://m.media-amazon.com/images/I/81hS2wgxbhL._SY355_.jpg"
	},
	{
		"id": 3,
		"title": "Pearl Jam Completely Unplugged Limited Edition",
		"price": 49.77,
		"thumbnail": "https://m.media-amazon.com/images/I/81NDZb-JShL._SY355_.jpg"
	}
];



// Inicializacion de servidor, definicion y asignacion de puerto
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server arriba en puerto', puerto)
);

//Captura de error
server.on('error', (err) => {
  console.log('ERROR', err);
});


// Se agrega lo sig para poder trabajar correctamente con lo que nos envian en el body de un POST o PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicPath));


//Definimos al view engine ejs y lo configuramos
app.set('view engine', 'ejs')
app.set("views", "./views");


app.get('/productos', (req, res) => {
	const prods = productos

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});

app.post('/productos', (req, res) => {
    const prod = req.body
	const newProd = { ...prod, id: productos[productos.length-1].id + 1 }
    productos.push(newProd)
	console.log(newProd);
    res.redirect('/productos')
})