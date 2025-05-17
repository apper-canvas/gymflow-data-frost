import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const MainFeature = ({ activeTab }) => {
  // Icons setup
  const UserPlusIcon = getIcon('UserPlus');
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const EditIcon = getIcon('Edit');
  const TrashIcon = getIcon('Trash');
  const CheckCircleIcon = getIcon('CheckCircle');
  const XCircleIcon = getIcon('XCircle');
  
  // State for member management
  const [members, setMembers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", phone: "555-1234", plan: "Premium", status: "Active", joined: "2023-05-12" },
    { id: 2, name: "Sam Wilson", email: "sam@example.com", phone: "555-2345", plan: "Basic", status: "Active", joined: "2023-07-23" },
    { id: 3, name: "Jessica Davis", email: "jessica@example.com", phone: "555-3456", plan: "Premium", status: "Inactive", joined: "2022-11-05" },
    { id: 4, name: "Mark Thomas", email: "mark@example.com", phone: "555-4567", plan: "Standard", status: "Active", joined: "2023-02-18" },
    { id: 5, name: "Emily Parker", email: "emily@example.com", phone: "555-5678", plan: "Basic", status: "Active", joined: "2023-08-30" }
  ]);
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic'
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  
  // Form validation errors
  const [formErrors, setFormErrors] = useState({});
  
  // Edit member state
  const [editingMemberId, setEditingMemberId] = useState(null);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setNewMember({
      ...newMember,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    
    if (!newMember.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!newMember.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(newMember.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!newMember.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    
    return errors;
  };
  
  // Handle adding a new member
  const handleAddMember = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    if (editingMemberId) {
      // Update existing member
      const updatedMembers = members.map(member => 
        member.id === editingMemberId 
          ? { 
              ...member, 
              name: newMember.name,
              email: newMember.email,
              phone: newMember.phone,
              plan: newMember.plan 
            } 
          : member
      );
      
      setMembers(updatedMembers);
      toast.success("Member updated successfully!");
      setEditingMemberId(null);
    } else {
      // Add new member
      const newId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1;
      
      const memberToAdd = {
        id: newId,
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone,
        plan: newMember.plan,
        status: "Active",
        joined: new Date().toISOString().split('T')[0]
      };
      
      setMembers([...members, memberToAdd]);
      toast.success("New member added successfully!");
    }
    
    // Reset form
    setNewMember({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic'
    });
    
    setShowAddMemberForm(false);
  };
  
  // Handle editing a member
  const handleEditMember = (member) => {
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      plan: member.plan
    });
    
    setEditingMemberId(member.id);
    setShowAddMemberForm(true);
  };
  
  // Handle deleting a member
  const handleDeleteMember = (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      const updatedMembers = members.filter(member => member.id !== id);
      setMembers(updatedMembers);
      toast.success("Member deleted successfully!");
    }
  };
  
  // Handle toggling member status
  const handleToggleStatus = (id) => {
    const updatedMembers = members.map(member => 
      member.id === id 
        ? { ...member, status: member.status === "Active" ? "Inactive" : "Active" } 
        : member
    );
    
    setMembers(updatedMembers);
    const member = updatedMembers.find(m => m.id === id);
    toast.info(`Member status changed to ${member.status}`);
  };
  
  // Filter members based on search query and filters
  const filteredMembers = members.filter(member => {
    // Search filter
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.phone.includes(searchQuery);
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || member.status.toLowerCase() === statusFilter.toLowerCase();
    
    // Plan filter
    const matchesPlan = planFilter === 'all' || member.plan.toLowerCase() === planFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlan;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4 md:p-6">
      {activeTab === 'members' && (
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-surface-800 dark:text-surface-100">
              Member Management
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              
              <button
                onClick={() => {
                  setEditingMemberId(null);
                  setNewMember({
                    name: '',
                    email: '',
                    phone: '',
                    plan: 'Basic'
                  });
                  setShowAddMemberForm(!showAddMemberForm);
                }}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <UserPlusIcon size={18} />
                <span>{editingMemberId ? "Update Member" : "Add Member"}</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-surface-500 dark:text-surface-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm bg-surface-100 dark:bg-surface-700 rounded-lg py-1 px-2 border-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="text-sm bg-surface-100 dark:bg-surface-700 rounded-lg py-1 px-2 border-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Plans</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          
          <AnimatePresence>
            {showAddMemberForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <form onSubmit={handleAddMember} className="bg-surface-50 dark:bg-surface-700/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingMemberId ? "Edit Member" : "Add New Member"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newMember.name}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Full name"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newMember.email}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Email address"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={newMember.phone}
                        onChange={handleInputChange}
                        className={`input-field ${formErrors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Membership Plan</label>
                      <select
                        name="plan"
                        value={newMember.plan}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddMemberForm(false);
                        setFormErrors({});
                      }}
                      className="btn bg-surface-200 dark:bg-surface-600 text-surface-800 dark:text-surface-200 hover:bg-surface-300 dark:hover:bg-surface-500"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingMemberId ? "Update Member" : "Add Member"}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          {filteredMembers.length > 0 ? (
            <div className="overflow-x-auto -mx-4 px-4">
              <motion.table
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full min-w-[640px] table-auto"
              >
                <thead>
                  <tr className="border-b border-surface-200 dark:border-surface-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-800 dark:text-surface-200">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-800 dark:text-surface-200">Contact</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-800 dark:text-surface-200">Plan</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-800 dark:text-surface-200">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-surface-800 dark:text-surface-200">Joined</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-surface-800 dark:text-surface-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <motion.tr
                      key={member.id}
                      variants={itemVariants}
                      className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/30"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-surface-800 dark:text-surface-100">{member.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-surface-600 dark:text-surface-400">{member.email}</div>
                        <div className="text-xs text-surface-500 dark:text-surface-500">{member.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          member.plan === 'Premium' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                            : member.plan === 'Standard'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {member.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span 
                          onClick={() => handleToggleStatus(member.id)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                            member.status === 'Active' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}
                        >
                          {member.status === 'Active' ? (
                            <CheckCircleIcon size={14} />
                          ) : (
                            <XCircleIcon size={14} />
                          )}
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-surface-600 dark:text-surface-400">
                        {new Date(member.joined).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditMember(member)}
                            className="p-1 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light"
                            aria-label="Edit member"
                          >
                            <EditIcon size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-1 text-surface-600 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-400"
                            aria-label="Delete member"
                          >
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-surface-600 dark:text-surface-400">
                {searchQuery || statusFilter !== 'all' || planFilter !== 'all'
                  ? "No members found matching your filters."
                  : "No members found. Add your first member!"}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab !== 'members' && (
        <div className="py-12 text-center">
          <h3 className="text-xl font-bold text-surface-800 dark:text-surface-100 mb-2">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Feature Coming Soon
          </h3>
          <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
            This feature is under development. Please check back later or try the Member Management feature.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainFeature;