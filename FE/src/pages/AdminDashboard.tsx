import React, { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAppSelector } from '../store/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRoleEnum } from '@/types';
import { PagesRoutesConstants, TranslationConstants } from '@/utils/constants';
import { lazy } from 'react';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ProgressLoader from '@/components/shared/ProgressLoader';

const EventsTable = lazy(() => import('@/components/pages/admin/EventsTable'));

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [eventsCount, setEventsCount] = useState(0);
  
  const { user } = useAppSelector(state => state.auth);


  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!user || user.role !== UserRoleEnum.ADMIN) {
      navigate(PagesRoutesConstants.HOME);
    }
  }, [user]);



  // Mock users data
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ];

  if(!user) return <ProgressLoader />;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-duck-yellow/20 to-duck-brown/20 dark:from-duck-brown/40 dark:to-duck-yellow/20 rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-duck-brown dark:text-duck-yellow">
            {t(TranslationConstants.ADMIN.DASHBOARD.TITLE)}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {t(TranslationConstants.EVENTS.ALL_EVENTS)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-duck-brown dark:text-duck-yellow">{eventsCount}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t(TranslationConstants.EVENTS.TOTAL_EVENTS)}</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-duck-brown dark:text-duck-yellow">{users.length}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Registered users</p>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-duck-brown dark:text-duck-yellow">24</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total bookings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left sidebar */}
          <div className="md:col-span-3">
            <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
              <CardHeader>
                <CardTitle>
                  Admin Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline"
                    className="w-full justify-start border-duck-nature/20 hover:bg-duck-nature/10"
                  >
                    Create Event
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-duck-nature/20 hover:bg-duck-nature/10"
                  >
                    Create Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-9">
            {/* Events Table */}
            <Suspense fallback={<LoadingSpinner />}>
              <EventsTable setEventsCount={setEventsCount} eventsCount={eventsCount} />
            </Suspense>

            <Card className="dark:bg-duck-brown/5 border-duck-yellow/20 mt-6">
              <CardHeader>
                <CardTitle>
                  {/* {t('dashboard.admin.manageUsers')} */}
                  Manage Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="dark:bg-duck-brown/5 divide-y divide-duck-yellow/10">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/10">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-duck-yellow/10"
                            >
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
