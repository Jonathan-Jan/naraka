import {EventEmitter} from 'eventemitter3';

import storyData from 'core/story/story.data';

class Answer {
    constructor(answer) {
        this.text = answer.text;
        this.destination = answer.destination;
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
}

class Message {
    constructor(msg) {
        this.text = msg.text;
        this.from = msg.from;
        this.writeTime = msg.writeTime || 3000;
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
}

class Step {
    constructor(step) {
        this.mode = step.mode; //sms / chat / face a face ...
        this.title = step.title;
        this.messages = step.messages ? step.messages.map((msg) => {return new Message(msg).compile()}) : undefined;
        this.answers = step.answers ? step.answers.map((answer) => {return new Answer(answer).compile()}) : undefined;
        this.cursor = 0; //message en cours de lecture
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

        let promise = new Promise((resolve) => {
			setTimeout(() => {
                this.cursor++;
                resolve(message)
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

        //historique : permet de pouvoir faire des retour en arrière
        this.history = [];

        //étape en cours de lecture
        this.step = {};

        //curseur de l'étape en cours de lecture
        this.moveCursor(storyData._metadata.start);
    }

    start() {
        this.runStep();
    }

    async runStep() {
        this.emitter.emit(EVENT.NEW_STEP, this.getStep());
        while(this.step.hasMessage()) {
            let message = await this.step.nextMessage();
            //on récupère le style associé a cet emetteur
            message.style = this.storyData._metadata.people[message.from];
            this.emitter.emit(EVENT.MESSAGE,message);
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
        this.step = new Step(this.storyData[this.storyCursor]);
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
    answer(answer) {
        //on commence par vérifier que la destination est bien disponible
        // let found = false;
        // this.step.answers.map((ans) => {if (ans.destination === answer.destination) found = true;});
        // if (!found) throw new Error("Cette réponse n'existe pas");

        this.moveCursor(answer.destination);
        this.runStep();
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
