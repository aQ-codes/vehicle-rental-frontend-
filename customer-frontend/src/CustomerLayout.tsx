'use client';
import React, { ReactNode } from "react";
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/config/apolloClient'

// import Navbar from "../../components/Navbar/Navbar";

import styles from './CustomerLayout.module.css'
import { PreferenceProvider } from "./context/preference-context";

interface UserLayoutProps {
    children: ReactNode;
}

const CustomerLayout: React.FC<UserLayoutProps> = ({ children }) => {

return (
    <ApolloProvider client={apolloClient}>
    <PreferenceProvider>
    <div className={styles.customerLayout}>
      <header className={styles.header}>
        {/* <Navbar/> */}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
    </PreferenceProvider>
    </ApolloProvider>

  );
}

export default CustomerLayout
