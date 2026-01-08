


import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function Funding() {
  const [funds, setFunds] = useState([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await axiosSecure.get("/api/fundings");
    setFunds(data);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="card p-6 bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-slate-800 dark:text-white">Funding History</h2>
        <button onClick={()=>setOpen(true)} className="btn-primary">Give Fund</button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Amount</th>
              <th className="p-3 text-center">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {funds.map(f=>(
              <tr key={f._id} className="dark:bg-slate-800">
                <td className="p-3 dark:text-slate-300">{f.userName}</td>
                <td className="p-3 dark:text-slate-400">{f.userEmail}</td>
                <td className="p-3 text-center font-bold text-green-600 dark:text-green-400">${f.amount}</td>
                <td className="p-3 text-center dark:text-slate-400">{new Date(f.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {!funds.length && (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500 dark:text-slate-400">No funds yet. Be the first!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm grid place-items-center p-4 z-50">
          <div className="card p-6 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Give Funding</h3>
              <button className="btn-outline text-xs px-3 py-1" onClick={()=>setOpen(false)}>Close</button>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm onSuccess={() => { setOpen(false); load(); }} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}