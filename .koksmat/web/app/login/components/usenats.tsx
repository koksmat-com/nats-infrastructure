// "use client"

// import { useEffect, useMemo, useRef, useState } from "react";
// import { connect, NatsConnection, StringCodec } from "nats.ws";

// export const useNATS = () => {
//     const [nats, setNATS] = useState<NatsConnection>()
//     const [natsConnected, setNATSConnected] = useState(false)
//     const [natsError, setNATSError] = useState(null)

//     useEffect(() => {
//       const connectNATS = async () => {
//         try {
//           //console.log('connecting to nats', natsUrl)
//           const nc = await connect({
//             servers: 'wss://0.0.0.0:433',
//           })

//           setNATS(nc)
//           setNATSConnected(true)
//           console.log('NATS connected')
//         } catch (error) {
//           setNATSError((error as any).message )
//           console.log('NATS error', error)
//         }
//       }
//       connectNATS()
//       return () => {
//         if (nats) {
//             nats.close()
//             console.log('NATS disconnected')
//             }
//         }
//     }, [])

//     // request data synchronously
//     async function request(topic, data) {
//       const jc = JSONCodec()
//       const res = await nats.request(topic, jc.encode(data))
//       return jc.decode(res.data)
//     }

//     // publish data asynchronously
//     async function publish(topic, data) {
//       const jc = JSONCodec()
//       nats.publish(topic, jc.encode(data))
//     }

//     return { nats, natsConnected, natsError, request, publish }
//   }
