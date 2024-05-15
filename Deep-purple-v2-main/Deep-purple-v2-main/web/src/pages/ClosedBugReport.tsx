import React, { useEffect, useState } from 'react';
import { getClosedBugReports } from '../api/appwrite/api';
import { Link } from 'react-router-dom';

export default function ClosedBugReport() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reports, setReports] = useState<any[]>([]);
  const [status, setStatus] = useState(''); 
  const [urgency, setUrgency] = useState(''); 
  const [searchText, setSearchText] = useState('');
  async function fetchReports() {
    try {
      const data = await getClosedBugReports();
      const formatted = data?.documents.map((item) => ({
        id: item.$id,
        report_text: item.report_text,
        report_date: item.report_date,
        report_by_name: item.report_by_name,
        category: item.category, 
        urgency: item.category, 
        status: item.status, 
        actions: item.actions
      }));

      if (formatted) {
        const filtered = formatted
          .filter((item) => !status || item.status === status)
          .filter((item) => !urgency || item.urgency === urgency)
          .filter(
            (item) =>
              !searchText ||
              Object.values(item).some(
                (value) =>
                  typeof value === 'string' &&
                  value.toLowerCase().includes(searchText.toLowerCase())
              )
          );
        setReports(filtered);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchReports();
  }, [status, urgency, searchText]);

  

  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex w-full">
        <div className="border-x-2 flex-0">
          <div className="border-b-2 p-5 h-[150px]">
            <h2 className="text-xl font-bold">Bug reports</h2>
            <br />
          </div>
          <div className="p-5">
            <h3>Reports</h3>
            <p>
              
              <Link
                to={{
                  pathname: `/bug_report/`,
                }}
              >
                Manage reports
              </Link>
            </p>
            <p>
              <Link
                to={{
                  pathname: `/bug_report/closed`,
                }}
              >
                Closed reports
              </Link>
            </p>
            
          </div>
        </div>
        <div className="flex-1">
          <div className="border-b-2 h-[150px]">
            <h2 className="text-2xl font-bold p-5">Closed bug reports</h2>
            {/* Filter Section */}
            <div className="flex space-x-4 pb-4 px-5">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">
                Urgency:
                </label>
                <select
                  className="border p-1"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="">All status</option>
                  <option value="high">High</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500">
                  Status:
                </label>
                <select
                  className="border p-1"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Plans</option>
                  <option value="in_progress">In progress</option>
                  <option value="closed">Closed</option>
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

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="border p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-bold mb-2">#{report.id}</h3>
                  <p className="text-gray-600 mb-4">{report.description}</p>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-700 mb-2">
                        Reporter: {report.report_by_name}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Date: {new Date(report.report_date).toDateString()}
                      </p>
                      <p className="text-gray-700 mb-2">Category: {report.category}</p>
                      <p className="text-gray-700 mb-2">
                        Urgency level: {report.urgency}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Description: {report.report_text}
                      </p>
                    </div>
                    <div className="flex items-end">
                      <Link
                        to={`/bug_report/${report.id}`}
                        state={{ report }}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        View
                      </Link>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
