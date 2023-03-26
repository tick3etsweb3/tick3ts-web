import React from 'react'
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  Button,
  Divider,
  Badge,
} from '@chakra-ui/react'
import { useAccount, useContractRead, useContractReads } from 'wagmi'
import abiEvent from '../constants/abiEvent'
import abi, { TICKET_CONTRACT_ADDRESS } from '../constants'
import { Layout } from '../components/layout/Layout'
import EventCard from '../components/EventCard'

const Events = () => {
  const { address } = useAccount()
  const { data: events, error } = useContractRead({
    address: TICKET_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'getEventsPerAddress',
    args: [address as `0x${string}`],
  })

  console.log({ error })
  console.log({ events })

  return (
    <Layout>
      {events?.map((item) => (
        <EventCard address={item} />
      ))}
    </Layout>
  )
}

export default Events
