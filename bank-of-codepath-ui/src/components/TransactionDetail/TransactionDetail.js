import { formatAmount, formatDate } from "../../utils/format"
import "./TransactionDetail.css"
import axios from "axios";
import { useParams,useState,useEffect } from "react-router"

export default function TransactionDetail() {
  const [transactionId,setTransactionId] = useParams([]) // replace this
  const [transaction,setTransaction] = useState({}); // replace this
  const [isLoading,setLoad] = useState(false); // replace this
  const [error,setError] =  useState();// replace this

  useEffect(() => {
    const fetchTransactionById = async () => {
      try{
        const res = await axios.get("http://localhost:3001/bank/transactions/:transactionId");
        if (res?.data?.transaction) {
          setTransaction(res.data.transaction);
        }
        if (res?.data?.transaction?.id) {
          setTransactionId(...res.data.transaction.id);
        }
      }catch(error){
        setError(error)
      }
    }
    setLoad(true)
    fetchTransactionById();
    setLoad(false)
  }, [setTransactionId]); 
  // nmot sure how to add transactionID to hook's dependecnies

  const renderTransactionContent = () => {
    if (isLoading) return <h1>Loading...</h1>
    if (error) return <p className="description">No transaction found</p>

    return (
      <>
        <p className="description">{transaction?.description}</p>
        <div className="meta">
          <p className={`amount ${transaction?.amount < 0 ? "minus" : ""}`}>{formatAmount(transaction?.amount)}</p>
          <p className="date">{formatDate(transaction?.postedAt)}</p>
        </div>
      </>
    )
  }

  return (
    <div className="TransactionDetail">
      <div className="card">
        <div className="title">
          <h3>Transaction #{transactionId}</h3>
          <p className="category">{transaction?.category}</p>
        </div>

        {renderTransactionContent()}
      </div>
    </div>
  )
}
