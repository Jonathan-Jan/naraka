let story =
{
    _metadata:{
        start:'start'
    },

    'start':{
        mode:'smartphone',
        title:'title',
        messages:[
            {text:'Salut <!NAME!>'},
            {text:'ça va ?'},
            {text:'^.^'},

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
        mode:'smartphone',
        title:'title2',
        messages:[
            {text:'Si mal que ça ?'},
            {text:'x)'},
        ],
    },

};

export default story;
