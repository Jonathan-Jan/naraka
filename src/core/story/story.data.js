let story =
{
    //info général sur l'histoire
    _metadata:{
        start:'start',
        people: {
            nina: {
                backgroundColor:'#f9516e',
                color:'white'
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
            {text:'Ah',from:'nina'},
            {text:':/',from:'nina'},
        ],
    },

    'resp2':{
        title:'title2',
        messages:[
            {text:'Si mal que ça ?',from:'nina'},
            {text:'x)',from:'nina'},
        ],
    },

};

export default story;
