import React, { useEffect, useState } from 'react'
import data from '../mock_stores.json'
import './App.css'

const App = () => {

    const [stores, setStores] = useState(null)

    useEffect(() => {
        setStores(data)
    }, [])
    useEffect(() => {

    }, [stores])
    const totalMonthHandler = (item) => {
        return item.months.map(el => el.value).reduce((acc, rec) => acc + rec)
    }

    const onChangeInput = (storeId, monthId, val) => {
        setStores(stores.map(store => store.store.id === storeId ? 
            {...store, months: store.months.map(m => m.id === monthId ? {...m, value: +val} : m)} : store))
    }

    const totalHandler = (name) => {
        return stores && stores
        .map((store) => store.months.find(el => el.name === name).value)
        .reduce((acc, rec) => acc + rec)
    }

    const totalOfTotal = () => {
        return stores && stores
        .map((store) => store.months.map(m => m.value).reduce((acc, rec) => acc + rec))
        .reduce((acc, rec) => acc + rec)
    }



  return (
    <div>
        <table>
            <thead>
                <tr>
                    <td>Наименование</td>
                    <td>Январь</td>
                    <td>Февраль</td>
                    <td>Март</td>
                    <td>Апрель</td>
                    <td>Май</td>
                    <td>Июнь</td>
                    <td>Июль</td>
                    <td>Август</td>
                    <td>Сентябрь</td>
                    <td>Октябрь</td>
                    <td>Ноябрь</td>
                    <td>Декабрь</td>
                    <th>Тотал</th>
                </tr>
            </thead>
            <tbody>
                {stores && stores.map((item) => (
                    <tr key={item.store.id}>
                        <th>{item.store.name}</th>
                        {item.months.map((month) => (
                            <td key={month.id}>
                                <input type="number" onChange={(e) => onChangeInput(item.store.id, month.id, e.target.value)}/>
                            </td>
                        ))}
                        <td>{totalMonthHandler(item)}</td>
                    </tr>
                ))}
                
            </tbody>
            <tfoot>
            <tr>
                    <th>Итог</th>
                    <td>{totalHandler('JAN')}</td>
                    <td>{totalHandler('FEB')}</td>
                    <td>{totalHandler('MAR')}</td>
                    <td>{totalHandler('APR')}</td>
                    <td>{totalHandler('MAY')}</td>
                    <td>{totalHandler('JUN')}</td>
                    <td>{totalHandler('JUL')}</td>
                    <td>{totalHandler('AUG')}</td>
                    <td>{totalHandler('SEP')}</td>
                    <td>{totalHandler('OCT')}</td>
                    <td>{totalHandler('NOV')}</td>
                    <td>{totalHandler('DEC')}</td>
                    <td>{totalOfTotal()}</td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}

export default App