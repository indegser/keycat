import React, { useEffect, useRef } from 'react';
import AccountForm from 'pages/AccountForm';
import { buyram } from 'api/eos';

const Transaction = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    let payload = new URL(location.href).searchParams.get('payload');

    if (!payload) {
      return null;
    }
    payload = JSON.parse(payload);
    const privateKey = form.elements['password'].value;
    const result = await buyram(payload, privateKey);
    window.opener.postMessage({ type: 'tx', payload: result.processed.id }, '*');
  }

  useEffect(() => {

  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <AccountForm isTx />
      <button type="submit">
        Action!
      </button>
    </form>
  );
}

export default Transaction;
