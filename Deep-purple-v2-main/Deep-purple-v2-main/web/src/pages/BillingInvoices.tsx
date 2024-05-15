import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllBillings } from '../api/appwrite/api';
import { Link } from 'react-router-dom';

export default function BillingInvoicesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [billings, setBillings] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(''); // Default is an empty string
  const [searchText, setSearchText] = useState('');

  async function fetchData() {
    try {
      const data = await getAllBillings();

      const formatted = data?.documents.map((billing) => ({
        id: billing.$id,
        accountID: billing.accountID,
        endDate: billing.endDate,
        paidDate: billing.paidDate,
        paymentAddress: billing.paymentAddress,
        paymentMethod: billing.paymentMethod,
        paymentName: billing.paymentName,
        plan: billing.plan,
        price: billing.price,
        startDate: billing.startDate,
      }));

      if (formatted) {
        // Apply filters
        const filteredBillings = formatted
          .filter(
            (billing) => !startDate || new Date(billing.startDate) >= startDate
          )
          .filter((billing) => !endDate || new Date(billing.endDate) <= endDate)
          .filter((billing) => !selectedPlan || billing.plan === selectedPlan)
          .filter(
            (billing) =>
              !searchText ||
              Object.values(billing).some(
                (value) =>
                  typeof value === 'string' &&
                  value.toLowerCase().includes(searchText.toLowerCase())
              )
          );

        setBillings(filteredBillings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [startDate, endDate, selectedPlan, searchText]);

  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex w-full">
        <div className="border-x-2">
          <div className="border-b-2 p-5 h-[150px]">
            <h2 className="text-xl font-bold">Finance records</h2>
            <br />
          </div>
          <div className="p-5">Manage billing invoices</div>
        </div>
        <div className="">
          <div className='border-b-2 h-[150px]'>
            <h2 className="text-2xl font-bold p-5">Manage billing invoices</h2>
            {/* Filter Section */}
            <div className="flex space-x-4 pb-4 px-5">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Billing Period:
                </label>
                <div className="flex space-x-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="border p-1"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    className="border p-1"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">
                  Plan:
                </label>
                <select
                  className="border p-1"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                >
                  <option value="">All Plans</option>
                  <option value="entreprise">Entreprise</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">
                  Search:
                </label>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="border p-1"
                />
              </div>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200 m-5">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Plan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Period
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Account ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billings.map((billing) => (
                <tr key={billing.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{billing.id}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {billing.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${billing.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(billing.startDate).toDateString()} -{' '}
                    {new Date(billing.endDate).toDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {billing.accountID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={{
                        pathname: `/invoice/${billing.id}`,
                      }}
                      state={{ billing }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
