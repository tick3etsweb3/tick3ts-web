import {
  Alert,
  AlertIcon,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { Result } from '@ethersproject/abi'
import { IPFSHTTPClient } from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import Card from './nftCard'
import BiggerCard from './ModalNft';

interface NftListProps {
  address?: string | null
  ipfs: IPFSHTTPClient
  nftTokenUris: Array<Result> | Array<unknown>
}

type NftMetadataType = {
  description: string
  image: string
  name: string
}

export const NftList = ({
  address,
  ipfs,
  nftTokenUris,
}: NftListProps): JSX.Element => {
  const [nfts, setNfts] = useState<Array<NftMetadataType>>([])
  const [selectedId, setSelectedId] = useState<string>('');


  useEffect(() => {
    const fetchNftData = async (ipfsHash: string) => {
      try {
        const resp = await ipfs.cat(ipfsHash)
        let content: Array<number> = []

        for await (const chunk of resp) {
          content = [...content, ...chunk]
        }

        const raw = Buffer.from(content).toString('utf8')

        return JSON.parse(raw)
      } catch (error) {
        console.log('error', error)
      }
    }

    const processTokenUris = async () => {
      const nftData = await Promise.all(
        nftTokenUris.map(async (tokenUri: any = '') => {
          if (tokenUri) {
            const ipfsHash = tokenUri.replace('https://ipfs.io/ipfs/', '')
            const ipfsData = await fetchNftData(ipfsHash)
            return ipfsData
          }

          return {
            image: '',
            name: '',
          }
        })
      )

      setNfts(nftData)
    }

    processTokenUris()
  }, [ipfs, nftTokenUris])

  if (nftTokenUris.length === 0) {
    return (
      <Alert status="warning">
        <AlertIcon />
        No NFTs associated with your address: {address}
      </Alert>
    )
  }

  return (
    <AnimateSharedLayout>
      <SimpleGrid my="6" columns={3} gap="6">
        {nfts.map((nft) => {
          return (
            <div onClick={() => setSelectedId(nft.image)}>
              <Card name={nft.description} cardId={nft.image} url={nft.image} />
            </div>
          )
        })}
      </SimpleGrid>
      <AnimatePresence>
        {selectedId ? (
          <BiggerCard
            onClick={setSelectedId}
            id={selectedId}
            url={selectedId}
          />
        ) : null}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}
