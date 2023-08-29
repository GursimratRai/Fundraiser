import React from 'react'
import styled from 'styled-components'
import FormLeftWrapper from './FormLeftWrapper'
import FormRightWrapper from './FormRightWrapper'
import {useState, createContext} from 'react'
import { TailSpin } from 'react-loader-spinner'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import CampaignFactory from '../../artifacts/contracts/Campaign.sol/CampaignFactory.json'

const FormState = createContext();

const Form = () => {

    const [form,setForm] = useState({
        campaignTitle:"",
        story:"",
        requiredAmount:"",
        category:"education",
    });
    
    const [loading,setLoading] = useState(false);
    const [address,setAddress] = useState("");
    const [uploaded,setUploaded] = useState(false);

    const FormHandler = (e) => {
         setForm({
            ...form,[e.target.name]:e.target.value
         })
    }

    const [image,setImage] = useState(null);

    const ImageHandler = (e) => {
        setImage(e.target.files[0]);    
    }

    const [storyUrl,setStoryUrl] = useState("");
    const [imageUrl , setImageUrl] = useState("");
    
    const startCampaign = async(e) => {
       e.preventDefault();
       if ( typeof window.ethereum === 'undefined' ) {
            toast.error("Please Install MetaMask in your browser");
       } else {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            if (form.campaignTitle == "" ){
                toast.warn("Title Field is Empty");
            } else if (form.story == "") {
                toast.warn("Story Field is Empty");
            } else if (form.requiredAmount == "") {
                toast.warn("Required Amount Field is Empty");
            } else if (uploaded === false) {
                toast.warn("Files Upload Reqired");
            } else {
                setLoading(true);
                const contract = new ethers.Contract(
                    process.env.NEXT_PUBLIC_ADDRESS,
                    CampaignFactory.abi,
                    signer
                );
            
                const RequiredAmount = ethers.utils.parseEther(form.requiredAmount);
                
                const campaignData = await contract.createCampaign(
                    form.campaignTitle,
                    RequiredAmount,
                    storyUrl,
                    form.category,
                    imageUrl
                );

                await campaignData.wait();
                setAddress(campaignData.to)
            }   
        }    
    }

  return (
    <FormState.Provider value={{form,setForm,image,setImage,ImageHandler,FormHandler,imageUrl,setImageUrl,storyUrl,setStoryUrl,startCampaign,uploaded,setUploaded}}>
    <FormWrapper>
        <FormMain>
            { loading == true ?
                address === "" ?
                    <Spinner>
                        <TailSpin height={60} />
                    </Spinner>:
                <Address>
                    <h1>Campaign started successfully</h1>  
                    <h1>{address}</h1>
                    <Button>
                        Go to Campaign  
                    </Button>
                </Address> 
                :              
                <FormInputsWrapper>
                <FormLeftWrapper />
                <FormRightWrapper />
                </FormInputsWrapper>
            }
        </FormMain>
    </FormWrapper>
    </FormState.Provider>
  )
}

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`
const FormTitle = styled.div`
    width:100%;
    justify-content:center;
    align-items:center;
    text-transform:capitalize;
    font-weight:bold;
`
const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    font-family:'Poppins';
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
    justify-content:center;
    width:30% ;
    padding:15px ;
    color:white ;
    background-color:#4285F5 ;
    background-image:
    linear-gradient(180deg, #4285F5 0%, #1A0DBE 80%) ;
    border:none;
    border-radius:20px;
    margin-top:30px ;
    cursor: pointer;
    font-weight:bold ;
    font-size:large ;
`

export default Form
export {FormState};