import React from 'react';
import axios from 'axios';
import './App.css';

function App() {

    return (
        <div className="Rates">

            <p id="gemETCBidrate"></p>
            <p id="gemETCAskrate"></p>
            <p id="gemBTCBidrate"></p>
            <p id="gemBTCAskrate"></p>
            <p id="biETCBidrate"></p>
            <p id="biETCAskrate"></p>
            <p id="biBTCBidrate"></p>
            <p id="biBTCAskrate"></p>

        </div>
    );
}

axios.all([
    axios.get('https://api.gemini.com/v1/pubticker/ethusd'),
    axios.get('https://api.gemini.com/v1/pubticker/btcusd'),
    axios.get('https://api.binance.us/api/v3/ticker/24hr?symbol=ETHUSD'),
    axios.get('https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSD')
])
    .then(response => {
        var gemETCBidrate = response[0].data.bid;
        document.getElementById("gemETCBidrate").innerHTML= gemETCBidrate;
        var gemETCAskrate =response[0].data.ask;
        document.getElementById("gemETCAskrate").innerHTML = gemETCAskrate;
        var gemBTCBidrate = response[1].data.bid;
        document.getElementById("gemBTCBidrate").innerHTML= gemBTCBidrate;
        var gemBTCAskrate = response[1].data.ask;
        document.getElementById("gemBTCAskrate").innerHTML= gemBTCAskrate;
        document.getElementById("biETCBidrate").innerHTML=response[2].data.bidPrice;
        document.getElementById("biETCAskrate").innerHTML=response[2].data.askPrice;
        document.getElementById("biBTCBidrate").innerHTML=response[3].data.bidPrice;
        document.getElementById("biBTCAskrate").innerHTML=response[3].data.askPrice;
        console.log('gemini ETH bid: $', response[0].data.bid);
        console.log('gemini ETH ask: $', response[0].data.ask);
        console.log('gemini BTC bid: $', response[1].data.bid);
        console.log('gemini BTC ask: $', response[1].data.ask);
        console.log('binance ETH bid: $', response[2].data.bidPrice);
        console.log('binance ETH ask: $', response[2].data.askPrice);
        console.log('binance BTC bid: $', response[3].data.bidPrice);
        console.log('binance BTC ask: $', response[3].data.askPrice);
    });

/*class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gemBTCask: null,
            gemBTCbid: null,
            gemETHask: null,
            gemETHbid: null
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        Promise.all([
            fetch('https://api.gemini.com/v1/pubticker/ethusd'),
            fetch('https://api.gemini.com/v1/pubticker/btcusd')
        ]).then(function(responses) {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(function(data){
            console.log(data);
        }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
        });
       /* fetch('https://api.gemini.com/v1/pubticker/ethusd')
            .then(response => response.json())
            .then(data => this.setState({ gemETHask: data.ask }));
        fetch('https://api.gemini.com/v1/pubticker/ethusd')
            .then(response => response.json())
            .then(data => this.setState({ gemETHbid: data.bid }));
        fetch('https://api.gemini.com/v1/pubticker/btcusd')
            .then(response => response.json())
            .then(data => this.setState({ gemBTCask: data.ask }));
        return fetch('https://api.gemini.com/v1/pubticker/btcusd')
            .then(response => response.json())
            .then(data => this.setState({ gemBTCask: data.ask }));

    }

    render() {
        const { gemBTCask } = this.state;
        const { gemBTCbid } = this.state;
        const { gemETCask } = this.state;
        const { gemETCbid } = this.state;
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Simple GET Request</h5>
                <div className="card-body">
                    gemini BTC bid: $: {gemBTCbid}
                </div>
                <div className="card-arm">
                    gemini BTC ask: $: {gemBTCask}
                    </div>
                <div className="card-ear">
                    gemini ETC bid: $: {gemETCbid}
                </div>
                <div className="card-leg">
                    gemini ETC ask: $: {gemETCask}
                </div>
            </div>
        );
    }
}*/

export default App;
//export default GetRequest;