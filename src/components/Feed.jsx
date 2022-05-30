import React from 'react'
import FeedCard from './FeedCard'
import { arweave } from '../utils/arweave';
import { useState, useEffect } from 'react';


export default function feed({ id }) {
  const [data, setData] = useState([])

  const getResearch = async () => {
    let query = `
    {
      transactions(
        owners: "${id}"
        tags: {
        name: "type",
        values: ["researchpaper"]
      }) 
      {
        edges {
          node {
            id
            block{
              id, timestamp
            }
          }
    
        }
      }
    }
    `
    const results = await arweave.api.post("/graphql", { query })
    // console.log("query result2:", results)
    if (results.status >= 400) {
      console.error("query failure.")
      return
    }

    const result = results.data.data.transactions.edges



    result.map(async d => {
      const a = await arweave.transactions.getData(d.node.id, { decode: true, string: true })
      setData(prev => [...prev, JSON.parse(a)])
    })

  }
  // console.log(data)
  useEffect(() => {
    getResearch()
  }, [])

  return (
    <div className='max-w-xl w-full px-4 mt-6 divide-y mx-auto'>
      {data.map((d, i) =>

        <FeedCard data={d} index={i} />
      )}
    </div>
  )
}
