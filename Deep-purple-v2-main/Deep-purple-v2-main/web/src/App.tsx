import { Amplify } from 'aws-amplify';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Authenticator, Button, Heading, Image, Text, View, useAuthenticator, useTheme, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import RouteLayout from './pages/RouteLayout';
import Home from './pages/StreamPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsBoard from './pages/ReportPage';
import InboxPage from './pages/InboxPage';
import { AuthStyle, handleFetchUserAttributes } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import AIplayground from './components/AIplayground';
import Test from './pages/Test';
import Subscraption from './pages/Subscraption';
import { UsernameContext } from './context/Usernamecontext';
import React, { useEffect, useState } from 'react';
import BugReportPage from './pages/BugReportPage';
import BillingInvoicesPage from './pages/BillingInvoices';
import BillingInvoiceDetail from './pages/BillingInvoiceDetail';
import CreateSubscriptionPlan from './pages/CreateSubscriptionPlan';
import SubscriptionPlan from './pages/SubscriptionPlan';
import UpdateSubscriptionPlan from './pages/UpdateSubscriptionPlan';
import SuspendedSubscriptionPlan from './pages/SuspendedSubscriptionPlan';
import UserAccount from './pages/UserAccount';
import CreateUserAccount from './pages/CreateUserAccount';
import UpdateUserAccount from './pages/UpdateUserAccount';
import SuspendedUserAccount from './pages/SuspendedUserAccount';
import BugReport from './pages/BugReport';
import BugReportDetail from './pages/BugReportDetail';
import ClosedBugReport from './pages/ClosedBugReport';
Amplify.configure(awsExports);

const components = {

  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toForgotPassword } = useAuthenticator();

      const handleClick = () => {
        toForgotPassword();
      }

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={handleClick}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  SetupTotp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ForgotPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: false,
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 1,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  forgotPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};


export default function App() {
  const theme = AuthStyle();
  const [selectedUsername, setSelectedUsername] = useState('');

  return (
    <main className='flex-grow h-screen'>
      <ThemeProvider theme={theme}>
        <Authenticator formFields={formFields} components={components}>
          <UsernameContext.Provider value={{ selectedUsername, setSelectedUsername }}>
            <BrowserRouter>

              <Routes>

              /* private routes */
                <Route element={<RouteLayout />}>
                  <Route index element={<Home />} />
                  <Route path="/:dashboardname" element={<Home />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/analytics/:analyticsType" element={<AnalyticsPage />} />
                  <Route path="/analytics/negativeposts/:postId" element={<AnalyticsPage />} />
                  <Route path="/analytics/sentiment/:displayType" element={<AnalyticsPage />} />
                  <Route path="/report/:sub_page" element={<ReportsBoard />} />
                  <Route path='/inbox' element={<InboxPage />} />
                  <Route path='/Profile' element={<ProfilePage />} />
                  <Route path='/Profile/:displayOptions' element={<ProfilePage />} />
                  <Route path='/Profile/editProfile/:editUsername' element={<ProfilePage />} />
                  <Route path='aiplay' element={<AIplayground />} />
                  <Route path='/test' element={<Test />} />
                  <Route path='/subscription' element={<Subscraption />} />
                  <Route path='/bugreports' element={<BugReportPage />} />
                  <Route path='/invoices' element={<BillingInvoicesPage />} />
                  <Route path="/invoice/:id" element={<BillingInvoiceDetail />} />
                  <Route path="/subscription_plan/" element={<SubscriptionPlan />} />
                  <Route path="/subscription_plan/update/:planId" element={<UpdateSubscriptionPlan />} />
                  <Route path="/subscription_plan/create" element={<CreateSubscriptionPlan />} />
                  <Route path="/subscription_plan/suspended" element={<SuspendedSubscriptionPlan />} />
                  <Route path="/user/" element={<UserAccount />} />
                  <Route path="/user/create" element={<CreateUserAccount />} />
                  <Route path="/user/edit/:userId" element={<UpdateUserAccount />} />
                  <Route path="/user/suspended" element={<SuspendedUserAccount />} />
                  <Route path="/bug_report/" element={<BugReport />} />
                  <Route path="/bug_report/closed" element={<ClosedBugReport />} />
                  <Route path="/bug_report/:bugId" element={<BugReportDetail />} />
                </Route>

              </Routes>
            </BrowserRouter>
          </UsernameContext.Provider>
        </Authenticator>
      </ThemeProvider>
    </main>
  );
}