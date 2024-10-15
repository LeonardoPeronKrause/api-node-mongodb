const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

const Car = mongoose.model('Car', {
    brand: String,
    model: String,
    year: Number,
    image_url: String
});

app.get('/', async (req, res) => {
    const cars = await Car.find();
    return res.send(cars);
});

app.delete('/:id', async (req, res) => {
    const car = await Car.findByIdAndDelete(req.params.id);
    return res.send(car);
})

app.put('/:id', async (req, res) => {
    const car = await Car.findByIdAndUpdate(req.params.id, {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        image_url: req.body.image_url
    }, {
        new: true
    });

    return res.send(car);
})

app.post('/', async (req, res) => {
    const car = new Car({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        image_url: req.body.image_url
    })

    await car.save();
    return res.send(car);
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://leonardo:4Sayqc1wzhKoDBTt@api-node.pzmv5.mongodb.net/?retryWrites=true&w=majority&appName=api-node');
    console.log(`Aplicação rodando na porta: ${port}`);
});


// 4Sayqc1wzhKoDBTt