/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../utils/themeProvider';

export const Ps1 = () => {
  const [hostname, setHostname] = useState('');
  //const [ps1user, setPs1user] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line no-console
    //console.log('fired');

    if (typeof window !== undefined) {
      //console.log('inwindow');
      setHostname(window.location.hostname);
      //setPs1user(window.localStorage.getItem('ps1user') || 'guest');
    }
    //console.log(ps1user);
  }); // @TODO: Current setup for ps1user requires useEffect() hit on every update. This isn't ideal, but right now seems to be the only way to have the username update to the value BEFORE enter key instead of after. (This is broken, it updates all lines not just the new one!)

  return (
    <div>
      <span
        style={{
          color: theme.yellow,
        }}
      >
        guest
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        @
      </span>
      <span
        style={{
          color: theme.green,
        }}
      >
        {hostname}
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        :$ ~
      </span>
    </div>
  );
};

export default Ps1;
function getUsername() {
  throw new Error('Function not implemented.');
}
