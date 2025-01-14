'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Home');
  const router = useRouter();

  const handleSignOut = () => {
    // Redirect to the homepage
    router.push('/');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div>
            <h2 style={styles.heading}>Welcome to the Admin Dashboard!</h2>
            <div style={styles.cardContainer}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Orders</h3>
                <p style={styles.cardValue}>124</p>
              </div>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Customer Views</h3>
                <p style={styles.cardValue}>3,458</p>
              </div>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Products</h3>
                <p style={styles.cardValue}>52</p>
              </div>
            </div>
          </div>
        );
      case 'Product Catalog':
        const products = [
          'Product 1',
          'Product 2',
          'Product 3',
          'Product 4',
          'Product 5',
          'Product 6',
          'Product 7',
          'Product 8',
          'Product 9',
          'Product 10',
        ];

        return (
          <div>
            <div >
              {products.map((product, index) => (
                <div key={index} style={styles.productCard}>
                  <h3 style={styles.productTitle}>{product}</h3>
                  <div style={styles.productActions}>
                    <button style={styles.editButton}>Edit</button>
                    <button style={styles.deleteButton}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Reviews':
        const reviews = [
          'Product 1',
          'Product 2',
          'Product 3',
          'Product 4',
          'Product 5',
          'Product 6',
          'Product 7',
          'Product 8',
          'Product 9',
          'Product 10',
        ];

        return (
          <div>
            <div>
              {reviews.map((product, index) => (
                <div key={index} style={styles.productCard}>
                  <h3 style={styles.productTitle}>{product}</h3>
                  <div style={styles.productActions}>
                    <button style={styles.deleteButton}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Orders':
        const orders = [
          'Product 1',
          'Product 2',
          'Product 3',
          'Product 4',
          'Product 5',
          'Product 6',
          'Product 7',
          'Product 8',
          'Product 9',
          'Product 10',
        ];

        return (
          <div>
            <div >
              {orders.map((product, index) => (
                <div key={index} style={styles.productCard}>
                  <h3 style={styles.productTitle}>{product}</h3>
                  <div style={styles.productActions}>
                    <button style={styles.completeButton}>Complete</button>
                    <button style={styles.deleteButton}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div style={styles.profileContainer}>
            <div style={styles.profileCard}>
              <div style={styles.profileInfo}>
                <p style={styles.profileText}>Name: John Doe</p>
                <p style={styles.profileText}>Email: johndoe@example.com</p>
              </div>
              <button onClick={handleSignOut} style={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          </div>
        );
      default:
        return <p>Welcome to the Admin Dashboard!</p>;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <ul style={styles.sidebarList}>
          {['Dashboard', 'Product Catalog', 'Reviews', 'Orders', 'Profile'].map((item) => (
            <li
              key={item}
              style={{
                ...styles.sidebarItem,
                backgroundColor: activePage === item ? '#e5e7eb' : '#ffffff',
                fontWeight: activePage === item ? 'bold' : 'normal',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
              onMouseLeave={(e) => {
                if (activePage !== item) e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onClick={() => setActivePage(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h1 style={styles.mainHeading}>
          {activePage === 'Home' ? 'Welcome to the Admin Dashboard!' : activePage}
        </h1>
        <div style={styles.content}>{renderContent()}</div>
      </main>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f3f4f6',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    paddingTop: '16px',
  },
  sidebarList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  sidebarItem: {
    padding: '12px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  mainContent: {
    flex: 1,
    padding: '32px',
  },
  mainHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardContainer: {
    display: 'flex',
    gap: '16px',
    marginTop: '32px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '200px',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151',
  },
  cardValue: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  productCard: {
    width: 'calc(33.33% - 16px)',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  productTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  productActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  completeButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  profileContainer: {
    padding: '32px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
  },
  profileCard: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  profileInfo: {
    marginBottom: '16px',
  },
  profileText: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '16px',
  },
  content: {
    marginTop: '16px',
    color: '#4b5563',
  },
};

export default Dashboard;
