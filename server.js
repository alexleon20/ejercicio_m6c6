const express = require('express');
const app = express();
const axios = require('axios');
const jimp = require('jimp');
const moment = require('moment')

moment.locale('es')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/url', async (req, res) => {
    //entre el 1 y el 80 hay casas. Elegir una alazar
    const random = Math.floor(Math.random() * 80)
    //Imprimir en la foto una frase de GOT
    const {data} = await axios.get(`https://anapioficeandfire.com/api/houses/${random}`)
    let houses = (`${data.coatOfArms}`)


    const url = req.query.url;
    const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let img;

    try {
        img = await jimp.read(url)
    } 
    catch (error) {
        return res.send('Imagen no se puede subir iamgen')
    }

    img.greyscale()
    img.quality(60)
    img.resize(350, Jimp.AUTO)
    
    await img.print(font, 10, 10, houses)
    await img.writeAsync('public/newimg.jpg')
    res.send('/newimg.jpg')
});

app.listen(3000,()=>{
    console.log('Server en el puerto 3000');
});