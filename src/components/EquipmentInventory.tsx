import React, { useState } from 'react';
import { Search, Filter, Package, RotateCcw, Edit3, Trash2, MapPin, User, Calendar, Wrench } from 'lucide-react';

interface EquipmentItem {
  id: number;
  category: string;
  equipmentName: string;
  equipmentId: string;
  status: 'damaged' | 'maintenance' | 'hold' | 'rented' | 'available';
  techManager: string;
  lastUpdated: string;
  location: string;
  customerName?: string;
  orderId?: number;
  deliveryDate?: string;
  returnDate?: string;
  store: 'Charlotte' | 'Bon Aqua';
}

const EquipmentInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');
  const [showDamaged, setShowDamaged] = useState(true);
  const [showMaintenance, setShowMaintenance] = useState(true);
  const [showHold, setShowHold] = useState(true);
  const [showRented, setShowRented] = useState(true);
  const [showAvailable, setShowAvailable] = useState(true);

  // Sample equipment inventory data
  const [equipmentData] = useState<EquipmentItem[]>([
    {
      id: 1,
      category: 'excavators',
      equipmentName: 'Takeuchi TL12 Skid Steer',
      equipmentId: 'TAK-SS-5',
      status: 'rented',
      techManager: 'Mike Johnson',
      lastUpdated: '2024-05-07 09:15 AM',
      location: 'Customer Site',
      customerName: 'Jerry Verner',
      orderId: 4838,
      deliveryDate: 'May 07',
      returnDate: 'May 14',
      store: 'Charlotte'
    },
    {
      id: 2,
      category: 'excavators',
      equipmentName: 'Case CX57 Excavator',
      equipmentId: 'CAS-ME-2',
      status: 'rented',
      techManager: 'Sarah Davis',
      lastUpdated: '2024-05-10 09:00 AM',
      location: 'Customer Site',
      customerName: 'Gunner Bradford',
      orderId: 5008,
      deliveryDate: 'May 10',
      returnDate: 'May 17',
      store: 'Charlotte'
    },
    {
      id: 3,
      category: 'excavators',
      equipmentName: 'Volvo EC55B Excavator',
      equipmentId: 'VOLVO-EC55B-001',
      status: 'available',
      techManager: 'Tom Wilson',
      lastUpdated: '2024-05-21 02:30 PM',
      location: 'Bon Aqua Store',
      store: 'Bon Aqua'
    },
    {
      id: 4,
      category: 'chippers',
      equipmentName: 'Bandit 12" Wood Chipper',
      equipmentId: 'BAN-CH-12-003',
      status: 'maintenance',
      techManager: 'Mike Johnson',
      lastUpdated: '2024-05-15 11:45 AM',
      location: 'Charlotte Shop',
      store: 'Charlotte'
    },
    {
      id: 5,
      category: 'compactors',
      equipmentName: 'Wacker 3 Ton Roller',
      equipmentId: 'WAC-3T-007',
      status: 'available',
      techManager: 'Sarah Davis',
      lastUpdated: '2024-05-20 08:30 AM',
      location: 'Charlotte Store',
      store: 'Charlotte'
    },
    {
      id: 6,
      category: 'generators',
      equipmentName: 'Cat 9 Ton Generator w/Cab',
      equipmentId: 'CAT-9T-CAB-002',
      status: 'damaged',
      techManager: 'Tom Wilson',
      lastUpdated: '2024-05-18 03:15 PM',
      location: 'Bon Aqua Shop',
      store: 'Bon Aqua'
    },
    {
      id: 7,
      category: 'excavators',
      equipmentName: 'John Deere 35G Excavator',
      equipmentId: 'JD-35G-001',
      status: 'hold',
      techManager: 'Mike Johnson',
      lastUpdated: '2024-05-19 10:20 AM',
      location: 'Charlotte Store',
      store: 'Charlotte'
    },
    {
      id: 8,
      category: 'chippers',
      equipmentName: 'Vermeer BC1000XL Chipper',
      equipmentId: 'VER-BC1000-001',
      status: 'available',
      techManager: 'Sarah Davis',
      lastUpdated: '2024-05-22 09:45 AM',
      location: 'Bon Aqua Store',
      store: 'Bon Aqua'
    }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      'damaged': 'bg-red-100 text-red-800',
      'maintenance': 'bg-yellow-100 text-yellow-800',
      'hold': 'bg-purple-100 text-purple-800',
      'rented': 'bg-blue-100 text-blue-800',
      'available': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const iconColor = {
      'damaged': 'text-red-600',
      'maintenance': 'text-yellow-600',
      'hold': 'text-purple-600',
      'rented': 'text-blue-600',
      'available': 'text-green-600'
    };
    
    return <Package className={`w-4 h-4 ${iconColor[status as keyof typeof iconColor] || 'text-gray-600'}`} />;
  };

  const filteredData = equipmentData.filter(item => {
    const matchesSearch = !searchTerm || 
      item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.customerName && item.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesStore = storeFilter === 'all' || item.store === storeFilter;
    
    const matchesStatusFilter = (
      (showDamaged && item.status === 'damaged') ||
      (showMaintenance && item.status === 'maintenance') ||
      (showHold && item.status === 'hold') ||
      (showRented && item.status === 'rented') ||
      (showAvailable && item.status === 'available')
    );
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStore && matchesStatusFilter;
  });

  const handleEditEquipment = (equipmentId: number) => {
    console.log(`Edit equipment ${equipmentId}`);
  };

  const handleDeleteEquipment = (equipmentId: number) => {
    console.log(`Delete equipment ${equipmentId}`);
  };

  const handleReload = () => {
    console.log('Reloading equipment inventory...');
  };

  const handleCustomerClick = (customerName: string, orderId?: number) => {
    if (orderId) {
      console.log(`Navigate to order ${orderId} for customer ${customerName}`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header - Fixed height */}
      <div className="bg-white shadow-sm flex-shrink-0">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Package className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">Equipment Inventory</h1>
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
                placeholder="Search equipment, ID, or customer..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="rented">Rented</option>
              <option value="maintenance">Maintenance</option>
              <option value="damaged">Damaged</option>
              <option value="hold">Hold</option>
            </select>

            <select
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Stores</option>
              <option value="Charlotte">Charlotte</option>
              <option value="Bon Aqua">Bon Aqua</option>
            </select>
          </div>

          {/* Enhanced Filter Section with Cards */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Equipment Status Filter Card */}
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Equipment Status</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showAvailable}
                        onChange={(e) => setShowAvailable(e.target.checked)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Available</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showRented}
                        onChange={(e) => setShowRented(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Rented</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Maintenance & Issues Filter Card */}
              <div className="bg-white rounded-lg px-4 py-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Wrench className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-gray-700">Maintenance & Issues</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showMaintenance}
                        onChange={(e) => setShowMaintenance(e.target.checked)}
                        className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Maintenance</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showDamaged}
                        onChange={(e) => setShowDamaged(e.target.checked)}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Damaged</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showHold}
                        onChange={(e) => setShowHold(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 font-medium">Hold</span>
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
                    Category
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipment Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                    Equip. ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tech / Mgt.
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Date
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-3 py-3">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {item.category}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-xs" title={item.equipmentName}>
                        {item.equipmentName}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3 w-40">
                      <div className="text-sm text-blue-600 font-medium font-mono whitespace-nowrap">
                        {item.equipmentId}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900">
                        {item.techManager}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.lastUpdated}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900">
                        {item.status === 'rented' && item.customerName ? (
                          <button
                            onClick={() => handleCustomerClick(item.customerName!, item.orderId)}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            title={`View order ${item.orderId}`}
                          >
                            {item.customerName}
                          </button>
                        ) : (
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900">
                        {item.status === 'rented' && item.deliveryDate ? (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-blue-400" />
                            <span>{item.deliveryDate}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3">
                      <div className="text-sm text-gray-900">
                        {item.status === 'rented' && item.returnDate ? (
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-green-400" />
                            <span>{item.returnDate}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-3 py-3 w-20">
                      <div className="flex items-center space-x-1">
                        <button 
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors"
                          title="Edit Equipment"
                          onClick={() => handleEditEquipment(item.id)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                          title="Delete Equipment"
                          onClick={() => handleDeleteEquipment(item.id)}
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
                  <span className="font-medium">{filteredData.length}</span> records
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

export default EquipmentInventory;