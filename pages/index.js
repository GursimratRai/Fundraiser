import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useState , useEffect } from 'react';
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Index({AllData,HealthData,EducationData,AnimalData}) {
  const [filter, setFilter] = useState(AllData);
  const [clickable,setClickable] = useState(false);

  useEffect(() => {
    const Request = async () => {    
      if (typeof window.ethereum !== 'undefined') {
        setClickable(true);
      } else {
        toast.error("Please Install MetaMask in your browser");
      }
    }
    Request();  
  }, [])
  
  return (
    <HomeWrapper>

      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>

      {/* Card */}
      {filter.map((e) => {
        return (
          <Card key={e.title}>
          <CardImg>
            <Image 
              alt="dapp image"
              layout='fill' 
              src={"https://ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title>
            {e.title}
          </Title>
          <CardData>
            <Text><AccountBoxIcon />Owner</Text> 
            <TextValue>{e.owner.slice(0,6)}...{e.owner.slice(39)}</TextValue>
          </CardData>
          <CardData>
            <Text><PaidIcon />Amount</Text> 
            <TextValue>{e.amount.slice(0,4)} Matic</TextValue>
          </CardData>
          <CardData>
            <Text><EventIcon /></Text>
            <TextValue>{new Date(e.timeStamp * 1000).toUTCString()}</TextValue>
          </CardData>
          <Link passHref href={clickable ? '/' + e.address : "" }><Button>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
  )
}

export async function getStaticProps(){
 
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  const contract = new ethers.Contract(
     process.env.NEXT_PUBLIC_ADDRESS,
     CampaignFactory.abi,
     provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title:e.args.title,
      image:e.args.imageUrl,
      timeStamp:parseInt(e.args.timestamp),
      amount:ethers.utils.formatEther(e.args.requiredAmount),
      owner:e.args.owner,
      address:e.args.campaingAddress
  }});

  const getHealthCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Health');
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
    title:e.args.title,
    image:e.args.imageUrl,
    timeStamp:parseInt(e.args.timestamp),
    amount:ethers.utils.formatEther(e.args.requiredAmount),
    owner:e.args.owner,
    address:e.args.campaingAddress
  }});
    
  const getEducationCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'education');
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title:e.args.title,
      image:e.args.imageUrl,
      timeStamp:parseInt(e.args.timestamp),
      amount:ethers.utils.formatEther(e.args.requiredAmount),
      owner:e.args.owner,
      address:e.args.campaingAddress
  }});

  const getAnimalCampaigns = contract.filters.campaignCreated(null,null,null,null,null,null,'Animal');
  const  AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);    
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title:e.args.title,
      image:e.args.imageUrl,
      timeStamp:parseInt(e.args.timestamp),
      amount:ethers.utils.formatEther(e.args.requiredAmount),
      owner:e.args.owner,
      address:e.args.campaingAddress
  }});
                
  return {
      props:{
        AllData,
        HealthData,
        EducationData,
        AnimalData
  }
  }

};

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Graduate', cursive;
  font-size: 20px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  color: #003366;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  color: #200E4B;
  font-size: 18px;
  font-weight: bold;
`
const TextValue = styled.p`
display: flex;
align-items: center;
margin: 0;
padding: 0;
font-family: 'Roboto';
color: #262864;
font-size: 18px;
font-weight: bold;
`

const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#4285F5 ;
  background-image:
  linear-gradient(180deg, #4285F5 0%, #1A0DBE 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`