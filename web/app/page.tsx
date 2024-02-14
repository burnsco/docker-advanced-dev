"use client"

import { useEffect, useState } from 'react';

export default function Home() {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  async function fetchValues() {
    const values = await fetch('http://localhost:5001/values/current')
    setValues(values)
  }
  async function fetchIndexes() {
    const indexes = await fetch('http://localhost:5001/values/all')
    setSeenIndexes(state => ({
      ...state,
      indexes
    }))
  }
  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Learn Stuff</h1>
    </main>
  );
}
