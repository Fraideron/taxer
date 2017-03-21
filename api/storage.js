/**
 * Created by valeriy on 20.03.17.
 */
module.exports = {
    users: {
        "_id" : 'ObjectId("58b5b9b1c3bdb025cf8c4d06")',
        "login" : [],
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
                    "value" : 123,
                    "date" : "2017-02-18"
                },
                {
                    "type" : "oil",
                    "value" : 133,
                    "date" : "2017-03-18",
                    "payed" : 40,
                    "rate" : 4
                },
                {
                    "type" : "electric",
                    "value" : 143,
                    "date" : "2017-04-18",
                    "payed" : 0,
                    "rate" : 0
                }
            ],
            "taxes" : [
                {}
            ]
        }
    }
};