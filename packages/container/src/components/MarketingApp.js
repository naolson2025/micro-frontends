import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

// take the mount function from marketing and
// give it a div to render to
export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
}