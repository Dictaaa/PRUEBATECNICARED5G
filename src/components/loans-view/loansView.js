import React, { useState, useEffect, useCallback } from 'react';
import './loansView.css';
import { searchLoan } from '../../services/services';
import { useNavigate, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

function LoansView(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state && location.state.user;
    const [searchText, setSearchText] = useState('');
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [formattedLoans, setFormattedLoans] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterParams, setFilterParams] = useState({
        loanStartDate: '',
        loanEndDate: '',
        state: '',
        borrowedMoney: '',
        loanCost: '',
        moneyOwed: ''
    });

    const filterLoans = useCallback((data) => {
        if (!searchText || searchText.trim() === '') {
            return data;
        }

        const searchTerm = searchText.trim().toLowerCase();

        return data.filter(loan =>
            loan.loanStartDate.toString().includes(searchTerm) ||
            loan.loanEndDate.toString().includes(searchTerm) ||
            loan.state.toLowerCase().includes(searchTerm) ||
            loan.identificationNumber.toString().includes(searchTerm) ||
            loan.borrowedMoney.toString().includes(searchTerm) ||
            loan.loanCost.toString().includes(searchTerm) ||
            loan.moneyOwed.toString().includes(searchTerm)
        );
    }, [searchText]);


    useEffect(() => {
        async function fetchLoans() {
            try {
                const result = await searchLoan({ identificationNumber: user.identificationNumber });
                const formattedLoans = result.data.map(loan => ({
                    ...loan,
                    loanStartDate: new Date(loan.loanStartDate).toLocaleDateString(),
                    loanEndDate: new Date(loan.loanEndDate).toLocaleDateString(),
                }));
                setFilteredLoans(filterLoans(formattedLoans));
                setFormattedLoans(formattedLoans);
            } catch (error) {
                console.error('Error al cargar los préstamos:', error);
            }
        }

        fetchLoans();
    }, [searchText, filterLoans, user.identificationNumber]);

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };



    const handleFilterSubmit = (e) => {
        e.preventDefault();

        const filteredData = formattedLoans.filter(loan => {
            return (
                (!filterParams.loanStartDate || loan.loanStartDate.includes(filterParams.loanStartDate)) &&
                (!filterParams.loanEndDate || loan.loanEndDate.includes(filterParams.loanEndDate)) &&
                (!filterParams.state || loan.state.toLowerCase() === filterParams.state.toLowerCase()) &&
                (!filterParams.borrowedMoney || loan.borrowedMoney.toString().includes(filterParams.borrowedMoney)) &&
                (!filterParams.loanCost || loan.loanCost.toString().includes(filterParams.loanCost)) &&
                (!filterParams.moneyOwed || loan.moneyOwed.toString().includes(filterParams.moneyOwed))
            );
        });

        setFilteredLoans(filteredData);
        handleModalToggle();
    };





    function goBack() {
        setTimeout(() => navigate('/home', {
            state: {
                user: {
                    id: user._id, name: user.name,
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
                    identificationTypeId: user.identificationTypeId
                }
            }
        }), 500);
    }


    return (
        <div className="loansView-container">

            {filteredLoans.map((loan) => (
                <div className={`divInfo ${modalOpen ? 'hide' : ''}`} key={loan.id}>
                    <div className='divTxt'>
                        <h2>Préstamo</h2>
                        <p>Dinero prestado: $ {loan.borrowedMoney}</p>
                        <p>Costo: $ {loan.loanCost}</p>
                        <p>Debe: $ {loan.moneyOwed}</p>
                        <p>Fecha inicio: {loan.loanStartDate}</p>
                        <p>Fecha fin: {loan.loanEndDate}</p>
                        <p>Estado: {loan.state}</p>
                    </div>
                </div>
            ))}

            <input
                className='inputSearch'
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <button className='circleFilter' onClick={handleModalToggle}></button>
            <button className='goBack' onClick={goBack}>🡐</button>
            <CSSTransition
                in={modalOpen}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="modal">
                    <form onSubmit={handleFilterSubmit}>
                        <input
                            type="text"
                            placeholder="Fecha de inicio (YYYY-MM-DD)"
                            value={filterParams.loanStartDate}
                            onChange={(e) => setFilterParams({ ...filterParams, loanStartDate: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Fecha de fin (YYYY-MM-DD)"
                            value={filterParams.loanEndDate}
                            onChange={(e) => setFilterParams({ ...filterParams, loanEndDate: e.target.value })}
                        />
                        <select
                            value={filterParams.state}
                            onChange={(e) => setFilterParams({ ...filterParams, state: e.target.value })}
                        >
                            <option value="">Seleccionar Estado</option>
                            <option value="Aprobado">Aprobado</option>
                            <option value="Rechazado">Rechazado</option>
                        </select>
                        <button className='btn' type="submit">Filtrar</button>
                    </form>
                    <button className='btn' onClick={handleModalToggle}>Cerrar</button>
                </div>
            </CSSTransition>
        </div>

    );
}

export default LoansView;
