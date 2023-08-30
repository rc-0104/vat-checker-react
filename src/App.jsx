import {useEffect, useState} from 'react'
import './App.css'
import {checkVAT, countries} from "jsvat";

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

    const [vatNumber, setVatNumber] = useState("0478971548");
    const [countryCode, setCountryCode] = useState(CountryCodes.Belgium);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        try {
            // const validationInfo = await validateVat(vatInfos.code, vatInfos.number);
            const vat = `${vatInfos.code}${vatInfos.number}`;
            const validationInfo = checkVAT(vat, countries);
            console.log("validation response : " , {validationInfo})
            alert(JSON.stringify(validationInfo, null, 2));
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
            <button type={'submit'}>Verify</button>
        </form>
    </>
  )
}

export default App
