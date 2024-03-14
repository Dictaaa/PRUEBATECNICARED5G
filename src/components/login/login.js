import React, { useState, useEffect } from 'react';
import './login.css';
import Nequi1 from '../../img/nequiLogo1.svg';
import Nequi2 from '../../img/nequiLogo2.svg';
import { TailSpin } from 'react-loading-icons';
import { useNavigate } from 'react-router-dom';
import { getIdentificationType } from '../../services/services';

function Login() {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [disableInputs, setDisableInputs] = useState(false);
    const [identificationTypes, setIdentificationTypes] = useState([]);
    const navigate = useNavigate();
   

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const data = await getIdentificationType();
                    return data;
                } catch (error) {
                    console.error('Error al obtener los tipos de identificación:', error);
                }
            };
        
            const loadData = async () => {
                const res = await fetchData();
                if(res.success){
                    setIdentificationTypes(res.data);
                }
            };
            loadData();
            const logo2 = document.getElementById('nequiLogo2');
            if (loading) {
                logo2.style.animation = 'rotation 1s linear infinite';
            } else {
                logo2.style.animation = 'none';
            } 
        }, [loading]);
        

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        const boton = document.getElementById('miBoton');
        if (value.trim() !== '') {
            boton.style.opacity = 1;
            boton.disabled = false;
        } else {
            boton.style.opacity = 0.5;
            boton.disabled = true;
        }
    }
        
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectValue(value);
    };
   

    function verificarUsuario() {
        setLoading(true);
         const requestBody = {
            identificationTypeId: selectValue,
            identificationNumber: inputValue
        };
    
        fetch('https://apinequi.onrender.com/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                setLoading(false);
                const boton = document.getElementById('miBoton');
                boton.style.opacity = 0.5;
                return response.json();
            } else {
                throw new Error('Error al verificar el usuario');
            }
        })
        .then(data => {
            navigate('/home', { state: { user: { id: data.user._id, name: data.user.name,
                lastName: data.user.lastName,
                money: data.user.money,
                loans: [
                    {
                        idLoan: data.user.loans.idLoan,
                        borrowedMoney: data.user.loans.borrowedMoney,
                        loanCost: data.user.loans.loanCost,
                        moneyOwed: data.user.loans.moneyOwed,
                        loanStartDate: data.user.loans.loanStartDate,
                        loanEndDate: data.user.loans.loanEndDate,
                    }
                ],
                identificationNumber: data.user.identificationNumber,
                identificationTypeId: data.user.identificationTypeId} } });
        })
        .catch(error => {
            console.error('Error:', error);
            setInvalidUser(true); 
            setLoading(false);
            setDisableInputs(true); 
            setTimeout(() => {
                setInvalidUser(false);
                setDisableInputs(false);
            }, 3000);
        });
    }

    return (
        <div className="container"> 
            <div className="image-container" style={{ opacity: disableInputs ? 0.2 : 1 }}>
                <img className='nequiLogo1' src={Nequi1} alt="" />
                <img id='nequiLogo2' className='nequiLogo2' src={Nequi2} alt="" />
            </div>

            <div className='divNumberId'></div>
            <select className="numberIdSelect" onChange={handleSelectChange} disabled={loading || disableInputs} style={{ opacity: disableInputs ? 0.2 : 1 }}>
                <option value="default" disabled selected>Tipo de documento</option>
                {identificationTypes.map((type, index) => (
                    <option key={index} value={type._id}>{type.description}</option>
                ))}
            </select>

            <input className='inputNumberId'  disabled={disableInputs} ></input> 
            <input
                className='inputTrans'
                placeholder='Número de documento'
                id='identficiationNumber'
                value={inputValue}
                onInput={handleInputChange}
                disabled={loading || disableInputs} 
                style={{ opacity: disableInputs ? 0.2 : 1 }}
            />

            <button
                className='btnLogin'
                id="miBoton"
                type="submit"
                disabled={inputValue.trim() === '' || loading || disableInputs}
                onClick={verificarUsuario}
                style={{ opacity: loading ? 0.5 : 1 && disableInputs ? 0.2 : 1 }}
            >
                {loading ? <TailSpin width="25" height="25" /> : <label className='lbEntrar'>Entrar</label>}
            </button>

            {invalidUser && ( 
                <div className="invalid-user">
                    <span>Usuario inválido</span>
                </div>
            )}
        </div>
    );
}

export default Login;
