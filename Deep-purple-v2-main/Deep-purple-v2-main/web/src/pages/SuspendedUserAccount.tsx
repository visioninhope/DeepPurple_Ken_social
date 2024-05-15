import React, { useEffect, useState } from 'react';
import { getAllSuspendedUsers,  } from '../api/appwrite/api';
import { Link } from 'react-router-dom';

export default function SuspendedUserAccount() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  async function fetchUsers() {
    try {
      const data = await getAllSuspendedUsers();
      const formatted = data?.documents.map((item) => ({
        id: item.$id,
        name: item.name,
        email: item.email,
        account_type: item.account_type,
      }));

      if (formatted) {
        setUsers(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActivateUser = (userId: string) => {
    
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
            <h2 className="text-2xl font-bold p-5">Active user accounts</h2>
            {/* Filter Section */}
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Account type
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.account_type}
                  </td>
                  
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={{
                        pathname: `/user/edit/${user.id}`,
                      }}
                      state={{ user }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Edit
                    </Link>

                    <button
                        className="text-red-500 hover:underline"
                        onClick={() => {
                          handleActivateUser(user.id);
                        }}
                      >
                        Reactivate
                      </button>
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
