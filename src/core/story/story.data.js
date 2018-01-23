let story =
{
    //info général sur l'histoire
    _metadata:{
        start:'start',
        people: {
            nina: {
                backgroundColor:'white',
                color:'pink'
            }
        }
    },


    //etapes
    'start':{
        mode:'sms',
        title:'title',
        messages:[
            {text:'Salut <!NAME!>',from:'nina'},
            {text:'ça va ?',from:'nina'},
            {text:'^.^',from:'nina'},

        ],
        answers:[
            {text:'Bof',destination:'resp1'},
            {text:"Comme d'hab",destination:'resp2'},
        ]
    },

    'resp1':{
        messages:[
            {text:'Ah'},
            {text:':/'},
        ],
    },

    'resp2':{
        title:'title2',
        messages:[
            {text:'Si mal que ça ?'},
            {text:'x)'},
        ],
    },

};

export default story;
