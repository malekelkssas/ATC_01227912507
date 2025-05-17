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
const CategoriesTable = lazy(() => import('@/components/pages/admin/CategoriesTable'));

enum AdminDashboardTabs {
  EVENTS = 'events',
  CATEGORIES = 'categories',
}


const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [activeTab, setActiveTab] = useState<AdminDashboardTabs>(AdminDashboardTabs.EVENTS);
  
  const { user } = useAppSelector(state => state.auth);


  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!user || user.role !== UserRoleEnum.ADMIN) {
      navigate(PagesRoutesConstants.HOME);
    }
  }, [user]);




  if(!user || user.role !== UserRoleEnum.ADMIN) return <ProgressLoader />;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-duck-yellow/20 to-duck-brown/20 dark:from-duck-brown/40 dark:to-duck-yellow/20 rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-duck-brown dark:text-duck-yellow">
            {t(TranslationConstants.ADMIN.DASHBOARD.TITLE)}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left sidebar */}
          <div className="md:col-span-3">
            <Card className="dark:bg-duck-brown/5 border-duck-yellow/20">
              <CardHeader>
                <CardTitle>
                {t(TranslationConstants.ADMIN.DASHBOARD.TITLE)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant={activeTab === AdminDashboardTabs.EVENTS ? "default" : "outline"}
                    className={`w-full justify-start border-duck-nature/20 ${activeTab === AdminDashboardTabs.EVENTS ? "": "hover:bg-duck-nature/10"}`}
                    onClick={() => setActiveTab(AdminDashboardTabs.EVENTS)}
                  >
                    {t(TranslationConstants.EVENTS.ALL_EVENTS)}
                  </Button>
                  <Button 
                    variant={activeTab === AdminDashboardTabs.CATEGORIES ? "default" : "outline"}
                    className={`w-full justify-start border-duck-nature/20 ${activeTab === AdminDashboardTabs.CATEGORIES ? "": "hover:bg-duck-nature/10"}`}
                    onClick={() => setActiveTab(AdminDashboardTabs.CATEGORIES)}
                  >
                    {t(TranslationConstants.CATEGORIES.MANAGE_CATEGORIES)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="md:col-span-9">
            {/* Events Table */}
            {activeTab === AdminDashboardTabs.EVENTS && (
              <Suspense fallback={<LoadingSpinner />}>
                <EventsTable />
              </Suspense>
            )}
            {activeTab === AdminDashboardTabs.CATEGORIES && (
              <Suspense fallback={<LoadingSpinner />}>
                <CategoriesTable setCategoriesCount={setCategoriesCount} categoriesCount={categoriesCount} />
              </Suspense>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
