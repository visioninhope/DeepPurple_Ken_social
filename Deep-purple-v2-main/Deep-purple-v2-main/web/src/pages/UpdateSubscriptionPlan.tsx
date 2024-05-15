import React, { useState } from 'react';
import { updateSubPlan } from '../api/appwrite/api';
import { Link, useLocation } from 'react-router-dom';

export default function UpdateSubscriptionPlan() {
  const location = useLocation();
  const { plan: currentPlan } = location.state;
  const [planDetails, setPlanDetails] = useState({
    name: currentPlan.name,
    description: currentPlan.description,
    max_users: currentPlan.max_users,
    max_social_accounts: currentPlan.max_social_accounts,
    price: currentPlan.price,
    features: currentPlan.features
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the form data
    console.log('Submitted:', planDetails);
    updateSubPlan(currentPlan.id, planDetails).then(() => {
      alert('Plan updated')
    });
  };

  return (
    <section className="flex flex-row min-h-screen">
      <div className="flex w-full">
        <div className="border-x-2 flex-0">
          <div className="border-b-2 p-5 h-[150px]">
            <h2 className="text-xl font-bold">Subscription plans</h2>
            <br />
          </div>
          <div className="p-5">
            <p>
              
              <Link
                to={{
                  pathname: `/subscription_plan/create`,
                }}
              >
                Create new plan
              </Link>
            </p>
            <p>
              <Link
                to={{
                  pathname: `/subscription_plan/`,
                }}
              >
                Active plans
              </Link>
            </p>
            <p>
              
              <Link
                to={{
                  pathname: `/subscription_plan/suspended`,
                }}
              >
                Suspended plans
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-1">
          <div className="border-b-2 h-[150px]">
            <h2 className="text-2xl font-bold p-5">Update subscription plan</h2>
            {/* Filter Section */}
          </div>

          <div className="w-[500px]">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-md p-6"
            >
              {/* Plan Name */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Plan Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={planDetails.name}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Plan Description */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={planDetails.description}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>

              {/* Max Users */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="max_users"
                >
                  Max Users
                </label>
                <input
                  type="number"
                  id="max_users"
                  name="max_users"
                  value={planDetails.max_users}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Max Social Accounts */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="max_social_accounts"
                >
                  Max Social Accounts
                </label>
                <input
                  type="number"
                  id="max_social_accounts"
                  name="max_social_accounts"
                  value={planDetails.max_social_accounts}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Pricing
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={planDetails.price}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Features */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="features"
                >
                  Features
                </label>
                <textarea
                  id="features"
                  name="features"
                  value={planDetails.features}
                  onChange={handleChange}
                  className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Update Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
