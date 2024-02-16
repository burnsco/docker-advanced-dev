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
    const indexes = await fetch('http://localhost:5001/values/all').then(res => res.json())
    setSeenIndexes(indexes)
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  seenIndexes.map(ind => console.log(ind.number))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Learn Stuff</h1>
      <form>
        <label htmlFor="index">Enter your index: </label>
        <input type="number" id="index" name="index" />
        <button>Submit</button>
      </form>
      <h3>Indexes Seen: </h3>
      <ul>
        {seenIndexes.map((index, t) => <li key={`${index}-${t}`}>{index.number}</li>)}
      </ul>
    </main>
  );
}
