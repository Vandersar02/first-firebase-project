import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "../../styles/pages/home.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const Home = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionsTotal } = useGetTransactions();
  const { name } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const { balance, expenses, incomes } = transactionsTotal;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="my-home">
        <div className="container">
          <h1>Hello {name}</h1>
          <h3>Your Balance</h3>
          <h2>${balance}</h2>
        </div>

        <div className="summary">
          <div className="income">
            <h3>Income</h3>
            <p>${incomes}</p>
          </div>

          <div className="expense">
            <h3>Expenses</h3>
            <p>${expenses}</p>
          </div>
        </div>

        <form className="add-transaction" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => {
              setTransactionAmount(e.target.value);
            }}
            required
          />
          <input
            type="radio"
            id="expense"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => {
              setTransactionType(e.target.value);
            }}
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            id="income"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => {
              setTransactionType(e.target.value);
            }}
          />
          <label htmlFor="income">Income</label>

          <button type="submit">Add Transactions</button>
        </form>
      </div>

      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionType, transactionAmount } =
              transaction;
            return (
              <li>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} .{" "}
                  <label
                    style={{
                      color:
                        transactionType === "expense" ? "red" : "lightgreen",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="signOutBtn">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
};
