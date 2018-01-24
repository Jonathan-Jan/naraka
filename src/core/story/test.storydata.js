let story =
{
    //info général sur l'histoire
    _metadata:{
        start:'cond_test',
        people: {
            nina: {
                backgroundColor:'#f9516e',
                color:'white'
            }
        }
    },

    'start':{
        mode:'narator',
        title:'',
        messages:[
            {text:'1111 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'},
            {text:'2222 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'},
        ],
        destination:'start1'
    },


    //etapes
    'start1':{
        mode:'sms',
        title:'Nina',
        clearMsg:true,
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
            {text:"(narateur)",destination:'nar1'},
        ]
    },

    'resp1':{
        messages:[
            {text:'Ah',from:'nina'},
            {text:':/',from:'nina'},
        ],
        destination:'nar1'
    },

    'resp2':{
        title:'title2',
        messages:[
            {text:'Si mal que ça ?',from:'nina'},
            {text:'x)',from:'nina'},
        ],
    },

    'nar1':{
        mode:'narator',
        title:'',
        messages:[
            {text:'Fin =)'},
        ],
    },

    'cond_test':{
        mode:'sms',
        title:'Nina',
        clearMsg:true,
        messages:[
            {text:'Salut <!NAME!>',from:'nina'},

        ],
        answers:[
            {text:'cond1',destination:'cond_resp',setConditions:['cond1']},
            {text:'cond2',destination:'cond_resp',setConditions:['cond2']},
            {text:'cond3',destination:'cond_resp',setConditions:['cond3']},
        ]
    },

    'cond_resp':{
        messages:[
            {text:'cond1',from:'nina',hasConditions:['cond1']},
            {text:'cond2',from:'nina',hasConditions:['cond2']},
            {text:'cond3',from:'nina',hasConditions:['cond3']},

        ],
        answers:[
            {text:'cond1',destination:'cond_resp',hasConditions:['cond1']},
            {text:'cond2',destination:'cond_resp',hasConditions:['cond2']},
            {text:'cond3',destination:'cond_resp',hasConditions:['cond3']},
        ]
    },

};

export default story;
