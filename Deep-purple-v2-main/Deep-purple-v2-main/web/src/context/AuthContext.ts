import { fetchUserAttributes, signOut, getCurrentUser, updateUserAttributes, signUp, 
  signIn, type ConfirmSignUpInput, confirmSignUp  } from 'aws-amplify/auth';

import {
  Theme,
  useTheme,
} from '@aws-amplify/ui-react';

export async function handleFetchUserAttributes() {
  try {
    const userAttributes = await fetchUserAttributes();
    const email = await userAttributes.email;
    return email;
  } catch (error) {
    console.log(error);
  }
}


export async function getUsername() {
  try {
    const userAttributes = await getCurrentUser();
    const username = await userAttributes.username;
    return username;
  } catch (error) {
    console.log(error);
  }
}

async function handleUpdateEmailAndNameAttributes(
  updatedEmail: string,
  updatedName: string
) {
  try {
    const attributes = await updateUserAttributes({
      userAttributes: {
        email: updatedEmail,
        name: updatedName
      }
    });
    // handle next steps
  } catch (error) {
    console.log(error);
  }
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


export function AuthStyle() { 
  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.black.value,
          },
          secondary: {
            value: tokens.colors.neutral['100'].value,
          },
        },
        font: {
          interactive: {
            value: tokens.colors.white.value,
          },
          primary: {
            value: tokens.colors.white.value,
          },
          secondary: {
            value: tokens.colors.white.value,
          },
        },
        brand: {
          
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.white.value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.purple['80'].value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.white.value,
              },
            },
          },
        },
        
      },
    },
  };
  return theme;
}

export async function addUser() {
  try {
    await signUp({
      username: 'kelli',
      password: 'mysecurerandompassword#123',
      options: {
        userAttributes: {
          email: 'phyyyopyaesome@gmail.com',
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
}

interface User {
  username: string;
  password: string;
  email: string;
  account_type: string;

}

export async function createNewUser(user : User) {
  try {
    await signUp({
      username: user.username,
      password: user.password,
      options: {
        userAttributes: {
          email: user.email,
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
}
