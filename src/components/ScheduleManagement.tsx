import React, { useState } from 'react';
import { Search, Filter, Calendar, RotateCcw, Edit3, Trash2, MapPin, Phone, Truck, Store } from 'lucide-react';

interface ScheduleItem {
  id: number;
  productName: string;
  customer: string;
  phone: string;
  deliveryAddress: string;
  store: string;
  isRescheduled: boolean;
  category: string;
  deliveryDate: string;
  deliveryTime: string;
  returnDate: string;
  returnTime: string;
  machineId: string;
  machineName: string;
  deliveryStatus: 'pending' | 'completed';
  returnStatus: 'pending' | 'completed';
  deliveryMode: 'truck' | 'store';
  returnMode: 'truck' | 'store';
  paymentStatus: 'pending' | 'paid';
}

const ScheduleManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phoneSearchTerm, setPhoneSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState(true);
  const [returnFilter, setReturnFilter] = useState(true);
  const [truckFilter, setTruckFilter] = useState(true);
  const [storeFilter, setStoreFilter] = useState(true);
  const [showRescheduled, setShowRescheduled] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedStores, setSelectedStores] = useState(['Charlotte', 'Bon Aqua']);
  const [dateFilter, setDateFilter] = useState('all');

  // Sample schedule data based on your Orders system
  const [scheduleData] = useState<ScheduleItem[]>([
    {
      id: 4650,
      productName: 'Chipper 12" - W/E Special',
      customer: 'Crescencio A-COSTA',
      phone: '(501) 366-6454',
      deliveryAddress: '624 N Woodson Rd, Clarksville, TN, 37043',
      store: 'Charlotte',
      isRescheduled: false,
      category: 'excavators',
      deliveryDate: 'May 02',
      deliveryTime: '02:00 PM',
      returnDate: 'May 05',
      returnTime: '09:00 AM',
      machineId: '',
      machineName: '',
      deliveryStatus: 'pending',
      returnStatus: 'pending',
      deliveryMode: 'truck',
      returnMode: 'store',
      paymentStatus: 'pending'
    },
    {
      id: 4706,
      productName: 'Chipper 12" - W/E Special',
      customer: 'Crescencio A-COSTA',
      phone: '(615) 202-4555',
      deliveryAddress: '8749 South Tatum Creek Rd, Lyles, TN, 37098',
      store: 'Bon Aqua',
      isRescheduled: true,
      category: 'chippers',
      deliveryDate: 'May 02',
      deliveryTime: '02:00 PM',
      returnDate: 'May 05',
      returnTime: '09:00 AM',
      machineId: '',
      machineName: '',
      deliveryStatus: 'pending',
      returnStatus: 'pending',
      deliveryMode: 'truck',
      returnMode: 'truck',
      paymentStatus: 'paid'
    },
    {
      id: 4838,
      productName: '11 Hp Stud Steer - Weekly',
      customer: 'Jerry Verner',
      phone: '(607) 951-4154',
      deliveryAddress: '1908 Grand Ave, Nashville, TN, 37212',
      store: 'Charlotte',
      isRescheduled: false,
      category: 'excavators',
      deliveryDate: 'May 07',
      deliveryTime: '09:00 AM',
      returnDate: 'May 14',
      returnTime: '09:00 AM',
      machineId: 'TAK-SS-5',
      machineName: 'Takeuchi TL12',
      deliveryStatus: 'completed',
      returnStatus: 'pending',
      deliveryMode: 'truck',
      returnMode: 'store',
      paymentStatus: 'paid'
    },
    {
      id: 4925,
      productName: '3 Ton - Weekly',
      customer: 'Raj Chotaliya',
      phone: '(931) 279-4769',
      deliveryAddress: '1600 Iron Hill Rd, Dickson, TN, 37055',
      store: 'Bon Aqua',
      isRescheduled: false,
      category: 'compactors',
      deliveryDate: 'May 10',
      deliveryTime: '09:00 AM',
      returnDate: 'May 17',
      returnTime: '09:00 AM',
      machineId: '',
      machineName: '',
      deliveryStatus: 'pending',
      returnStatus: 'pending',
      deliveryMode: 'store',
      returnMode: 'store',
      paymentStatus: 'pending'
    },
    {
      id: 5008,
      productName: '9 Ton w/Cab - Weekly',
      customer: 'Gunner Bradford',
      phone: '(615) 538-7822',
      deliveryAddress: '173 Arnhes Dr, Nashville, TN, 37210',
      store: 'Charlotte',
      isRescheduled: true,
      category: 'generators',
      deliveryDate: 'May 10',
      deliveryTime: '09:00 AM',
      returnDate: 'May 17',
      returnTime: '09:00 AM',
      machineId: 'CAS-ME-2',
      machineName: 'Case CX57',
      deliveryStatus: 'completed',
      returnStatus: 'pending',
      deliveryMode: 'truck',
      returnMode: 'truck',
      paymentStatus: 'paid'
    },
    {
      id: 5009,
      productName: '9 Ton w/Cab - Weekly',
      customer: 'Davis Winstead',
      phone: '(615) 538-7822',
      deliveryAddress: '173 Arnhes Dr, Nashville, TN, 37210',
      store: 'Bon Aqua',
      isRescheduled: false,
      category: 'generators',
      deliveryDate: 'May 21',
      deliveryTime: '09:00 AM',
      returnDate: 'May 28',
      returnTime: '09:00 AM',
      machineId: 'VOLVO-EC55B-001',
      machineName: 'Volvo EC55B',
      deliveryStatus: 'completed',
      returnStatus: 'completed',
      deliveryMode: 'store',
      returnMode: 'store',
      paymentStatus: 'paid'
    }
  ]);

  const getPaymentStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'paid': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDeliveryIcon = (mode: string, status: string) => {
    const iconColor = status === 'completed' ? 'text-blue-600' : 'text-yellow-500';
    
    if (mode === 'truck') {
      return <Truck className={`w-4 h-4 ${iconColor}`} />;
    } else {
      return <Store className={`w-4 h-4 ${iconColor}`} />;
    }
  };

  const getReturnIcon = (mode: string, status: string) => {
    const iconColor = status === 'completed' ? 'text-blue-600' : 'text-yellow-500';
    
    if (mode === 'truck') {
      return <Truck className={`w-4 h-4 ${iconColor}`} />;
    } else {
      return <Store className={`w-4 h-4 ${iconColor}`} />;
    }
  };

  const getLastFourDigits = (id: number) => {
    return String(id).slice(-4);
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');
    
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneSearchTerm(formatted);
  };

  const handleStoreChange = (store: string) => {
    setSelectedStores(prev => 
      prev.includes(store) 
        ? prev.filter(s => s !== store)
        : [...prev, store]
    );
  };

  const filteredData = scheduleData.filter(item => {
    const matchesNameSearch = !searchTerm || item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhoneSearch = !phoneSearchTerm || item.phone.includes(phoneSearchTerm);
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

    if (showRescheduled) {
      return (matchesNameSearch && matchesPhoneSearch && matchesCategory) && item.isRescheduled;
    }

    const matchesDeliveryReturn = (deliveryFilter || returnFilter);
    const matchesTruckStore = (
      (truckFilter && (item.deliveryMode === 'truck' || item.returnMode === 'truck')) ||
      (storeFilter && (item.deliveryMode === 'store' || item.returnMode === 'store'))
    );
    const matchesPayment = paymentFilter === 'all' || item.paymentStatus === paymentFilter;
    const matchesStore = selectedStores.includes(item.store);
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && (item.deliveryDate.includes('02') || item.returnDate.includes('02'))) ||
                       (dateFilter === 'week' && true);
    
    return matchesNameSearch && matchesPhoneSearch && matchesCategory && matchesDeliveryReturn && matchesTruckStore && matchesPayment && matchesStore && matchesDate;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (deliveryFilter && returnFilter) {
      return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
    }
    else if (deliveryFilter && !returnFilter) {
      return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
    }
    else if (!deliveryFilter && returnFilter) {
      return new Date(a.returnDate).getTime() - new Date(b.returnDate).getTime();
    }
    return new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime();
  });

  const handleEditOrder = (orderId: number) => {
    console.log(`Navigate to Order Details for order ${orderId}`);
  };

  const handleReload = () => {
    console.log('Reloading schedule data...');
  };

  const handleDeleteOrder = (orderId: number) => {
    console.log(`Delete order ${orderId}`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header - Fixed height */}
      <div className="bg-white shadow-sm flex-shrink-0">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Schedule Management</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleReload}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search - Fixed height */}
      <div className="bg-white border-b flex-shrink-0">
        <div className="px-6 py-4">
          {/* First Row - Search */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="(xxx) xxx-xxxx"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-40 text-sm"
                value={phoneSearchTerm}
                onChange={handlePhoneChange}
                maxLength={14}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="excavators">Excavators</option>
              <option value="compactors">Compactors</option>
              <option value="chippers">Chippers</option>
              <option value="generators">Generators</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Enhanced Filter Section with Cards */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Schedule Type Filter Card */}
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Schedule Type</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={deliveryFilter}
                        onChange={(e) => setDeliveryFilter(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Delivery</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={returnFilter}
                        onChange={(e) => setReturnFilter(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Return</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Transport Mode Filter Card */}
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Transport Mode</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={truckFilter}
                        onChange={(e) => setTruckFilter(e.target.checked)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Truck</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storeFilter}
                        onChange={(e) => setStoreFilter(e.target.checked)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">In Store</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Store Locations Filter Card */}
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-700">Store Locations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStores.includes('Charlotte')}
                        onChange={() => handleStoreChange('Charlotte')}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Charlotte</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStores.includes('Bon Aqua')}
                        onChange={() => handleStoreChange('Bon Aqua')}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Bon Aqua</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Special Filters Card */}
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Filter className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-gray-700">Special Filters</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showRescheduled}
                        onChange={(e) => setShowRescheduled(e.target.checked)}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-sm text-red-700 font-medium">Rescheduled Only</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Table Container - Flexible height */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 bg-white mx-6 my-4 rounded-lg shadow overflow-hidden flex flex-col">
          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                    Phone
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                    Equip. ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equip. Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Payment
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-3 py-3">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={item.productName}>
                        {item.productName}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3 w-16">
                      <div className="text-sm text-blue-600 font-medium">{getLastFourDigits(item.id)}</div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-xs" title={item.customer}>
                        {item.customer}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-32 sm:max-w-48 lg:max-w-xs" title={item.deliveryAddress}>
                        {item.deliveryAddress}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3 w-36">
                      <div className="text-sm text-gray-900 whitespace-nowrap font-mono">
                        {item.phone}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3 w-40">
                      <div className="text-sm text-gray-900 whitespace-nowrap font-mono">
                        {item.machineId || ''}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-xs" title={item.machineName}>
                        {item.machineName || ''}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="flex items-center space-x-2">
                        {getDeliveryIcon(item.deliveryMode, item.deliveryStatus)}
                        <div className="text-sm text-gray-900">
                          <div>{item.deliveryDate}</div>
                          <div className="text-xs text-gray-500">{item.deliveryTime}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="flex items-center space-x-2">
                        {getReturnIcon(item.returnMode, item.returnStatus)}
                        <div className="text-sm text-gray-900">
                          <div>{item.returnDate}</div>
                          <div className="text-xs text-gray-500">{item.returnTime}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-3 py-3 w-20">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(item.paymentStatus)}`}>
                        {item.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    
                    <td className="px-3 py-3 w-20">
                      <div className="flex items-center space-x-1">
                        <button 
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors"
                          title="Edit / Notes"
                          onClick={() => handleEditOrder(item.id)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Delete Order"
                          onClick={() => handleDeleteOrder(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination - Fixed at bottom */}
          <div className="bg-white px-4 py-2 flex items-center justify-between border-t border-gray-200 flex-shrink-0">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Show from <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                  <span className="font-medium">{sortedData.length}</span> records
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;