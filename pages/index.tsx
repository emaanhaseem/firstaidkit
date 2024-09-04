import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import SubmitNewApplicantForm from './components/handleSubmit'
import type { Applicant } from './api/lib/applicant'

const Home: NextPage = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  let applicantsChanged = 0

  useEffect(() => {
    (async () => {
      setApplicants(await (await fetch('/api/all')).json() as Applicant[]);
    })();
  }, [applicants]);

  return (
    <div className={styles.container}>
      <Head>
        <title>FirstAidKit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          (First) AidKit Task
        </h1>

        <SubmitNewApplicantForm />

        <h2>Applicant List</h2>
        <ul className={styles['applicant-list']}>
          {applicants.map(a => <li className={styles.applicant} key={a.name}>
            <div className={styles.name}>{a.name}</div>
            <div className={styles.phone}>{a.phone}</div>
          </li>
          )}
        </ul>
      </main>
    </div>
  )
}

export default Home