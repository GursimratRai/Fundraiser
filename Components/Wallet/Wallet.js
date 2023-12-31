import styled from 'styled-components'
import {ethers} from 'ethers';
import {useState} from 'react'
import { toast } from 'react-toastify';

const networks = {
    polygon:{
        chainId:`0x${Number(80001).toString(16)}`,
        chainName:"Polygon Testnet",
        nativeCurrency:{
            name:"MATIC",
            symbol:"MATIC",
            decimals: 18
        },
        rpcUrls:["https://rpc-mumbai.maticvigil.com/"],
        blockExplorerUrls:["https://mumbai.polygonscan.com/"],
    },
};

const Wallet = () => {
    const [address , setAddress] = useState("");
    const [balance , setBalance] = useState("");
    const ConnectWallet = async () => {
        console.log("win",window.ethereum);
        if ( typeof window.ethereum === 'undefined' ) {
            toast.error("Please Install MetaMask in your browser");
        } else {
            await window.ethereum.request({method:"eth_requestAccounts"});
            const provider = new ethers.providers.Web3Provider(ethereum,"any");
            if(provider.network !== 'matic'){
                await window.ethereum.request({method:'wallet_addEthereumChain',params:[
                    {
                        ...networks["polygon"]
                    }
                ]})
                const accounts = provider.getSigner();
                const Address = await accounts.getAddress();
                setAddress(Address);
                const Balance = ethers.utils.formatEther(await accounts.getBalance());
                setBalance(Balance);
            }
        }
    }
    return (
      <ConnectWalletWrapper onClick={ConnectWallet}>
        {balance === "" ? <Balance></Balance> : <Balance>{balance.slice(0,4)} MATIC</Balance>}
        {address === "" ? <Address>Connect Wallet</Address> : <Address>{address.slice(0,6)}...{address.slice(39)}</Address>}
      </ConnectWalletWrapper>
    )
}

const ConnectWalletWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme.bgDiv};
    padding: 5px 9px;
    height: 100%;
    color: ${(props) => props.theme.color};
    border-radius: 10px;
    margin-right: 15px;
    font-family: 'Roboto';
    font-weight: bold;
    font-size: small;
    cursor: pointer;
`;

const Address = styled.h2`
    background-color: ${(props) => props.theme.bgSubDiv};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 5px 0px 5px;
    border-radius: 10px;
`

const Balance = styled.h2`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`

export default Wallet