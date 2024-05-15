import React, { useState } from 'react';
import { updateUserAccount } from '../api/appwrite/api';
import { Link, useLocation } from 'react-router-dom';

export default function UpdateUserAccount() {
  const location = useLocation();
  const { user: currentUser } = location.state;
  const [userDetails, setuserDetails] = useState({
    name: currentUser.name,
    email: currentUser.email,
    account_type: currentUser.account_type,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data
    console.log('Submitted:', userDetails);
    updateUserAccount(currentUser.id, userDetails).then(() => {
      alert("User updated!");
    });
  };

  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex w-full">
      <div className="border-x-2 flex-0">
          <div className="border-b-2 p-5 h-[150px]">
            <h2 className="text-xl font-bold">User accounts</h2>
            <br />
          </div>
          <div className="p-5">
            <p>
              
              <Link
                to={{
                  pathname: `/user/create`,
                }}
              >
                Create new user
              </Link>
            </p>
            <p>
              <Link
                to={{
                  pathname: `/user/`,
                }}
              >
                Active user accounts
              </Link>
            </p>
            <p>
              
              <Link
                to={{
                  pathname: `/user/suspended`,
                }}
              >
                Suspended user accounts
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="border-b-2 h-[150px]">
            <h2 className="text-2xl font-bold p-5">Update user account</h2>
            {/* Filter Section */}
          </div>

          <div className='w-[500px]'>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-md p-6"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              
              
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="account_type"
                >
                  Account type
                </label>
                <select
                  className="border p-1"
                  value={userDetails.account_type}
                  name="account_type"
                  onChange={handleChange}
                >
                  <option value="CITS">Corporate IT Staff</option>
                  <option value="RMS">Relation Marketing Staff</option>
                </select>
                
              </div>

             
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
