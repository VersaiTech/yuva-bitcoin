import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

export const cryptoNews = [
  {
    id: '1',
    author: {
        avatar: '/assets/avatars/avatar-jie-yan-song.png',
        name: 'Jie Yan Song'
      },
    category: 'Market Analysis',
    cover: '/assets/covers/bitcoin-all-time-high.jpg',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '4',
    shortDescription: 'Bitcoin reaches a new all-time high, driven by increased institutional adoption and market demand.',
    title: 'Bitcoin Surges to New All-Time High Amid Institutional Adoption'
  },
  {
    id: '2',
    author: {
        avatar: '/assets/avatars/avatar-jie-yan-song.png',
        name: 'Jie Yan Song'
      },
    category: 'Regulation',
    cover: '/assets/covers/crypto-regulation.jpg',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '5',
    shortDescription: 'Government X announces stricter regulations on cryptocurrency exchanges, impacting the market.',
    title: 'Government X Announces Stricter Regulations on Cryptocurrency Exchanges'
  },
  {
    id: '3',
    author: {
        avatar: '/assets/avatars/avatar-jie-yan-song.png',
        name: 'Jie Yan Song'
      },
    category: 'Blockchain Technology',
    cover: '/assets/covers/ethereum-upgrade.jpg',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '6',
    shortDescription: 'Ethereum 2.0 upgrade successfully implemented, promising enhanced scalability for the blockchain.',
    title: 'Ethereum 2.0 Upgrade Successfully Implemented, Promises Scalability'
  },
  {
    id: '4',
    author: {
        avatar: '/assets/avatars/avatar-jie-yan-song.png',
        name: 'Jie Yan Song'
      },
    category: 'DeFi',
    cover: '/assets/covers/defi-disruption.png',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '3',
    shortDescription: 'Decentralized Finance (DeFi) continues to disrupt traditional finance models, gaining momentum.',
    title: 'Decentralized Finance (DeFi) Continues to Disrupt Traditional Finance'
  },
];



