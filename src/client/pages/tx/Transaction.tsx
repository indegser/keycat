import React, { useState } from 'react';
import AccountForm from 'pages/AccountForm';
import { buyram } from 'api/eos';

const Transaction = (props) => {
  const params = new URL(location.href).searchParams;
  const [accountName, setAccountName] = useState(params.get('accountName'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    let payload = params.get('payload');
    const accountName = params.get('accountName');

    if (!payload) {
      return null;
    }
    payload = JSON.parse(payload);
    const privateKey = form.elements['password'].value;

    try {
      const result = await buyram(payload, privateKey);
      window.opener.postMessage({ type: 'tx', payload: result.processed.id }, '*');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  if (!accountName) return null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AccountForm isTx accountName={accountName} />
      <button type="submit">
        Action!
      </button>
    </form>
  );
}

export default Transaction;
