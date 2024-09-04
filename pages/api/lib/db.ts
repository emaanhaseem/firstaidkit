import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function getDB() {
  return await open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
}

export async function addApplicant(name: string, phone: string, screener: boolean) {

  const db = await getDB()
  return await db.run(
    'INSERT INTO applicant values(?, ?, ?)',
    [name, phone, screener]
  )
}