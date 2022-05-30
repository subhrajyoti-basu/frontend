import React, { useEffect, useState } from 'react'
import { arweave } from '../utils/arweave'

export default function UserData({ id }) {

    const [data, setData] = useState({
        name: 'n/A',
        institution: 'n/A',
        subjects: 'n/A',
        image: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='

    })

    const getUser = async () => {
        let query = `
    {
      transactions(
        owners: "${id}"
        tags: {
        name: "type",
        values: ["profile"]
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
        if (typeof results.data.data.transactions.edges[0] != 'undefined') {


            const a = await arweave.transactions.getData(results.data.data.transactions.edges[0].node.id, { decode: true, string: true })
            setData(JSON.parse(a))
        }
        // console.log(data)

    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className='mt-4 lg:mt-10 mx-4'>
            <div className='flex flex-col items-center'>
                <div className='w-[100px] h-[100px] overflow-clip rounded-full'>
                    <img src={data.image} alt="" />
                </div>
                <h1 className='text-xl'>
                    {data.name}
                </h1>
                <h3>
                    {data.institution}
                </h3>
                <div className='w-3/5 text-center'>
                    <h4>
                        {data.subjects}
                    </h4>
                </div>
            </div>
        </div>
    )
}
