import React, { useEffect, useState } from 'react';
import { getAllSuspendedPlans } from '../api/appwrite/api';
import { Link } from 'react-router-dom';

export default function SuspendedSubscriptionPlan() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plans, setPlans] = useState<any[]>([]);
  async function fetchSubPlan() {
    try {
      const data = await getAllSuspendedPlans();
      const formatted = data?.documents.map((item) => ({
        id: item.$id,
        name: item.name,
        max_users: item.max_users,
        max_social_accounts: item.max_social_accounts,
        price: item.price,
        description: item.description,
        features: item.features,
      }));

      if (formatted) {
        setPlans(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchSubPlan();
  }, []);

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
            <h2 className="text-2xl font-bold p-5">Suspended plans</h2>
            {/* Filter Section */}
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div key={plan.id} className="border p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-700 mb-2">
                        Max Users: {plan.max_users}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Max Social Accounts: {plan.max_social_accounts}
                      </p>
                      <p className="text-gray-700 mb-2">Price: {plan.price}</p>
                      <p className="text-gray-700 mb-2">
                        Features: {plan.features}
                      </p>
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
