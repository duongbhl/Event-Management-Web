import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { EventDataProp } from "@/components/Interfaces/EventDataProp";

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDataProp | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/user/event/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvent(res.data.data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return null;

  const total = quantity * event.price;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <p className="font-medium text-gray-800 mb-2">{event.title}</p>
        <p className="text-sm text-gray-500 mb-4">
          Price: ${event.price} / ticket
        </p>

        {/* Quantity */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Total */}
        <div className="flex justify-between font-semibold mb-6">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <button
          onClick={() =>
            navigate(`/payment/${event._id}`, {
              state: { quantity },
            })
          }
          className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
