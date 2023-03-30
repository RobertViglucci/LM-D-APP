import abi from "./abi/abi.json" assert {type: "json"};

const connect = new Promise((res, rej) => {
  window.addEventListener("load", async () => {
    if(typeof window.ethereum == "undefined"){
      rej("Install Metamask");
    }

    await window.ethereum.request({method: "eth_requestAccounts"});

    // create an instance of Web3 using Ganache's RPC server
    const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

    const contract = new web3.eth.Contract(
      abi,
      "0x79C3CD69EAB525FbE337de5Ca3577def02Be9463"
    );

    web3.eth.getAccounts().then((accounts)=>{
        contract.methods.
        totalSupply().
        call({from: accounts[0]}).
        then((supply) =>{
            contract.methods.
        getBuildings().
        call({from: accounts[0]}).
        then((data) =>{
            res({supply: supply, buildings: data});
            
        });
            
        });
    });
  });
});

export default connect;


