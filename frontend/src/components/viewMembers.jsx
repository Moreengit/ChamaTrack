import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Search, Trash2, Pencil } from 'lucide-react';
import '../styles/viewMembers.css';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');

  // 🔹 Fetch members
  const fetchMembers = async () => {
    try {
      const res = await axiosInstance.get('/members');
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 🔹 Delete member
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this member?')) return;

    try {
      await axiosInstance.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Filter members
  const filteredMembers = members.filter((m) =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="members-page">

      {/* HEADER */}
      <div className="members-top">
        <div>
          <h2>Members</h2>
          <p>View and manage all registered chama members</p>
        </div>

        <div className="search-box">
          <Search size={18}/>
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="members-card">
        <div className="members-header">
          <h3>All Members</h3>
          <span>{filteredMembers.length} total</span>
        </div>

        <div className="members-table">

          <div className="table-header">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Actions</span>
          </div>

          {filteredMembers.length === 0 ? (
            <p className="empty">No members found</p>
          ) : (
            filteredMembers.map((member) => (
              <div key={member.id} className="table-row">
                <span>{member.name}</span>
                <span>{member.email}</span>
                <span>{member.phonenumber}</span>

                <div className="actions">
                  <button className="edit-btn">
                    <Pencil size={16}/>
                  </button>

                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
};

export default ViewMembers;