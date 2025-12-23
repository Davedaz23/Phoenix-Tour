'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Map, 
  MapPin,
  Settings, 
  LogOut,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  Shield,
  PlusCircle,
  List,
  Tag,
  Image,
  DollarSign,
  Star,
  Globe,
  Compass,
  Mountain,
  Castle,
  Sun,
  Trees,
  Church,
  Camera,
  Utensils,
  Bed,
  Flag,
  Package,
  Layers,
  CalendarDays,
  UserCheck,
  MessageSquare,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-green-500'
  },
  {
    title: 'Tours',
    icon: Map,
    href: '/dashboard/tours',
    color: 'text-yellow-500',
    children: [
      { title: 'All Tours', href: '/dashboard/tours' },
      { title: 'Create Tour', href: '/dashboard/tours/create' },
      { title: 'Categories', href: '/dashboard/tours/categories' },
      { title: 'Regions', href: '/dashboard/tours/regions' },
      { title: 'Tags', href: '/dashboard/tours/tags' },
      { title: 'Featured Tours', href: '/dashboard/tours/featured' }
    ]
  },
  {
    title: 'Tour Components',
    icon: Layers,
    href: '/dashboard/tour-components',
    color: 'text-blue-500',
    children: [
      { title: 'Icons', href: '/dashboard/tour-components/icons' },
      { title: 'Images', href: '/dashboard/tour-components/images' },
      { title: 'Itineraries', href: '/dashboard/tour-components/itineraries' },
      { title: 'Inclusions', href: '/dashboard/tour-components/inclusions' },
      { title: 'Difficulty Levels', href: '/dashboard/tour-components/difficulty' }
    ]
  },
  {
    title: 'Bookings',
    icon: Calendar,
    href: '/dashboard/bookings',
    color: 'text-purple-500',
    children: [
      { title: 'All Bookings', href: '/dashboard/bookings' },
      { title: 'Pending', href: '/dashboard/bookings/pending' },
      { title: 'Confirmed', href: '/dashboard/bookings/confirmed' },
      { title: 'Cancelled', href: '/dashboard/bookings/cancelled' },
      { title: 'Calendar View', href: '/dashboard/bookings/calendar' }
    ]
  },
  {
    title: 'Customers',
    icon: Users,
    href: '/dashboard/customers',
    color: 'text-pink-500',
    children: [
      { title: 'All Customers', href: '/dashboard/customers' },
      { title: 'Leads', href: '/dashboard/customers/leads' },
      { title: 'VIP Customers', href: '/dashboard/customers/vip' },
      { title: 'Groups', href: '/dashboard/customers/groups' }
    ]
  },
  {
    title: 'Reviews',
    icon: Star,
    href: '/dashboard/reviews',
    color: 'text-yellow-400'
  },
  {
    title: 'Payments',
    icon: CreditCard,
    href: '/dashboard/payments',
    color: 'text-emerald-500',
    children: [
      { title: 'All Payments', href: '/dashboard/payments' },
      { title: 'Pending Payments', href: '/dashboard/payments/pending' },
      { title: 'Refunds', href: '/dashboard/payments/refunds' },
      { title: 'Payment Methods', href: '/dashboard/payments/methods' }
    ]
  },
  {
    title: 'Pricing',
    icon: DollarSign,
    href: '/dashboard/pricing',
    color: 'text-green-600',
    children: [
      { title: 'Price Management', href: '/dashboard/pricing' },
      { title: 'Discounts & Offers', href: '/dashboard/pricing/discounts' },
      { title: 'Seasonal Rates', href: '/dashboard/pricing/seasonal' },
      { title: 'Group Discounts', href: '/dashboard/pricing/group' }
    ]
  },
  {
    title: 'Availability',
    icon: CalendarDays,
    href: '/dashboard/availability',
    color: 'text-indigo-500',
    children: [
      { title: 'Calendar', href: '/dashboard/availability/calendar' },
      { title: 'Date Management', href: '/dashboard/availability/dates' },
      { title: 'Capacity', href: '/dashboard/availability/capacity' },
      { title: 'Blackout Dates', href: '/dashboard/availability/blackout' }
    ]
  },
  {
    title: 'Regions & Locations',
    icon: Globe,
    href: '/dashboard/regions',
    color: 'text-teal-500',
    children: [
      { title: 'Ethiopian Regions', href: '/dashboard/regions' },
      { title: 'Destinations', href: '/dashboard/regions/destinations' },
      { title: 'Hotels & Lodges', href: '/dashboard/regions/accommodations' },
      { title: 'Attractions', href: '/dashboard/regions/attractions' }
    ]
  },
  {
    title: 'Guides',
    icon: UserCheck,
    href: '/dashboard/guides',
    color: 'text-orange-500',
    children: [
      { title: 'All Guides', href: '/dashboard/guides' },
      { title: 'Guide Schedule', href: '/dashboard/guides/schedule' },
      { title: 'Certifications', href: '/dashboard/guides/certifications' },
      { title: 'Ratings', href: '/dashboard/guides/ratings' }
    ]
  },
  {
    title: 'Reports',
    icon: BarChart3,
    href: '/dashboard/reports',
    color: 'text-red-500',
    children: [
      { title: 'Tour Performance', href: '/dashboard/reports/tours' },
      { title: 'Financial Reports', href: '/dashboard/reports/financial' },
      { title: 'Customer Analytics', href: '/dashboard/reports/customers' },
      { title: 'Seasonal Trends', href: '/dashboard/reports/trends' },
      { title: 'Export Data', href: '/dashboard/reports/export' }
    ]
  },
  {
    title: 'Marketing',
    icon: TrendingUp,
    href: '/dashboard/marketing',
    color: 'text-fuchsia-500',
    children: [
      { title: 'Promotions', href: '/dashboard/marketing/promotions' },
      { title: 'Email Campaigns', href: '/dashboard/marketing/email' },
      { title: 'Social Media', href: '/dashboard/marketing/social' },
      { title: 'SEO', href: '/dashboard/marketing/seo' }
    ]
  },
  {
    title: 'Invoices',
    icon: FileText,
    href: '/dashboard/invoices',
    color: 'text-indigo-500'
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/dashboard/messages',
    color: 'text-blue-400',
    badge: 5
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'text-gray-500',
    children: [
      { title: 'General Settings', href: '/dashboard/settings/general' },
      { title: 'User Management', href: '/dashboard/settings/users' },
      { title: 'Email Templates', href: '/dashboard/settings/email-templates' },
      { title: 'API Keys', href: '/dashboard/settings/api' },
      { title: 'Backup & Restore', href: '/dashboard/settings/backup' }
    ]
  },
  {
    title: 'Import/Export',
    icon: RefreshCw,
    href: '/dashboard/import-export',
    color: 'text-cyan-500',
    children: [
      { title: 'Import Tours', href: '/dashboard/import-export/import' },
      { title: 'Export Data', href: '/dashboard/import-export/export' },
      { title: 'Templates', href: '/dashboard/import-export/templates' }
    ]
  }
];