export const cryptoNewsArticle = [
  {
    id: '1',
    author: {
      avatar: '/assets/avatars/avatar-jie-yan-song.png',
      name: 'Crypto Insider'
    },
    category: 'Cryptocurrency',
    content: `
## Bitcoin Hits All-Time High

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vel ex tincidunt cursus. Ut commodo tortor at efficitur accumsan. Integer sed consequat purus. Phasellus quis libero in nisl vestibulum fringilla at et sem. Duis vulputate justo ac nunc interdum venenatis. Curabitur vel fringilla justo, et dapibus urna.

Pellentesque non orci vel nisl condimentum sodales in a sem. Morbi eu mi ac odio euismod vestibulum. Vivamus in odio sit amet sem euismod scelerisque. Quisque auctor urna nec efficitur lacinia.

## Ethereum 2.0 Launch Success

Cras sit amet vehicula mi. Integer nec cursus risus. Etiam at nisi vel felis aliquet aliquet. Fusce vitae quam eu libero posuere auctor. Proin tempus est ut felis feugiat, vitae accumsan nulla facilisis.

Curabitur convallis urna et nisl tempus, at cursus augue vulputate. Sed euismod mauris ut ligula fermentum, ut venenatis lectus accumsan. Nulla facilisi. Aliquam id nisl sem.

\`\`\`javascript
// Sample code snippet
const bitcoinPrice = 70000;
console.log(\`Bitcoin is currently priced at $ \${bitcoinPrice}.\`);
\`\`\`

## Ripple's XRP Making Waves

Donec pharetra feugiat ipsum, vitae varius elit ultrices ac. Morbi vel justo vitae metus euismod ultricies. Vestibulum euismod eros ac metus tincidunt cursus. Duis vulputate velit id ipsum hendrerit, et laoreet velit commodo.

Nullam vitae risus nisl. Vivamus id ex eu purus cursus fringilla sit amet et justo. Integer et nulla in elit fermentum tristique.

## Crypto Regulation on the Horizon

Proin vel est ut elit sagittis iaculis. Fusce nec tortor sit amet odio scelerisque fringilla vitae at libero. Phasellus sit amet laoreet tortor. Ut nec nunc non justo convallis tincidunt.

Curabitur ac libero sed libero fermentum ullamcorper vel eu velit. Duis nec eros vel mauris fermentum dignissim in eget arcu. Phasellus feugiat lacinia justo, id posuere nunc ultricies vel.
`,
    cover: '/assets/covers/crypto-news-1.jpg',
    publishedAt: subMinutes(subSeconds(now, 16), 45).getTime(),
    readTime: '3 min',
    shortDescription: 'Bitcoin Soars to New Heights, Surpassing $70,000 Amid Increased Institutional Interest',
    title: 'Bitcoin Hits All-Time High'
  },
  {
    id: '2',
    author: {
      avatar: '/assets/avatars/avatar-omar-darboe.png',
      name: 'Blockchain Enthusiast'
    },
    category: 'Market Analysis',
    content: `
## Ethereum 2.0 Launch Success

Cras sit amet vehicula mi. Integer nec cursus risus. Etiam at nisi vel felis aliquet aliquet. Fusce vitae quam eu libero posuere auctor. Proin tempus est ut felis feugiat, vitae accumsan nulla facilisis.

Curabitur convallis urna et nisl tempus, at cursus augue vulputate. Sed euismod mauris ut ligula fermentum, ut venenatis lectus accumsan. Nulla facilisi. Aliquam id nisl sem.

\`\`\`javascript
// Sample code snippet
const ethereumPrice = 3000;
console.log(\`Ethereum is currently priced at $ \${ethereumPrice}.\`);
\`\`\`

## Cardano's ADA: A Rising Star

Vivamus id ex eu purus cursus fringilla sit amet et justo. Integer et nulla in elit fermentum tristique. Sed et orci vel ex tincidunt cursus. Ut commodo tortor at efficitur accumsan. Integer sed consequat purus. Phasellus quis libero in nisl vestibulum fringilla at et sem. Duis vulputate justo ac nunc interdum venenatis.

\`\`\`javascript
// Sample code snippet
const cardanoPrice = 2;
console.log(\`Cardano's ADA is currently priced at $ \${cardanoPrice}.\`);
\`\`\`

## Solana: The Next Big Thing?

Vestibulum euismod eros ac metus tincidunt cursus. Duis vulputate velit id ipsum hendrerit, et laoreet velit commodo.

Nullam vitae risus nisl. Donec pharetra feugiat ipsum, vitae varius elit ultrices ac. Morbi vel justo vitae metus euismod ultricies.
`,
    cover: '/assets/covers/crypto-news-2.png',
    publishedAt: subHours(subMinutes(subSeconds(now, 29), 51), 6).getTime(),
    readTime: '4 min',
    shortDescription: 'Ethereum 2.0 Upgrade Successfully Implemented, Bringing Scalability Improvements',
    title: 'Ethereum 2.0 Launch Success'
  },
  {
    id: '3',
    author: {
      avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
      name: 'Crypto Analyst'
    },
    category: 'Altcoins',
    content: `
  ## Ripples XRP Making Waves
  
  Donec pharetra feugiat ipsum, vitae varius elit ultrices ac. Morbi vel justo vitae metus euismod ultricies. Vestibulum euismod eros ac metus tincidunt cursus. Duis vulputate velit id ipsum hendrerit, et laoreet velit commodo.
  
  Nullam vitae risus nisl. Vivamus id ex eu purus cursus fringilla sit amet et justo. Integer et nulla in elit fermentum tristique.
  
  \`\`\`javascript
  // Sample code snippet
  const xrpPrice = 1.5;
  console.log(\`Ripples XRP is currently priced at $ \${xrpPrice}.\`);
  \`\`\`
  
  ## Cardano's ADA: A Rising Star
  
  Vivamus id ex eu purus cursus fringilla sit amet et justo. Integer et nulla in elit fermentum tristique. Sed et orci vel ex tincidunt cursus. Ut commodo tortor at efficitur accumsan. Integer sed consequat purus. Phasellus quis libero in nisl vestibulum fringilla at et sem. Duis vulputate justo ac nunc interdum venenatis.
  
  \`\`\`javascript
  // Sample code snippet
  const cardanoPrice = 2;
  console.log(\`Cardano's ADA is currently priced at $ \${cardanoPrice}.\`);
  \`\`\`
  
  ## Solana: The Next Big Thing?
  
  Vestibulum euismod eros ac metus tincidunt cursus. Duis vulputate velit id ipsum hendrerit, et laoreet velit commodo.
  
  Nullam vitae risus nisl. Donec pharetra feugiat ipsum, vitae varius elit ultrices ac. Morbi vel justo vitae metus euismod ultricies.
  `,
    cover: '/assets/covers/crypto-news-3.jpg',
    publishedAt: subHours(subMinutes(subSeconds(now, 6), 46), 16).getTime(),
    readTime: '2 min',
    shortDescription: 'Ripples XRP Gains Momentum as Partnerships Flourish in the Payments Industry',
    title: 'Ripples XRP Making Waves'
  },  
  {
    id: '4',
    author: {
      avatar: '/assets/avatars/avatar-iulia-albu.png',
      name: 'Blockchain Visionary'
    },
    category: 'Regulation',
    content: `
## Crypto Regulation on the Horizon

Proin vel est ut elit sagittis iaculis. Fusce nec tortor sit amet odio scelerisque fringilla vitae at libero. Phasellus sit amet laoreet tortor. Ut nec nunc non justo convallis tincidunt.

Curabitur ac libero sed libero fermentum ullamcorper vel eu velit. Duis nec eros vel mauris fermentum dignissim in eget arcu. Phasellus feugiat lacinia justo, id posuere nunc ultricies vel.

\`\`\`javascript
// Sample code snippet
const governmentAgencies = ['SEC', 'CFTC', 'FINRA'];
console.log(\`Government agencies exploring frameworks for cryptocurrency regulation: \${governmentAgencies.join(', ')}.\`);
\`\`\`

## Cardano's ADA: A Rising Star

Vivamus id ex eu purus cursus fringilla sit amet et justo. Integer et nulla in elit fermentum tristique. Sed et orci vel ex tincidunt cursus. Ut commodo tortor at efficitur accumsan. Integer sed consequat purus. Phasellus quis libero in nisl vestibulum fringilla at et sem. Duis vulputate justo ac nunc interdum venenatis.

\`\`\`javascript
// Sample code snippet
const cardanoPrice = 2;
console.log(\`Cardano's ADA is currently priced at $ \${cardanoPrice}.\`);
\`\`\`

## Solana: The Next Big Thing?

Vestibulum euismod eros ac metus tincidunt cursus. Duis vulputate velit id ipsum hendrerit, et laoreet velit commodo.
    
Nullam vitae risus nisl. Donec pharetra feugiat ipsum, vitae varius elit ultrices ac. Morbi vel justo vitae metus euismod ultricies.
`,
    cover: '/assets/covers/crypto-news-4.png',
    publishedAt: subDays(subHours(subMinutes(subSeconds(now, 52), 39), 7), 5).getTime(),
    readTime: '3 min',
    shortDescription: 'Government Agencies Explore Frameworks for Cryptocurrency Regulation Amidst Market Growth',
    title: 'Crypto Regulation on the Horizon'
  }
];