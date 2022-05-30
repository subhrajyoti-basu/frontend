import React from 'react'
import { useState, useEffect } from 'react'
import { arweave } from '../utils/arweave'
import { Buffer } from 'buffer'
import MarkdownView from 'react-showdown'

export default function Post({ id, pNo }) {
    const [data, setData] = useState()

    const getPage = async () => {
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
        // console.log("query result:", results)
        if (results.status >= 400) {
            console.error("query failure.")
            return
        }


        // console.log(`data:`, results.data.data.transactions.edges[0].node.id)
        if (typeof results.data.data.transactions.edges[pNo - 1] != 'undefined') {


            const a = await arweave.transactions.getData(results.data.data.transactions.edges[pNo - 1].node.id, { decode: true, string: true })
            const b = JSON.parse(a);

            const d = b.mdFile.split(",")[1]
            const e = Buffer.from(d, 'base64').toString()

            // var converter = new showdown.Converter()
            // var html = converter.makeHtml(e)
            setData(e)
        }
        // console.log(data)
    }
    useEffect(() => {
        getPage()
    }, [])
    return (
        <div className='max-w-xl w-full px-4 mt-6 divide-y mx-auto'>
            <MarkdownView markdown={data} className='markdown' />
        </div>
    )
}
