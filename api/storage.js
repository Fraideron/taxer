/**
 * Created by valeriy on 20.03.17.
 */
module.exports = {
    users: {
        "_id" : 'ObjectId("58b5b9b1c3bdb025cf8c4d06")',
        "meta" : {
            "login": "fraid",
            "password": "testtest",
            "hash": "hashhash"
        },
        "profile":{
            "name": "Valeriy Demidov",
            "birth": "20-12-1986"
        },
        "data" : {
            "payments" : [
                {
                    "date" : "20170218",
                    "bill" : [
                        {
                            "type" : "gas",
                            "expected" : 123,
                            "payed" : 125
                        },
                        {
                            "type" : "electricity",
                            "payed" : 125
                        }
                    ]
                }
            ],
            "wastes" : [
                {
                    "type" : "gas",
                    "value" : 0,
                    "date" : "2017-02-18"
                },
                {
                    "type" : "gas",
                    "value" : 60,
                    "date" : "2017-03-18",
                    "payed" : 40,
                    "rate" : 5
                },
                {
                    "type" : "gas",
                    "value" : 145,
                    "date" : "2017-04-18",

                },
                {
                    "type" : "gas",
                    "value" : 205,
                    "date" : "2017-05-18",
                    "payed" : 5,
                    "rate" : 5
                },
                {
                    "type" : "gas",
                    "value" : 280,
                    "date" : "2017-06-18",

                },
                {
                    "type" : "oil",
                    "value" : 50,
                    "date" : "2017-07-18",
                },
                {
                    "type" : "oil",
                    "value" : 90,
                    "date" : "2017-03-18",
                    "payed" : 25,
                    "rate" : 10
                },
                {
                    "type" : "oil",
                    "value" : 125,
                    "date" : "2017-03-18",
                    "payed" : 50,
                    "rate" : 10
                },
                {
                    "type" : "electric",
                    "value" : 143,
                    "date" : "2017-04-18",

                },
                {
                    "type" : "electric",
                    "value" : 210,
                    "date" : "2017-03-18",
                    "payed" : 50,
                    "rate" : 10
                },
                {
                    "type" : "electric",
                    "value" : 285,
                    "date" : "2017-03-18",
                    "payed" : 100,
                    "rate" : 10
                }
            ],
            "taxes" : [
                {
                    "name": "gas",
                    "type": "rate",
                    "amount": 10
                },
                {
                    "name": "electric",
                    "type": "rate",
                    "amount": 5
                },
                {
                    "name": "oil",
                    "type": "rate",
                    "amount": 25
                },
            ]
        }
    }
};