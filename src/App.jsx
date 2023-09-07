import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";


const getVatNumberInfos = async (countryCode, vatNumber) => {
    try {
        const vatZohoCatalystUrl = `https://apivatchecker-785528922.development.catalystserverless.com/server/api_vat_checker_function/vatchecker?countrycode=${countryCode}&vatnumber=${vatNumber}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: vatZohoCatalystUrl,
        };

        return (await axios.request(config)).data;

    } catch (e) {
        console.error(e.message);
    }
}

const CountryCodes = Object.freeze({
    Belgium: "BE",
    France: "FR",
    Germany: "DE",
})

function App() {
    const [vatInfos, setVatInfos] = useState({
        code: CountryCodes.Belgium,
        number: "0478971548"
    })

    const [vatResponse, setVatResponse] = useState({});

    const [vatNumber, setVatNumber] = useState("0478971548");
    const [countryCode, setCountryCode] = useState(CountryCodes.Belgium);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await getVatNumberInfos(vatInfos.code, vatInfos.number);
            const responseData = response.data;
            console.info({ responseData })
            setVatResponse(responseData);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setVatInfos(prevState => ({ ...prevState, number: vatNumber}))
    }, [vatNumber]);

    useEffect(() => {
        setVatInfos(prevState => ({ ...prevState, code: countryCode}))
    }, [countryCode]);


  return (
    <>
        <form onSubmit={handleSubmitForm}>
            <div style={{ display: 'flex', flexDirection: 'column', alignsItems: 'start'}} className={'card'}>
                <div style={{ marginBlock: '0.5rem'}}>
                    <label htmlFor="vatNumber">Number : </label>
                    <input id={'vatNumber'} onChange={(e) => setVatNumber(e.target.value)} value={vatNumber}/>
                </div>
                <div>
                    <label htmlFor="countryCode">Country code : </label>
                    <input id={'countryCode'} onChange={(e) => setCountryCode(e.target.value)} value={countryCode}/>
                </div>
            </div>
            <p><b>Vat infos : </b> { JSON.stringify(vatInfos, null, 2) }</p>
            <p><b>Response : </b> { JSON.stringify(vatResponse, null, 2) }</p>
            <button type={'submit'}>Verify</button>
        </form>
    </>
  )
}

export default App
