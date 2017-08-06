import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {
        cards: [
        ]
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };


    render() {
        return (
            <div>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>GitHub Cards</h2>
                    </div>
                    <p className="App-intro">
                        create cards with GitHub API.
                    </p>

                </div>
                <div className="Card">
                    <Form onSubmit={this.addNewCard}/>
                    <CardList cards={this.state.cards}/>
                </div>
            </div>

        );
    }
}

const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img className="Pic" width='75' src={props.avatar_url} alt={"avatar of " + props.name}/>
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.id} {...card}/>)}
        </div>
    );
};

class Form extends Component {
    state = {username: ''};

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Event: Form submitted", this.state.username);
        axios.get(`https://api.github.com/users/${this.state.username}`)
            .then(resp => {
                this.props.onSubmit(resp.data);
                this.setState({ username: '' })
            });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                       value={this.state.username}
                       onChange={(event) => this.setState({username: event.target.value})}
                       placeholder="Github username" required
                />
                <button type="submit">add card</button>
            </form>
        );
    }
}

export default App;
