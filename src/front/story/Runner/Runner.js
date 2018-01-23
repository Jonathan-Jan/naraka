import React, { Component } from 'react';

import './Runner.css';
import MainMenu from 'front/story/MainMenu';
import PauseBtn from 'front/story/PauseBtn';
import NextStepBtn from 'front/story/NextStepBtn';
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
    }

    onAnswer(answer) {
        this.addMessage({text:answer.text,from:'player'});
        this.storyRunner.moveTo(answer.destination);
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
            let messages = step.clearMsg === true || step.mode === 'narator' ? [] : this.state.messages;
            this.setState({step:step,stepDone:false,messages:messages});
        });

        this.storyRunner.start();
    }

    componentDidUpdate(prevProps, prevState) {
        window.scroll({ top: 2500, left: 0, behavior: 'smooth' });
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
                <NextStepBtn onClick={() => this.storyRunner.moveTo()} visible={this.state.stepDone && !this.state.step.answers && this.state.step.destination}/>
            </div>
        );
    }
}

export default Runner;
