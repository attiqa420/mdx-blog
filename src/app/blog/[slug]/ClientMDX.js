// app/posts/[slug]/ClientMDX.js
'use client';

import React, { useMemo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';

// Optional: custom MDX component mappings
const components = {
  h1: (props) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
  p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
  // Add more as needed
};

export default function ClientMDX({ code }) {
  const MDXContent = useMemo(() => {
    const { default: Comp } = new Function('React', ...Object.keys(runtime), code)(
      React,
      ...Object.values(runtime)
    );
    return Comp;
  }, [code]);

  return (
    <MDXProvider components={components}>
      <MDXContent />
    </MDXProvider>  
  );
}
