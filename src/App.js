import React, {Component} from 'react';
import {Button, Grid, Icon, Image, Message, Segment} from 'semantic-ui-react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    state = {
        manager: '',
        winner: '',
        playersCount: 0,
        balance: 0,
        loading: false,
        showbutton: 'none'

    };


    async componentDidMount() {
        const address = await lottery.methods.getManager().call();
        const playersCount = await lottery.methods.getPlayersCount().call();
        const winner = await lottery.methods.getWinner().call();
        const balance = await lottery.methods.getBalance().call();
        this.setState({
            manager: address,
            winner: winner,
            playersCount: playersCount,
            balance: web3.utils.fromWei(balance, 'ether')
        });
        const accounts = await web3.eth.getAccounts();


        if (accounts[0] === address) {
            //当前登录进来的是管理员
            this.setState({showbutton: 'inline'});
        } else {
            //不是管理员
            this.setState({showbutton: 'none'});

        }

    }

    enter = async () => {
        this.setState({loading: true});
        //获取账户
        const accounts = await web3.eth.getAccounts();
        //拿着彩票只能合约调用enter方法
        await lottery.methods.enter().send({
            from: accounts[0],
            value: '1000000000000000000'
        });
        this.setState({loading: false});
        window.location.reload(true);
    };

    pickWinner = async () => {
        this.setState({loading: true});
        //获取账户
        const accounts = await web3.eth.getAccounts();
        //拿着彩票智能合约调用pickWinner方法
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });
        this.setState({loading: false});
        window.location.reload(true);
    };


    render() {
        console.log(web3.version);
        return (
            <div>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 600}}>
                        <Message info size='huge'>
                            <Message.Header>区块链彩票项目</Message.Header>
                        </Message>
                        <Segment.Group>
                            <Segment>
                                <Grid.Column>
                                    <Image verticalAlign='middle' src="/images/logo.jpg"/>
                                </Grid.Column>
                            </Segment>
                            <Segment textAlign='left'>

                                <Icon color='red' size='big' name='user secret'/>
                                创建者:{this.state.manager}

                            </Segment>
                            <Segment textAlign='left'>

                                <Icon color='orange' size='big' name='users'/>
                                投注人数:{this.state.playersCount}

                            </Segment>
                            <Segment textAlign='left'>

                                <Icon size='big' color='yellow' name='ethereum'/>
                                奖池金额: {this.state.balance} ETHER

                            </Segment>
                            <Segment textAlign='left'>

                                <Icon size='big' color='blue' name='time'/>
                                抽奖时间:每周三晚上8点准时开奖

                            </Segment>
                            <Segment>
                                <Button fluid animated='fade' onClick={this.enter}
                                        loading={this.state.loading} disabled={this.state.loading}>
                                    <Button.Content visible>富贵险中求</Button.Content>
                                    <Button.Content hidden>
                                        <Icon size='big' color='brown' name='bicycle'/>
                                        点一点单车变摩托
                                        <Icon size='big' color='teal' name='motorcycle'/>
                                    </Button.Content>
                                </Button>
                            </Segment>
                            <Segment  style={{display:this.state.showbutton}} >
                                <Segment>
                                    <Button fluid color='yellow' loading={this.state.loading}
                                            disabled={this.state.loading}
                                            onClick={this.pickWinner}>开始抽奖</Button>
                                </Segment>
                                <Segment>
                                    <Button fluid color='red' loading={this.state.loading}
                                            disabled={this.state.loading}>退还本金</Button>
                                </Segment>
                            </Segment>
                        </Segment.Group>
                        <Message info size='huge'>
                            <Message.Header>上期大奖得主是:</Message.Header>
                            <p>{this.state.winner}</p>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}


export default App;
