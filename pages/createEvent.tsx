import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { create } from 'ipfs-http-client'
import type { NextPage } from 'next'
import { useState } from 'react'
import {
  erc721ABI,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Layout } from '../components/layout/Layout'
import abi, { TICKET_CONTRACT_ADDRESS } from '../constants'

const projectId = '2DDHiA47zFkJXtnxzl2jFkyuaoq'
const projectSecret = '96a91eeafc0a390ab66e6a87f61152aa'
const projectIdAndSecret = `${projectId}:${projectSecret}`

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      'base64'
    )}`,
  },
})

const CreateEvent: NextPage = () => {
  const { address } = useAccount()

  const toast = useToast()

  const [eventName, setEventName] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [ticketAmount, setTicketAmount] = useState('1')
  const [ticketPrice, setTicketPrice] = useState('1')
  const { data: eventCreated, error: fuck } = usePrepareContractWrite({
    address: TICKET_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'createEvent',
    args: [
      eventName,
      eventLocation,
      eventDate,
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      BigNumber.from(ticketAmount ? ticketAmount : 1),
      BigNumber.from(ticketPrice ? ticketPrice : 1),
    ],
  })
  console.log({ address })
  const { data: events } = useContractRead({
    address: TICKET_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'events',
    args: [address as `0x${string}`],
  })

  const {
    writeAsync: createEvent,
    reset: resetCreateEvent,
    data: createEventTx,
  } = useContractWrite(eventCreated)
  const { status: createEventStatus } = useWaitForTransaction(createEventTx)
  const handleCreateEvent = () => {
    createEvent?.()
    setEventName('')
    setEventLocation('')
    setEventDate('')
  }
  // Creates the contracts array for `nftTokenIds`

  const { isLoading } = useWaitForTransaction({
    hash: createEventTx?.hash,
    onSuccess(data) {
      console.log('success data', data)

      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Successfully created your event NFT!</Text>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.blockHash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  return (
    <Layout>
      <Heading as="h1" mb="8">
        Mint NFT
      </Heading>
      <Text mt="8" fontSize="xl">
        This page only works on the GOERLI Testnet or on a Local Chain.
      </Text>
      <Box p="8" mt="8" bg="gray.100">
        <Divider my="8" borderColor="gray.400" />

        {/* Add inputs for event details */}
        <FormControl id="eventName" mt={4}>
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </FormControl>

        <FormControl id="eventLocation" mt={4}>
          <FormLabel>Event Location</FormLabel>
          <Input
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </FormControl>

        <FormControl id="eventDate" mt={4}>
          <FormLabel>Event Date</FormLabel>
          <Input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="eventTime" mt={4}>
          <FormLabel>Event Time</FormLabel>
          <Input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </FormControl>

        <FormControl id="ticketAmount" mt={4}>
          <FormLabel>Amount of Tickets</FormLabel>
          <NumberInput
            min={0}
            value={ticketAmount}
            onChange={(value) => setTicketAmount(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl id="ticketPrice" mt={4}>
          <FormLabel>Price for a Ticket</FormLabel>
          <NumberInput
            min={0}
            value={ticketPrice}
            onChange={(value) => setTicketPrice(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Text textAlign="center">
          <Button
            colorScheme="teal"
            size="lg"
            // disabled={isLoading}
            onClick={handleCreateEvent}
            // isLoading={isLoading}
          >
            {
              {
                idle: 'Create',
                error: 'Try again',
                loading: 'Creating...',
                success: 'Created!',
              }[createEventStatus]
            }
          </Button>
        </Text>
        <Divider my="8" borderColor="gray.400" />
        {/* {nftTokenUris && (
      <NftList address={address} ipfs={ipfs} nftTokenUris={nftTokenUris} />
    )} */}
      </Box>
    </Layout>
  )
}

export default CreateEvent
