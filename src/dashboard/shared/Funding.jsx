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
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black">Funding</h2>
        <button onClick={()=>setOpen(true)} className="btn-primary">Give Fund</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map(f=>(
              <tr key={f._id} className="border-b">
                <td className="p-2">{f.userName}</td>
                <td className="p-2">{f.userEmail}</td>
                <td className="p-2 text-center font-semibold">${f.amount}</td>
                <td className="p-2 text-center">{new Date(f.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {!funds.length && (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500">No fund yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
          <div className="card p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-black">Give Fund</h3>
              <button className="btn-outline text-sm" onClick={()=>setOpen(false)}>Close</button>
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
