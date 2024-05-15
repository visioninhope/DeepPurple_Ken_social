import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useLocation } from 'react-router-dom';

export default function BillingInvoiceDetail() {
  const location = useLocation();
  const { billing } = location.state;
  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!billing) {
    return <></>;
  }
  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex w-full">
        <div className="border-x-2">
          <div className="border-b-2 p-5 h-[150px]">
            <h2 className="text-xl font-bold">Finance records</h2>
          </div>
          <div className='p-5'>
            <Link
              to={{
                pathname: `/invoices`,
              }}
            >
              Manage billing invoices
            </Link>
          </div>
          <div className='p-5'>Invoice details</div>
        </div>
        <div className="">
          <div className='border-b-2 h-[150px]'>
            <h2 className="text-2xl font-bold mb-4 p-5">Invoice #{billing.id}</h2>
            {/* Filter Section */}
           
          </div>
          <div className="bg-white rounded-md p-4 shadow-md">
              <p className="mb-2">
                <span className="font-semibold">ID:</span> {billing.id}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Account ID:</span>{' '}
                {billing.accountID}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Start Date:</span>{' '}
                {formatDate(billing.startDate)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">End Date:</span>{' '}
                {formatDate(billing.endDate)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Paid Date:</span>{' '}
                {formatDate(billing.paidDate)}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment Address:</span>{' '}
                {billing.paymentAddress}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment Method:</span>{' '}
                {billing.paymentMethod}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Payment Name:</span>{' '}
                {billing.paymentName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Plan:</span> {billing.plan}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Price:</span> ${billing.price}
              </p>
            </div>
        </div>

      </div>
    </section>
  );
}
