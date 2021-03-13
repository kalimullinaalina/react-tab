import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

import { Tabs } from "../components/Tabs"

export default function Home({ query }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Tabs</title>
      </Head>

      <main>
        <Tabs initialTab={query}>
          <div label="Trailers">
            </div>
          <div label="Drivers">
              </div>
          <div label="Cars">
          </div>
        </Tabs>
      </main>
    </div>
  )
}

Home.getInitialProps = ({query}) => {
  return {query}
}