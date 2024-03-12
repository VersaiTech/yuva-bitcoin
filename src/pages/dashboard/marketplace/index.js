import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from '../../../layouts/dashboard'; // Importing the Layout component
import { GridList2 } from '../../../sections/components/grid-lists/grid-list-2';
import { paths } from '../../../paths'; // Importing the paths


// Placeholder data for demonstration purposes
const dummyListings = [
    {
      id: 1,
      name: 'Bitcoin',
      description: 'The first and most widely recognized cryptocurrency.',
      currentRate: '$60,000',
      cryptoId: 'BTC123',
      additionalDetail: 'Some additional detail about Bitcoin',
      currency: {
        id: '5e88792be2d4cfb4bf0971d9',
        avatar: '/assets/logos/logo-bitcoin.svg',
        name: 'Bitcoin'
      },
      lot:'25',
      marketCap: '0.212',
      volume: '5000',
      circulatingSupply: '18.7 million BTC',
      allTimeHigh: '$64,863.10',
      website: 'https://bitcoin.org/',
      whitepaper: 'https://bitcoin.org/bitcoin.pdf',
      founders: ['Satoshi Nakamoto'],
      yearFounded: 2009,
      socialMedia: {
        twitter: 'https://twitter.com/bitcoin',
        reddit: 'https://www.reddit.com/r/Bitcoin/'
      },
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Price',
            data: [50000, 55000, 60000, 65000, 70000, 75000], // Sample data points
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    },
    {
      id: 2,
      name: 'Ethereum',
      description: 'A decentralized platform that enables smart contracts and decentralized applications.',
      currentRate: '$2,500',
      cryptoId: 'ETH456',
      additionalDetail: 'Some additional detail about Ethereum',
      currency: {
        id: 'unique_id_for_ethereum',
        avatar: '/assets/logos/ethereum.svg',
        name: 'Ethereum'
      },
      lot:'25',
      marketCap: '0.012',
      volume: '2000',
      circulatingSupply: '115 million ETH',
      allTimeHigh: '$4,879.68',
      website: 'https://ethereum.org/',
      whitepaper: 'https://ethereum.org/whitepaper/',
      founders: ['Vitalik Buterin', 'Gavin Wood'],
      yearFounded: 2015,
      socialMedia: {
        twitter: 'https://twitter.com/ethereum',
        reddit: 'https://www.reddit.com/r/ethereum/'
      },
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Price',
            data: [50000, 55000, 60000, 65000, 70000, 75000], // Sample data points
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    },
    {
      id: 3,
      name: 'Cardano',
      description: 'A blockchain platform for changemakers, innovators, and visionaries, with the tools and technologies required to create possibility for the many, as well as the few, and bring about positive global change.',
      currentRate: '$1.50',
      cryptoId: 'ADA789',
      additionalDetail: 'Some additional detail about Cardano',
      currency: {
        id: 'unique_id_for_cardano',
        avatar: '/assets/logos/cardano.svg',
        name: 'Cardano'
      },
      lot:'25',
      marketCap: '1.256',
      volume: '5500',
      circulatingSupply: '32 billion ADA',
      allTimeHigh: '$3.10',
      website: 'https://cardano.org/',
      whitepaper: 'https://docs.cardano.org/en/latest/',
      founders: ['Charles Hoskinson'],
      yearFounded: 2017,
      socialMedia: {
        twitter: 'https://twitter.com/cardano',
        reddit: 'https://www.reddit.com/r/cardano/'
      },
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Price',
            data: [50000, 55000, 60000, 65000, 70000, 75000], // Sample data points
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    },
    {
      id: 4,
      name: 'Ripple',
      description: 'A digital payment protocol that allows fast, frictionless cross-border transactions with negligible fees.',
      currentRate: '$1.00',
      cryptoId: 'XRP321',
      additionalDetail: 'Some additional detail about Ripple',
      currency: {
        id: 'unique_id_for_ripple',
        avatar: '/assets/logos/ripple.svg',
        name: 'Ripple'
      },
      lot:'25',
      marketCap: '0.044',
      volume: '1200',
      circulatingSupply: '45 billion XRP',
      allTimeHigh: '$3.84',
      website: 'https://ripple.com/',
      whitepaper: 'https://ripple.com/files/ripple_consensus_whitepaper.pdf',
      founders: ['Chris Larsen', 'Jed McCaleb'],
      yearFounded: 2012,
      socialMedia: {
        twitter: 'https://twitter.com/ripple',
        reddit: 'https://www.reddit.com/r/Ripple/'
      },
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Price',
            data: [50000, 55000, 60000, 65000, 70000, 75000], // Sample data points
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    },
    {
      id: 5,
      name: 'Litecoin',
      description: 'A peer-to-peer cryptocurrency and open-source software project released under the MIT/X11 license.',
      currentRate: '$200',
      cryptoId: 'LTC654',
      additionalDetail: 'Some additional detail about Litecoin',
      currency: {
        id: 'unique_id_for_litecoin',
        avatar: '/assets/logos/litecoin.svg',
        name: 'Litecoin'
      },
      lot:'25',
      marketCap: '0.124',
      volume: '1000',
      circulatingSupply: '66 million LTC',
      allTimeHigh: '$360.66',
      website: 'https://litecoin.org/',
      whitepaper: 'https://litecoin.org/pdf/litecoin-whitepaper.pdf',
      founders: ['Charlie Lee'],
      yearFounded: 2011,
      socialMedia: {
        twitter: 'https://twitter.com/LitecoinProject',
        reddit: 'https://www.reddit.com/r/litecoin/'
      },
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Price',
            data: [50000, 55000, 60000, 65000, 70000, 75000], // Sample data points
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    },
    {
      id: 6,
      name: 'Chainlink',
      description: 'A decentralized oracle network that enables smart contracts to securely interact with external data sources.',
      currentRate: '$30',
      cryptoId: 'LINK987',
      additionalDetail: 'Some additional detail about Chainlink',
      currency: {
        id: 'unique_id_for_chainlink',
        avatar: '/assets/logos/logo-bitcoin.svg',
        name: 'Chainlink'
      },
      lot:'25',
      marketCap: '0.2165',
      volume: '2500',
      circulatingSupply: '400 million LINK',
      allTimeHigh: '$52.88',
      website: 'https://chain.link/',
      whitepaper: 'https://link.smartcontract.com/whitepaper',
      founders: ['Sergey Nazarov'],
      yearFounded: 2017,
      socialMedia: {
        twitter: 'https://twitter.com/chainlink',
        reddit: 'https://www.reddit.com/r/Chainlink/'
      },
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Price',
            data: [50000, 55000, 60000, 65000, 70000, 75000], // Sample data points
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    }
];
  


const CryptoMarketplacePage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Simulating data fetching with a delay
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setListings(dummyListings); // Set dummy listings
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Crypto Marketplace | Your Crypto Hub</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="xl">
          <Stack spacing={2}> {/* Increased spacing */}
            <Typography variant="h3">Crypto Marketplace</Typography>
            <Breadcrumbs separator="›">
              <Link href={paths.dashboard.index} passHref>
                <Typography color="inherit">Dashboard</Typography>
              </Link>
              <Typography color="text.primary">Crypto Marketplace</Typography>
            </Breadcrumbs>
          </Stack>
          <Typography variant="h4" sx={{ mt: 4 }}> {/* Added margin top */}
            Featured Listings
          </Typography>
          <Divider sx={{ my: 3 }} /> {/* Increased spacing */}
          <GridList2 projects={listings} />
        </Container>
      </Box>
    </>
  );
};

// Providing the layout for the page
CryptoMarketplacePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CryptoMarketplacePage;
