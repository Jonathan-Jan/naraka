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
        title:'Nina',
        messages:[
            {text:'Salut <!NAME!>',from:'nina'},
            {text:'ça va ?',from:'nina'},
            {text:'^.^',from:'nina'},
            {text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
            ,from:'nina'},

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
            {text:':/',from:'nina'},
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
