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
  const handleClick = () => {
    router.push('/pages/add');
  };

  const renderContent = () => {
    switch (activePage) {

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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {products.map((product, index) => (
                <div
                  key={index}
                  style={{
                    width: 'calc(33.33% - 16px)',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {product}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <button
                      style={{
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Delete
                    </button>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {reviews.map((product, index) => (
                <div
                  key={index}
                  style={{
                    width: 'calc(33.33% - 16px)',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {product}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>

                    <button
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Delete
                    </button>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {orders.map((product, index) => (
                <div
                  key={index}
                  style={{
                    width: 'calc(33.33% - 16px)',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                    {product}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>

                    <button
                      style={{
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Complete
                    </button>
                    <button
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div style={{ padding: '32px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '24px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >

              <div style={{ marginBottom: '16px' }}>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Name: admin
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#374151',
                  }}
                >
                  Email: admin@stylora.com
                </p>
              </div>
              <button
                onClick={handleSignOut}
                style={{
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
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        );
      default:
      case 'Dashboard':
        return (
          <div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '200px',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                  Orders
                </h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                  124
                </p>
              </div>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '200px',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                  Customer Views
                </h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                  3,458
                </p>
              </div>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '200px',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                  Products
                </h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
                  52
                </p>
              </div>
            </div>
            <br />
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={handleClick}
            >
              <div
                style={{
                  backgroundColor: '#00ff00',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  width: '200px',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                  Add Product
                </h3>

              </div>
              <br />
            </button>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '25%',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          paddingTop: '16px',
        }}
      >
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {['Dashboard', 'Product Catalog', 'Reviews', 'Orders', 'Profile'].map((item) => (
            <li
              key={item}
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
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
      <main style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          {activePage === 'Home' ? 'Welcome to the Admin Dashboard!' : activePage}
        </h1>
        <div style={{ marginTop: '16px', color: '#4b5563' }}>{renderContent()}</div>
      </main>
    </div>
  );
};

export default Dashboard;
