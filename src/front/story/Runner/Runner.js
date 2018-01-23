import React, { Component } from 'react';

import './Runner.css';
import MainMenu from 'front/story/MainMenu';
import PauseBtn from 'front/story/PauseBtn';
import SwitchMode from 'front/story/Runner/SwitchMode';

import StoryRunner from 'core/story/story.runner';

class Runner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step:{},
            messages:[],
            stepDone:false
        };
    }

    addMessage(message) {
        let messages = this.state.messages;
        messages.push(message);
        this.setState({messages:messages});
        window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
    }

    onAnswer(answer) {
        this.addMessage({text:answer.text,from:'player'});
        this.storyRunner.answer(answer);
    }

    componentDidMount() {

        //on initialise la story
        this.storyRunner = new StoryRunner();

        //on récupère l'étape en cours
        //this.setState({step:this.storyRunner.getStep()});

        this.storyRunner.onMessage((message) => {
            this.addMessage(message);
        });

        this.storyRunner.onStepDone(() => {
            this.setState({stepDone:true});
        });

        this.storyRunner.onNewStep((step) => {
            this.setState({step:step});
        });

        this.storyRunner.start();
    }

    render() {
        return (
            <div className='Runner'>
                <div id='menu-runner'>
                    <MainMenu/>
                    <PauseBtn/>
                </div>
                <SwitchMode
                    mode={this.state.step.mode}
                    title={this.state.step.title}
                    messages={this.state.messages}
                    answers={this.state.step ? this.state.step.answers : null}
                    stepDone={this.state.stepDone}
                    onAnswer={(answer) => this.onAnswer(answer)}
                    />
            </div>
        );
    }

}

export default Runner;
