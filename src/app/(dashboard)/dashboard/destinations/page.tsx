// // src/app/admin/destinations/page.tsx
// 'use client';

// import { useState, useEffect, SetStateAction } from 'react';
// import { Plus, Edit, Trash2, Eye, Upload, Image as ImageIcon } from 'lucide-react';
// import DestinationForm from '@/components/Forms/DestinationForm';
// import { api } from '@/lib/utils/api';

// export default function AdminDestinationsPage() {
//   const [destinations, setDestinations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingDestination, setEditingDestination] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchDestinations = async () => {
//     setLoading(true);
//     try {
//       const response = await api.getDestinations({ limit: 50 });
//       if (response.success) {
//         setDestinations(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching destinations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   const handleEdit = (destination: SetStateAction<null>) => {
//     setEditingDestination(destination);
//     setShowForm(true);
//   };

//   const handleDelete = async (id: any) => {
//     if (confirm('Are you sure you want to delete this destination?')) {
//       try {
//         await api.deleteDestination(id);
//         fetchDestinations();
//       } catch (error) {
//         console.error('Error deleting destination:', error);
//       }
//     }
//   };

//   const handleFormSubmit = () => {
//     setShowForm(false);
//     setEditingDestination(null);
//     fetchDestinations();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Destinations Management</h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
//         >
//           <Plus className="w-4 h-4" />
//           Add Destination
//         </button>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
//             <DestinationForm
//               destination={editingDestination}
//               onSubmit={handleFormSubmit}
//               onCancel={() => {
//                 setShowForm(false);
//                 setEditingDestination(null);
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Destinations Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tours</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {destinations.map((destination) => (
//               <tr key={destination._id}>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     {destination.mainImage && (
//                       <img
//                         src={destination.mainImage}
//                         alt={destination.title}
//                         className="w-10 h-10 rounded object-cover"
//                       />
//                     )}
//                     <div>
//                       <div className="font-medium">{destination.title}</div>
//                       <div className="text-sm text-gray-500">{destination.slug}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">{destination.region}</td>
//                 <td className="px-6 py-4">{destination.tourCount}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     destination.isActive 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {destination.isActive ? 'Active' : 'Inactive'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleEdit(destination)}
//                       className="p-1 text-blue-600 hover:text-blue-800"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(destination._id)}
//                       className="p-1 text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                     <a
//                       href={`/destinations/${destination.slug}`}
//                       target="_blank"
//                       className="p-1 text-gray-600 hover:text-gray-800"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

'use client';

export default function AdminDestinationsPage() {   
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Destinations Management</h1>
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-600">Manage destinations here</p>   
            </div>
        </div>
    );
}