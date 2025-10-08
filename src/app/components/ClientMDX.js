'use client';

import { MDXRemote } from 'next-mdx-remote';

// Example custom component
function MyAlert({ children }) {
  return (
    <div style={{ padding: '1em', border: '1px solid red', backgroundColor: '#fee' }}>
      {children}
    </div>
  );
}
function InfoBox({ children }) {
  return (
    <div style={{ padding: '1rem', border: '2px solid blue', backgroundColor: '#e0f7ff', borderRadius: '8px', margin: '1rem 0' }}>
      {children}
    </div>
  );
}
const components = {
  MyAlert,
InfoBox,
};

export default function ClientMDX({ source }) {
  return <MDXRemote {...source} components={components} />;
}
