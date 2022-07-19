import { useEffect, useState } from 'react';
import HeaderDashboard from '../../components/Header/HeaderDashboard';
import api from '../../services/api'
import './style.css'
import { getItem } from '../../utils/storage';
import UpdateUser from '../../components/UpdateUser';
import Filter from '../../components/Filter';
import Table from '../../components/TableDatas';
import Resume from '../../components/Resume';
import RegisterAndUpdateTransaction from '../../components/RegisterUpdateTransaction';

function Main() {
    const [users, setUsers] = useState('')
    const [userEdit, setUserEdit] = useState(false)
    const [transaction, setTransaction] = useState([])
    const [categories, setCategories] = useState([])
    const [newOrUpdateTransaction, setNewOrUpdateTransaction] = useState()
    const [idTransaction, setIdTransaction] = useState()
    const [transactionList, setTransactionList] = useState([])
    const token = getItem('token')

    const getUserApi = async () => {
        try {
            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data)
        } catch (error) {
            console.log(error.response.data.mensagem)
        }
    }

    const handleEditUser = () => {
        setUserEdit(true)
    }
    const getCategorias = async () => {
        try {
            const response = await api.get('/categoria', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data)
        } catch (error) {
            console.log(error.response.data.mensagem)
        }
    }

    useEffect(() => {
        setTransactionList(transaction)
    }, [transaction])

    useEffect(() => {
        getCategorias()
    }, [])

    useEffect(() => {
        getUserApi()
    }, [userEdit])

    return (
        <div className='container dashboard'>
            {userEdit && <UpdateUser
                users={users}
                setUserEdit={setUserEdit} />}

            {newOrUpdateTransaction && <RegisterAndUpdateTransaction
                newOrUpdateTransaction={newOrUpdateTransaction}
                setNewOrUpdateTransaction={setNewOrUpdateTransaction}
                idTransaction={idTransaction}
                categories={categories}
                transactionList={transactionList} />}

            <HeaderDashboard
                users={users}
                handleEditUser={handleEditUser}
            />

            <main className='main__dashboard'>
                <div className='content__left'>
                    <Filter
                        categories={categories}
                        transaction={transaction}
                        setTransaction={setTransaction}
                        setTransactionList={setTransactionList} />

                    <Table
                        transactionList={transactionList}
                        setTransactionList={setTransactionList}
                        transaction={transaction}
                        setTransaction={setTransaction}
                        newOrUpdateTransaction={newOrUpdateTransaction}
                        setNewOrUpdateTransaction={setNewOrUpdateTransaction}
                        setIdTransaction={setIdTransaction} />

                </div>
                <div className='content__right'>
                    <Resume
                        transactionList={transactionList}
                        newOrUpdateTransaction={newOrUpdateTransaction}
                        setNewOrUpdateTransaction={setNewOrUpdateTransaction} />
                </div>
            </main>
        </div>
    );
}

export default Main;