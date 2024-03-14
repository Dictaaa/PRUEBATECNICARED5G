import React, { createRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './loans.css';
import Rectangle from '../../img/ractangle.svg'
import { formatoMonto, convertirFormatoLegible } from '../../functions/functions';

function Loans() {
    const containerRef = createRef();

    let monto = 4498.20;
    let partes = formatoMonto(monto);
    let totalPayN = 104498.20;
    let totalPay = formatoMonto(totalPayN);
    const paymentDateN = "2023-05-01";
    const paymentDate = convertirFormatoLegible(paymentDateN);
    return (
        <div className="app-container">
            <CSSTransition
                in={true}
                appear={true}
                timeout={0.5}
                classNames="loans"
                nodeRef={containerRef}
                onEnter={() => containerRef.current.style.transform = 'translateX(100%)'}
                onEntered={() => containerRef.current.style.transform = 'translateX(0)'}
            >
                <div className="containerLoans" ref={containerRef}>
                    <div className='txtLoans'>Préstamos Salvavidas</div>
                    <img id='rectangle' className='rectangle' src={Rectangle} alt="" />
                    <span className='txtInfo'>Información del Salvavidas</span>
                    <span className='txtCost'>¿Cuánto me cuesta?</span>
                    <span className='txtPrice'>${partes[0]},{partes[1]}</span>
                    <span className='txtPayAns'>¿Cuánto tengo que pagar?</span>
                    <span className='txtPay'>${totalPay[0]},{totalPay[1]}</span>
                    <span className='txtPaymentdateAns'>¿Hasta cuándo puedo pagar?</span>
                    <span className='txtPaymentdate'>{paymentDate}</span>
                    <span className='txtPolitic'>Autorizo a Nequi a que tome la plata de mi cuenta en la fecha límite de pago.</span>
                    <button className='btnContinue'>
                        <span className='txtBtn'>Continúa</span>
                    </button>

                </div>
            </CSSTransition>

        </div>
    );
}

export default Loans;
