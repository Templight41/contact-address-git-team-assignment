import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users: ", error);
      // Fallback for demo if firebase is not configured
      if (error.code === 'unavailable' || error.message.includes('api-key')) {
        console.warn("Firebase not configured correctly yet.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, "users"), {
        name,
        phone,
        createdAt: new Date()
      });
      setName('');
      setPhone('');
      fetchUsers(); // Refresh list after add
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding user. Check console and Firebase config.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Contact Manager</h1>
        <form onSubmit={handleSubmit} className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Contact'}
          </button>
        </form>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Contacts List</h2>
          <button
            onClick={fetchUsers}
            className="refresh-btn"
            style={{ width: 'auto', padding: '0.5rem 1rem', margin: 0 }}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        <div className="user-list">
          {users.length === 0 && !loading ? (
            <div className="empty-state">
              No contacts found. Add one above!
            </div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-phone">{user.phone}</span>
                </div>
              </div>
            ))
          )}
          {loading && users.length === 0 && (
            <div className="empty-state">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
