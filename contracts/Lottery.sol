pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    address[] public players;
    address public winner;

    function Lottery() public {
        //消息的花费者,创者者地址
        manager = msg.sender;
    }

    function getWinner() public view returns (address){
        return winner;
    }

    function getManager() public view returns (address){
        return manager;
    }

    //投注彩票
    function enter() public payable {
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }
    //此代码可以部署测试了
    //创建方法获取所有参与者
    function getAllPlayers() public view returns (address[]){
        return players;
    }

    //次方法可以直接获取本合约内所存储的所有coin
    //奖池金额查询
    function getBalance() public view returns (uint) {
        return this.balance;
    }
    //参与人数查看
    function getPlayersCount() public view returns (uint) {
        return players.length;
    }

    //创建随机数
    //伪随机代码
    //热扩散分布值,风扇噪音随机值
    function random() private view returns (uint){
        //1.区块时间block.difficult,由全网算力决定目标是15s
        //now指区块当前产生时间
        return uint(keccak256(block.difficulty, now, players));
    }

    //挑选获奖者
    function pickWinner() public onlyManagerCanCall {
        //        require(msg.sender == manager);
        uint _index = random() % players.length;
        winner = players[_index];
        //代表初始值是一个空的地址数组,且内部只有0个值
        //这样可以重复开奖
        players = new address[](0);
        winner.transfer(this.balance);
    }
    //退款的逻辑
    function refund() public onlyManagerCanCall {

        for (uint i = 0; i < players.length; i++) {
            players[i].transfer(1 ether);
        }
        players = new address[](0);
    }

    //抽取修饰符
    //模板代码
    modifier onlyManagerCanCall(){
        require(msg.sender == manager);
        _;//这里代表的就是被修饰的方法的内容
    }

}
