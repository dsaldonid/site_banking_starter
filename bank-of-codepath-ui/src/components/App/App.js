import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import "./App.css"
import { useEffect,useState } from "react"
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [fetched,isFetching] = useState(false)
  const [err,error] = useState()
  const [filterInput,filterInputValue] = useState()
  const [transaction,getTransactions] = useState([])
  const [transfer,getTransfers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get("http://localhost:3001/bank/transactions");
        if (res?.data?.transactions) {
          getTransactions(res.data.transactions);
        }
        const res1 = await axios.get("http://localhost:3001/bank/transfers");
        if (res1?.data?.transfers) {
          getTransfers(res.data.transactions);
        }
      }catch(error){
        error(error)
      }
    }
    isFetching(true)
    fetchData();
    isFetching(false)
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/transactions/:transactionID" element={<TransactionDetail />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