const quickActions = [
  {
    title: 'Quick Create',
    icon: PlusCircle,
    href: '/dashboard/tours/create',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  {
    title: 'View Bookings',
    icon: Calendar,
    href: '/dashboard/bookings',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    title: 'Check Messages',
    icon: MessageSquare,
    href: '/dashboard/messages',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    title: 'Generate Report',
    icon: BarChart3,
    href: '/dashboard/reports',
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const toggleExpand = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isParentActive = (item: any) => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child: any) => isActive(child.href));
    }
    return false;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-900/50 z-20 ${
          collapsed ? 'hidden' : 'block'
        }`}
        onClick={() => setCollapsed(true)}
      />

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-all duration-300 ease-in-out
        ${collapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 lg:static lg:inset-auto
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 flex items-center justify-center">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-900 group-hover:text-green-600 transition-colors text-lg">
                Ethiopian Tours
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <div className="flex">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mx-0.5"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span>Admin Dashboard</span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setCollapsed(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-yellow-50">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`${action.color} text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center gap-1`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium text-center">{action.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto max-h-[calc(100vh-16rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.title);
            const parentActive = isParentActive(item);
            const active = isActive(item.href);

            return (
              <div key={item.href} className="space-y-1">
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={`
                        w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200
                        ${parentActive 
                          ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {/* {item.badge} */}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </button>
                    
                    {/* Children */}
                    {isExpanded && (
                      <div className="ml-8 space-y-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`
                              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                              ${isActive(child.href)
                                ? 'bg-green-100 text-green-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }
                            `}
                          >
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span className="text-sm">{child.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                      ${active 
                        ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-700' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium">{item.title}</span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile & Bottom Section */}
        <div className="border-t border-gray-200 p-4 bg-white">
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@ethiopiatours.et</p>
            </div>
            <Link
              href="/dashboard/settings/profile"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Bottom Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dashboard/help"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Help</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>

          {/* Version */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">Version 2.1.0</p>
              <p className="text-xs text-gray-400 mt-1">© 2024 Ethiopian Tours</p>
            </div>
          </div>
        </div>

        {/* Collapse button (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 transform -translate-y-1/2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setCollapsed(false)}
        className="lg:hidden fixed bottom-6 right-6 z-20 bg-gradient-to-r from-green-600 to-yellow-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
}