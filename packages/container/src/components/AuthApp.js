import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// take the mount function from marketing and
// give it a div to render to
export default () => {
  const ref = useRef(null);
  // this is a copy of the browser history
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // pathname: nextPathname just renamed the pathname variable
      onNavigate: ({ pathname: nextPathname }) => {
        // update the container's browser path to match the marketing app's path
        // if we are not already on that path
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    // this is the callback that gets called when the container navigates
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
}