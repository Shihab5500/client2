import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [amount, setAmount] = useState(10);
  const [processing, setProcessing] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data } = await axiosSecure.post("/api/fundings/payment-intent", { amount });
      const clientSecret = data.clientSecret;

      const card = elements.getElement(CardElement);
      const payRes = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email
          }
        }
      });

      if (payRes.error) throw new Error(payRes.error.message);

      await axiosSecure.post("/api/fundings", {
        userName: user.displayName,
        userEmail: user.email,
        amount,
        transactionId: payRes.paymentIntent.id
      });

      toast.success("Thanks for your support!");
      onSuccess?.();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-3">
      <label className="label">Amount (USD)</label>
      <input
        type="number"
        min="1"
        className="input"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />

      <div className="input py-3">
        <CardElement />
      </div>

      <button disabled={processing} className="btn-primary w-full">
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
