const handleImage = (req, res, knex) => {
    const { id } = req.body;
    console.log(id)
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => {
            res.status(400).json("Unable to find user assosciated with said ID")
        })

}

const handleAPICall = (req, res) => {
    const IMAGE_URL = req.body.input;
    console.log(IMAGE_URL)

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": "clarifai",
            "app_id": "main"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + '53dde7666ba34f5296b5828a2d5e0eb4'
        },
        body: raw
    };
    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
        .then(response => {
            console.log(response.status); // Check the response status code
            console.log(response.headers.get('Content-Type'));
            console.log(response);
            return response.text()
        })
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(error => {
            console.log('Error:', error);
            res.status(500).json('Unable to process the image');
        });
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall

}
