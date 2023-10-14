import { FaFacebook, FaGoogle, FaInstagram} from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import  '../css/cadastro.css';

function Cadastro() {
    const [inputValue, setInputValue] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
        
    });

    function handlerValues(value) {
        setInputValue(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }))
    }

    async function submitForm() {
        // validations to send to the database
        if(inputValue.email === '' || inputValue.name === '' || inputValue.password === '' || inputValue.confirmPassword === '') {
             alert('the fields were not filled in');
             return;
        } 

        if(inputValue.password !== inputValue.confirmPassword) {
            alert('passwords do not match');
            return;
        }

        // data that will be sent to the backend API
        const body = {
            "email": inputValue.email,
            "name": inputValue.name,
            "password": inputValue.password,
            "confirmPassword": inputValue.confirmPassword
        }
        // we call the method to send the data to send the data to the database
        const response = await axios.post('http://localhost:4000/register', body)
        if(response.status !== 200) {
            console.log('error in request', response);
            return
        } else {
            setInputValue({
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            })
        }
    }

    return(
        <div>
            <form id="formularioCadastro">
            <h1 className='title'>SIGN-UP</h1>
               <div className='containerPrimeiroInput'>
                    <input  
                    placeholder="EMAIL"
                    type="text" 
                    name="email" 
                    value={inputValue.email}
                    autoComplete='off'
                    className="campoInput"
                    id="email"
                    onChange={handlerValues}
                    />

                    <input  
                    placeholder="NAME"
                    type="text" 
                    value={inputValue.name}
                    name="name" 
                    autoComplete='off'
                    className="campoInput"
                    id="name"
                    onChange={handlerValues}
                    />
               </div>

               <div>
                    <input  
                    placeholder="PASSWORD"
                    type="password" 
                    name="password" 
                    value={inputValue.password}
                    autoComplete='off'
                    className="campoInput"
                    id="password"
                    onChange={handlerValues}
                    />

                    <input  
                    placeholder="CONFIRM PASSWORD"
                    type="password" 
                    name="confirmPassword" 
                    value={inputValue.confirmPassword}
                    autoComplete='off'
                    className="campoInput"
                    id="confirmPassword"
                    onChange={handlerValues}
                    />

               </div>

               <button className='buttonSubmit' onClick={(e)=> {
                    e.preventDefault()
                    submitForm()
                    
               }}>
                    register
               </button>
               {/* soon a route */}
               <p>Already have an account?</p> 
               
                <div className='socialMedias'>
                    <FaFacebook  className='icons'/>
                    <FaInstagram className='icons'/>
                    <FaGoogle className='icons'/>
                </div>

            </form>
        </div>
    )
}

export default Cadastro

