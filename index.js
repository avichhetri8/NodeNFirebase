const cors = require('cors')
const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const port = 5000
const { db } = require('./firebase.js')

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.json())

const friends = {
    'james': 'friend',
    'larry': 'friend',
    'lucy': 'friend',
    'banana': 'enemy',
}

app.get('/products', async (req, res) => {
    debugger
    console.log("ada")
    try{
    const peopleRef = await db.collection('Products').get()
    console.log("doc", peopleRef)
    if (peopleRef.empty) {
        return res.sendStatus(400)
    }
    let products = []
    peopleRef.forEach((doc) => {
        products.push({
          id: doc.id, // Document ID
          ...doc.data() // Document data
        });
      });

    res.status(200).json(products);
}catch(e){
    console.log("errr", e)
}
})


app.post('/addProduct', async (req, res) => {
    const { name, id } = req.body
    const peopleRef = db.collection('Products')
    const res2 = await peopleRef.add({
        [name]: name,
        id: id
    }, { merge: true })
    // friends[name] = status
    res.status(200).send(res2)
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))