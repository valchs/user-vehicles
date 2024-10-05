import React from 'react';

export const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

export const headerStyle: React.CSSProperties = {
  backgroundColor: '#f7f7f7',
  fontWeight: 'bold',
  textAlign: 'left',
  padding: '12px',
};

export const rowStyle: React.CSSProperties = {
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
};

export const cellStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};
