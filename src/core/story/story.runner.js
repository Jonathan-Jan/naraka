import {EventEmitter} from 'eventemitter3';
import _ from 'lodash';

// import storyData from 'core/story/test.storydata';
// import storyData from 'core/story/main.storydata';
// import storyData from 'core/story/mainSansConditions.storydata';
import storyData from 'core/story/generated.storydata';

/**
 * Verifie que les conditions du message sont présente dans celles passé en parametre
 * @return {Boolean} vrai si les conditions sont remplies
 */
function checkConditions(conditions) {
    //aucune condition => vrai
    if (this.hasConditions.length === 0) return true;

    for (let i = 0; i < this.hasConditions.length; i++) {
        //si la condition du message n'est pas présente dans le tableau en parametre => faux
        if (conditions.indexOf(this.hasConditions[i]) < 0) return false;
    }

    return true;
}

class Answer {
    constructor(answer) {
        this.text = answer.text;
        this.destination = answer.destination;
        this.setConditions = answer.setConditions  || [];
        this.hasConditions = answer.hasConditions  || [];
    }

    /**
     * Remplace les variables par leur valeur
     * TODO
     * @return {[type]} [description]
     */
    compile(){
        this.text = this.text;
        return this;
    }

    /**
     * Verifie que les conditions du message sont présente dans celles passé en parametre
     * @return {Boolean} vrai si les conditions sont remplies
     */
    checkConditions = checkConditions.bind(this)
}

class Message {
    constructor(msg, noWriteTime) {
        this.text = msg.text;
        this.from = msg.from;
        if (noWriteTime) {
            msg.writeTime = 0;
        }
        this.writeTime = msg.writeTime !== undefined ? msg.writeTime : 3000;
        this.hasConditions = msg.hasConditions || [];
    }

    /**
     * Remplace les variables par leur valeur
     * TODO
     * @return {[type]} [description]
     */
    compile(){
        this.text = this.text;
        return this;
    }

    /**
     * Verifie que les conditions du message sont présente dans celles passé en parametre
     * @return {Boolean} vrai si les conditions sont remplies
     */
    checkConditions = checkConditions.bind(this)
}

class Step {
    constructor(step, gameData) {
        this.mode = step.mode; //mode de présentation de l'étape : sms / chat / face a face ...
        this.title = step.title;
        this.messages = step.messages ? step.messages.map((msg) => {return new Message(msg, step.mode === 'narator').compile()}) : undefined;
        this.answers = step.answers ? step.answers.map((answer) => {return new Answer(answer).compile()}) : undefined;
        this.cursor = 0; //message en cours de lecture
        this.destination = step.destination; //dans le cas ou le joueur n'a pas de réponse possible, l'étape doit avoir un attribut destination
        this.clearMsg = step.clearMsg; //signifit qu'il faut nettoyer les messages

        //données de la partie en cours (conditions...)
        this.gameData = gameData;
    }

    /**
     * Methode asynchrone pour simuler le "temps" d'écriture du message
     * @return {Promise} [description]
     */
    async nextMessage() {

        if (!this.hasMessage()) {
            throw new Error('Aucun message en attente');
        }

        let message = this.messages[this.cursor];

        //gestion des conditions.
        //Si le message necessite des condtions, on verifie qu'elles sont remplies
        if (!message.checkConditions(this.gameData.conditions)) {
            this.cursor++;
            return this.hasMessage() ? this.nextMessage() : undefined;
        }

        let promise = new Promise((resolve) => {

            if (message.writeTime <= 0) {
                this.cursor++;
                resolve(message);
                return;
            }

			setTimeout(() => {
                this.cursor++;
                resolve(message);
            }, message.writeTime);
		});
		return promise;
    }

    /**
     * vrai si il reste encore des messages a recevoir
     * @return {Boolean} [description]
     */
    hasMessage() {
        return !(this.cursor >= this.messages.length);
    }

    getAnswers() {
        let answers = _.filter(this.answers, (answer) => {
            if (answer.checkConditions(this.gameData.conditions)) return answer;
        });
        return answers;
    }
}

const EVENT = {
    MESSAGE:'MESSAGE',
    NEW_STEP:'NEW_STEP',
    STEP_DONE:'STEP_DONE',
}

class StoryRunner {

    constructor() {
        //pause active ou non
        this.isPaused = false;

        //event emitter : permet d'informer les composants que l'étape a évolué et qu'il faut se mettre à jour
        this.emitter = new EventEmitter();

        //story en cours de lecture
        this.storyData = storyData;
        this.metadata = this.formateMetadata(this.storyData._metadata);

        //historique : permet de pouvoir faire des retour en arrière
        this.history = [];

        //données lié a la partie en cours
        this.gameData = {
            //tableau des conditions "gagné" par le joueur
            //les conditions permette de modifié les messages affiché et les réponses dispo au sein d'une même étape
            conditions:[]
        };

        //étape en cours de lecture
        this.step = {};

        //curseur de l'étape en cours de lecture
        this.moveCursor(this.metadata.start);
    }

    formateMetadata(_metadata) {
        let metadata = _metadata;
        let people = {};

        _metadata.people.map((pupil) => {
            people[pupil.name] = pupil;
        });

        metadata.people = people;
        return metadata;
    }

    start() {
        this.runStep();
    }

    /**
     * Déroulement des messages successif de l'étape
     * @return {Promise} [description]
     */
    async runStep() {
        this.emitter.emit(EVENT.NEW_STEP, this.getStep());
        while(this.step.hasMessage()) {
            let message = await this.step.nextMessage();
            if (message) {
                //on récupère le style associé a cet emetteur
                message.style = {};
                if (message.from && this.metadata.people[message.from]) {
                    message.style = this.metadata.people[message.from];
                }
                this.emitter.emit(EVENT.MESSAGE,message);
            }
        }
        this.emitter.emit(EVENT.STEP_DONE);
    }

    moveCursor(cursor) {

        if (!this.storyData[cursor]) {
            throw new Error(`No step found for ${cursor}`);
        }

        //curseur de l'étape en cours de lecture
        this.storyCursor = cursor;

        //mise à jour de l'étape
        //on récupère le mode et le titre de l'étape en cours pour les conserver dans le cas ou la nouvelle étape n'en a pas
        let {mode,title} = this.step;
        this.step = new Step(this.storyData[this.storyCursor], this.gameData);
        this.step.mode = this.step.mode ? this.step.mode : mode;
        this.step.title = this.step.title ? this.step.title : title;

        this.history.push(this.step);
    }

    /**
     * met en pause la lecture auto des message
     * @return {[type]} [description]
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * Récupérer l'étape courrante de l'histoire
     * @return {[type]} [description]
     */
    getStep() {
        return this.step;
    }

    /**
     * choisi une réponse et passe à l'étape suivante
     * @return {[type]} [description]
     */
    moveTo(destination) {

        destination = destination || this.step.destination;

        this.moveCursor(destination);
        this.runStep();
    }

    answer(answer) {
        //si cette réponse doit set des conditions, on les ajoute dans les gameData
        if (answer.setConditions.length > 0) {
            this.gameData.conditions = this.gameData.conditions.concat(answer.setConditions);
        }

        this.moveTo(answer.destination);
    }

    onMessage(callback) {
        this.emitter.on(EVENT.MESSAGE, callback);
    }
    onStepDone(callback) {
        this.emitter.on(EVENT.STEP_DONE, callback);
    }
    onNewStep(callback) {
        this.emitter.on(EVENT.NEW_STEP, callback);
    }

}

export default StoryRunner;
