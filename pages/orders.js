import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage(){
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(res => {
      setOrders(res.data); 
    });
  }, []);

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map(order => (
            <tr>
              <td>{order.createdAt.replace('T', ' ').substring(0,19)}</td>
              <td>
                {order.name} {order.email} <br />
                {order.city} {order.postalCode} {order.country} <br />
                {order.streetAddress}
              </td>
              <td>
                {order.line_items.map(line => (
                  <>
                    {line.price_data.product_data.name} x {line.quantity} <br />
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}