import React, { useEffect, useState } from 'react';
import {
  getAllActivePlans,
  getAllBugReports,
  subspendSubPlan,
  updateBugReport,
} from '../api/appwrite/api';
import { Link, useLocation } from 'react-router-dom';

export default function BugReportDetail() {
  const location = useLocation();
  const { report } = location.state;

  const [reportDetails, setReportDetails] = useState({
    report_text: report.report_text,
    report_date: report.report_date,
    report_by_name: report.report_by_name,
    category: report.category,
    urgency: report.category,
    status: report.status,
    actions: report.actions,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value })
    setReportDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data
    console.log('Submitted:', reportDetails);
    updateBugReport(report.id, reportDetails).then(() => {
      alert('Updated!');
    });
  };

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
            <h2 className="text-2xl font-bold p-5">Manage bug reports</h2>
            {/* Filter Section */}
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border p-4 rounded-md shadow-md">
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
                    <p className="text-gray-700 mb-2">
                      Category: {report.category}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Urgency level: {report.urgency}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Description: {report.report_text}
                    </p>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <select
                        className="border p-1"
                        value={reportDetails.status || ''}
                        name="status"
                        onChange={handleChange}
                      >
                        <option value="in_progress">In progress</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="actions"
                      >
                        Actions
                      </label>
                      <textarea
                        id="actions"
                        name="actions"
                        value={reportDetails.actions || ''}
                        onChange={handleChange}
                        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  <button
                    className="text-red-500 hover:underline"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
