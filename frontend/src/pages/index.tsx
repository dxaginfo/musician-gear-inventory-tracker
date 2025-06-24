import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalInstruments: 0,
    upcomingMaintenance: 0,
    gearValue: 0,
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/auth/login');
    }

    // Fetch dashboard stats if authenticated
    if (user) {
      // This would be an API call in a real application
      setStats({
        totalInstruments: 24,
        upcomingMaintenance: 3,
        gearValue: 12750,
      });
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>Dashboard | Musician Gear Tracker</title>
        <meta name="description" content="Manage your musical instruments and gear inventory" />
      </Head>

      <DashboardLayout>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-sm text-gray-700">
                Welcome back! Here's an overview of your gear collection.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                href="/instruments/new"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Add Instrument
              </Link>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Instruments count */}
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-primary-500 rounded-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-5 w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Instruments</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.totalInstruments}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 bg-gray-50 sm:px-6">
                <div className="text-sm">
                  <Link href="/instruments" className="font-medium text-primary-600 hover:text-primary-500">
                    View all instruments
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Upcoming maintenance */}
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-yellow-500 rounded-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-5 w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Maintenance</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.upcomingMaintenance}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 bg-gray-50 sm:px-6">
                <div className="text-sm">
                  <Link href="/maintenance" className="font-medium text-primary-600 hover:text-primary-500">
                    View maintenance schedule
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Total value */}
            <div className="overflow-hidden bg-white rounded-lg shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-green-500 rounded-md">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 ml-5 w-0">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Gear Value</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">${stats.gearValue.toLocaleString()}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 bg-gray-50 sm:px-6">
                <div className="text-sm">
                  <Link href="/reports/value" className="font-medium text-primary-600 hover:text-primary-500">
                    View value report
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary-600 truncate">Gibson Les Paul Standard added to inventory</p>
                      <div className="flex-shrink-0 ml-2">
                        <p className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">New Item</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          You
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-2 sm:mt-0">
                        <p className="text-sm text-gray-500">Today at 1:45 PM</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary-600 truncate">String change for Fender Stratocaster</p>
                      <div className="flex-shrink-0 ml-2">
                        <p className="inline-flex px-2 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">Maintenance</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          You
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-2 sm:mt-0">
                        <p className="text-sm text-gray-500">Yesterday at 3:22 PM</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-primary-600 truncate">Value update for vintage pedal collection</p>
                      <div className="flex-shrink-0 ml-2">
                        <p className="inline-flex px-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">Value Update</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          Automatic
                        </p>
                      </div>
                      <div className="flex-shrink-0 mt-2 sm:mt-0">
                        <p className="text-sm text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}