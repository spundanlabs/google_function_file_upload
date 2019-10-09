const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();


app.use(fileUpload({
    createParentPath: true
}));

app.get('/', (req, res) => {
    res.send('done');
})

app.post("/api/Upload", function (req, res) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            let avatar = req.files.avatar;

            avatar.mv('./img/' + avatar.name);
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("Server listening on port " + port);
});