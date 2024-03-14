import React, { useState } from 'react';
import './home.css';
import RectangleA from '../../img/RectánguloA.svg';
import RectangleR from '../../img/RectánguloR.svg';
import Loans from '../../img/loans.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatoMonto } from '../../functions/functions';

function Home(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [animateOut, setAnimateOut] = useState(false);
    const user = location.state && location.state.user;

    let monto = user.money;
    let partes = formatoMonto(monto);

    function Go() {
        setAnimateOut(true);
        setTimeout(() => navigate('/loans'), 500);
    }

    function GoLoansView() {
        setAnimateOut(true);
        setTimeout(() => navigate('/loans-view',{ state: { user: { id: user._id, name: user.name,
            lastName: user.lastName,
            money: user.money,
            loans: [
                {
                    idLoan: user.loans.idLoan,
                    borrowedMoney: user.loans.borrowedMoney,
                    loanCost: user.loans.loanCost,
                    moneyOwed: user.loans.moneyOwed,
                    loanStartDate: user.loans.loanStartDate,
                    loanEndDate: user.loans.loanEndDate,
                }
            ],
            identificationNumber: user.identificationNumber,
            identificationTypeId: user.identificationTypeId} } }), 500);
    }

    return (
        <div className={`containerH ${animateOut ? 'slide-out' : ''}`}>
            <img id='rectangleR' className='rectangleR' src={RectangleR} alt="" />
            <img id='rectangleA' className='rectangleA' src={RectangleA} alt="" />

            <div className='circleUser'></div>
            <div className='group'>
                <p className='txtHi'>Hola,</p>
                <p className='txtUser'>{user.name}</p>
            </div>

            <p className='txtDisponible'>Disponible</p>
            {monto}
            <p id='monto-container' className='monto'>$ {partes[0]},<span className="small-decimal">{partes[1]}</span></p>

            <button className='btnLoans' type='submit' onClick={Go}>
                <img className='loans' src={Loans} alt="" />
            </button>
            <span className='txtPrestamo'>Hacer prestamo</span>
            <button className='btnLoansView' type='submit' onClick={GoLoansView}>
                <img className='loans' src={Loans} alt="" />
            </button>
            <span className='txtPrestamos'>Prestamos</span>
        </div>
    );
}

export default Home;
