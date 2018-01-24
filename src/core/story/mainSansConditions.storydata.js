let story =
{
    //info général sur l'histoire
    _metadata:{
        start:'start1',
        people: {
            nina: {
                backgroundColor:'#f9516e',
                color:'white'
            },
            alex: {
                backgroundColor:'rgb(81, 95, 249)',
                color:'white'
            }
        }
    },

    'start1':{
        mode:'narator',
        title:'',
        messages:[
            {text:'Lundi, 01h30'},
            {text:'Votre téléphone vibre...'},

        ],
        destination:'start2'
    },
    'start2':{
        mode:'narator',
        title:'',
        messages:[
            {text:'"Nouveau message : Petit Frère"'},

        ],
        destination:'chap1'
    },

    //etapes
    'chap1':{
        mode:'sms',
        title:'Petit Frère',
        clearMsg:true,
        messages:[
            {text:'<!NAME!> ?',from:'alex'},
            {text:'Tu dors ?',from:'alex'},
        ],
        answers:[
            {text:'Je suis en pleine partie.',destination:'chap1_pleine_partie'},
            {text:"Non... Tu as pas cours demain Alex ? Tu devrais dormir...",destination:'chap1_devrais_dormir'},
            {text:'Non',destination:'chap1_resp1_non'},
            {text:"(Ne pas répondre)",destination:'chap1_fin_sans_reponse'},
        ]
    },

    'chap1_pleine_partie':{
        messages:[
            {text:"Ah OK...",from:'alex'},
            {text:"Tu as pas cours demain ?",from:'alex'},
        ],
        answers:[
            {text:"Je commence a 9h30 et je finis a 12h. Petite journée quoi ;)",destination:'chap1_fin1'},
            {text:"Bof, j'ai que des cours useless, j'y vais pas ;)",destination:'chap1_fin1'},
        ]
    },

    'chap1_devrais_dormir':{
        messages:[
            {text:"J'y arrive pas...",from:'alex'},
            {text:"Toi aussi tu as cours nan ?",from:'alex'},
        ],
        answers:[
            {text:"Je commence a 9h30 et je finis a 12h. Petite journée quoi ;)",destination:'chap1_fin1'},
            {text:"Bof, j'ai que des cours useless, j'y vais pas ;)",destination:'chap1_fin1'},
        ]
    },

    'chap1_resp1_non':{
        messages:[
            {text:"J'arrive pas à dormir",from:'alex'},
        ],
        answers:[
            {text:"Tu as fait tomber ton doudou ?",destination:'chap1_fin1'},
            {text:"Ya un problème ?",destination:'chap1_fin1'},
        ]
    },

    'chap1_fin1':{
        mode:'sms',
        title:'Alex',
        messages:[
            {text:"Tu pourras venir me chercher demain après les cours stp ?",from:'alex'},
            {text:"Je fini à 15h, ya pas de bus avant 15h30 c'est chiant",from:'alex'},
            {text:"Répond moi quand tu seras levé",from:'alex'},
        ],
    },

    'chap1_fin_sans_reponse':{
        mode:'sms',
        title:'Alex',
        messages:[
            {text:"Tu pourras venir me chercher demain après les cours stp ?",from:'alex'},
            {text:"Je fini à 15h, ya pas de bus avant 15h30 c'est chiant",from:'alex'},
            {text:"Répond moi quand tu seras levé",from:'alex'},
        ],
    },

};

export default story;
