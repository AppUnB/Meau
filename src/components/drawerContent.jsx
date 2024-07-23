import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { getAuth, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { AuthContext } from './authProvider';

function CustomDrawerContent(props) {
  const { isLoggedIn } = React.useContext(AuthContext);
  const { navigation } = props;

  CustomDrawerContent.propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth).finally(() => {
        navigation.navigate('Login');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {isLoggedIn ? (
        <>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={handleLogout} />
        </>
      ) : (
        <DrawerItem
          label="Login"
          onPress={() => props.navigation.navigate('Login')}
        />
      )}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
