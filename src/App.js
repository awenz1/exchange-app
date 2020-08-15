import React from 'react';
import './App.css';
import axios from 'axios';

axios.all([
    axios.get('https://api.gemini.com/v1/pubticker/ethusd'),
    axios.get('https://api.gemini.com/v1/pubticker/btcusd'),
    axios.get('https://api.binance.us/api/v3/ticker/24hr?symbol=ETHUSD'),
    axios.get('https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSD')
])
    .then(response => {
        console.log('gemini ETH bid: $', response[0].data.bid);
        console.log('gemini ETH ask: $', response[0].data.ask);
        console.log('gemini BTC bid: $', response[1].data.bid);
        console.log('gemini BTC ask: $', response[1].data.ask);
        console.log('binance ETH bid: $', response[2].data.bidPrice);
        console.log('binance ETH ask: $', response[2].data.askPrice);
        console.log('binance BTC bid: $', response[3].data.bidPrice);
        console.log('binance BTC ask: $', response[3].data.askPrice);
    });

class GetRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gemBTCask: null,
            gemBTCbid: null,
            gemETHask: null,
            gemETHbid: null,
            biBTCask: null,
            biBTCbid: null,
            biETHask: null,
            biETHbid: null
        };
    }

    componentDidMount() {

        Promise.all([
            fetch(`https://api.gemini.com/v1/pubticker/ethusd`),
            fetch(`https://api.gemini.com/v1/pubticker/btcusd`),
            fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=ETHUSD`),
            fetch(`https://api.binance.us/api/v3/ticker/24hr?symbol=BTCUSD`)
        ])
            .then(([gemEthRes, gemBtcRes,biEthRes, biBtcRes]) => {
                if (!gemEthRes.ok) return gemEthRes.json().then(e => Promise.reject(e));
                if (!gemBtcRes.ok) return gemBtcRes.json().then(e => Promise.reject(e));
                if (!biEthRes.ok) return biEthRes.json().then(e => Promise.reject(e));
                if (!biBtcRes.ok) return biBtcRes.json().then(e => Promise.reject(e));

                return Promise.all([gemEthRes.json(), gemBtcRes.json(),biEthRes.json(),biBtcRes.json()]);
            })
            .then(([gemEth, gemBtc,biEth, biBtc]) => {
                this.setState({
                    gemETHask: gemEth.ask,
                    gemETHbid: gemEth.bid,
                    gemBTCask: gemBtc.ask,
                    gemBTCbid: gemBtc.bid,
                    biETHask: biEth.askPrice,
                    biETHbid: biEth.bidPrice,
                    biBTCask: biBtc.askPrice,
                    biBTCbid: biBtc.bidPrice
                });
            })
            .catch(error => {
                console.error({ error });
            });
    }

    render() {
        var BTCBidMore=false;
        var ETHBidMore=false;
        var BTCAskMore=false;
        var ETHAskMore=false;
        const { gemBTCask } = this.state;
        const { gemBTCbid } = this.state;
        const { gemETHask } = this.state;
        const { gemETHbid } = this.state;
        const { biBTCask } = this.state;
        const { biBTCbid } = this.state;
        const { biETHask } = this.state;
        const { biETHbid } = this.state;

        if(gemBTCbid > biBTCbid){BTCBidMore=true;}
        if(gemBTCask < biBTCask){BTCAskMore=true;}
        if(gemETHbid > biETHbid){ETHBidMore=true;}
        if(gemETHask < biETHask){ETHAskMore=true;}

        return (
            <div className="App">
                <header className="App-header"> Crypto Currency Exchange</header>
                <div className="grid-container">
                    <div className="grid-item title1"> Gemini </div>
                    <div className="grid-item title2"> Binance </div>
                    <div className="grid-item thing1"> Sell </div>
                    <div className="grid-item thing2"> Buy </div>
                    <div className="grid-item thing3"> Sell </div>
                    <div className="grid-item thing4"> Buy </div>
                    <div className="grid-item"> BTC </div>
                    <div className={BTCBidMore ? 'background-green' : 'grid-item'}>${gemBTCbid}</div>
                    <div className={BTCAskMore ? 'background-green' : 'grid-item'}>${gemBTCask}</div>
                    <div className={!BTCBidMore ? 'background-green' : 'grid-item'}>${biBTCbid}</div>
                    <div className={!BTCAskMore ? 'background-green' : 'grid-item'}>${biBTCask}</div>
                    <div className="grid-item"> ETH </div>
                    <div className={ETHBidMore ? 'background-green' : 'grid-item'}>${gemETHbid}</div>
                    <div className={ETHAskMore ? 'background-green' : 'grid-item'}>${gemETHask}</div>
                    <div className={!ETHBidMore ? 'background-green' : 'grid-item'}>${biETHbid}</div>
                    <div className={!ETHAskMore ? 'background-green' : 'grid-item'}>${biETHask}</div>
                </div>
            </div>
        );

    }
}
export default GetRequest;
