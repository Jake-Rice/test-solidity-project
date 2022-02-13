import React, { useState } from 'react'
import { ethers } from 'ethers'
import MyContract from '../artifacts/contracts/MyContract.sol/MyContract.json'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const App = () => {
    const [name, setName] = useState()
    const [input, setInput] = useState("")

    const getName = async (event) => {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(contractAddress, MyContract.abi, provider)
        const newName = await contract.getName()
        setName(newName)
    }

    const handleChange = (event) => {
        setInput(event.target.value)
    }

    const handleSubmit = async (event) => {
        const provider = new ethers.providers.JsonRpcProvider()
        const signer = provider.getSigner(0);
        const contract = new ethers.Contract(contractAddress, MyContract.abi, signer)
        const transaction = await contract.changeName(input)
        await transaction.wait()
        setInput("")
    }

    return (
        <div>
            <p style={{fontFamily: 'monospace'}}>
                Contract deployed at:<br/>{contractAddress}
            </p>
            <input type="button" value="Get Name" onClick={getName}/>
            <p>Name: {name}</p>
            <br/>
            <input type="text" value={input} placeholder="New Name" onChange={handleChange}/>
            <br/>
            <input type="button" value="Change Name" onClick={handleSubmit}/>
        </div>
    )
}

export default App