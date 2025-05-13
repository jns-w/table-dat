
type Transaction = {
  amount: number
  block_hash: string
  gas_consumed: number
  hash: string
  signer: string
  status: number
  timestamp: number
  transaction_fee: number
}

export const placeholderTransactions: Transaction[] = [
  {
    amount: 1.25,
    block_hash: "0x4b9a8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8",
    gas_consumed: 21000,
    hash: "0x7a3b2c9f8e4d5a6b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4",
    signer: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    status: 1,
    timestamp: Date.now() - 1000,
    transaction_fee: 0.00042
  },
  {
    amount: 0.5,
    block_hash: "0x5c0b9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9",
    gas_consumed: 35000,
    hash: "0x8b4c3d0a9f5e6b7c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5",
    signer: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    status: 0,
    timestamp: Date.now() - 3000,
    transaction_fee: 0.0007
  },
  {
    amount: 3.0,
    block_hash: "0x6d1c0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0",
    gas_consumed: 50000,
    hash: "0x9c5d4e1b0a2f3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8",
    signer: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    status: 1,
    timestamp: Date.now() - 40000,
    transaction_fee: 0.001
  },
  {
    amount: 0.1,
    block_hash: "0x7e2d1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1",
    gas_consumed: 25000,
    hash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    signer: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    status: 1,
    timestamp: Date.now() - 200000,
    transaction_fee: 0.0005
  },
  {
    amount: 5.75,
    block_hash: "0x8f3e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2",
    gas_consumed: 60000,
    hash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c",
    signer: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
    status: 1,
    timestamp: Date.now() - 500000,
    transaction_fee: 0.0012
  },
  {
    amount: 2.3,
    block_hash: "0x9a4f3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
    gas_consumed: 30000,
    hash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d",
    signer: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
    status: 0,
    timestamp: Date.now() - 600000,
    transaction_fee: 0.0006
  },
  {
    amount: 0.02,
    block_hash: "0xab5a4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4",
    gas_consumed: 20000,
    hash: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e",
    signer: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    status: 1,
    timestamp: 1739466600000,
    transaction_fee: 0.0004
  },
  {
    amount: 4.8,
    block_hash: "0xbc6b5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5",
    gas_consumed: 45000,
    hash: "0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f",
    signer: "0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c",
    status: 1,
    timestamp: 1739466500000,
    transaction_fee: 0.0009
  },
  {
    amount: 1.0,
    block_hash: "0xcd7c6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6",
    gas_consumed: 28000,
    hash: "0xf6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a",
    signer: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
    status: 0,
    timestamp: 1739466400000,
    transaction_fee: 0.00056
  },
  {
    amount: 6.2,
    block_hash: "0xde8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7",
    gas_consumed: 70000,
    hash: "0xa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b",
    signer: "0xad1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
    status: 1,
    timestamp: 1739466300000,
    transaction_fee: 0.0014
  },
  {
    amount: 0.8,
    block_hash: "0xef9e8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8",
    gas_consumed: 32000,
    hash: "0xb8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c",
    signer: "0xbe2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    status: 1,
    timestamp: 1739466200000,
    transaction_fee: 0.00064
  },
  {
    amount: 2.7,
    block_hash: "0xf0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a",
    gas_consumed: 40000,
    hash: "0xc9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d",
    signer: "0xcf3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a",
    status: 1,
    timestamp: 1739466100000,
    transaction_fee: 0.0008
  },
  {
    amount: 0.3,
    block_hash: "0xa1b8c9d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    gas_consumed: 22000,
    hash: "0xd0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e",
    signer: "0xda4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    status: 0,
    timestamp: 1739466000000,
    transaction_fee: 0.00044
  },
  {
    amount: 8.0,
    block_hash: "0xb2c9d0e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c",
    gas_consumed: 65000,
    hash: "0xe1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f",
    signer: "0xeb5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
    status: 1,
    timestamp: 1739465900000,
    transaction_fee: 0.0013
  },
  {
    amount: 1.9,
    block_hash: "0xc3d0e1f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d",
    gas_consumed: 38000,
    hash: "0xf2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a",
    signer: "0xfc6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    status: 1,
    timestamp: 1739465800000,
    transaction_fee: 0.00076
  },
  {
    amount: 0.05,
    block_hash: "0xd4e1f2a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e",
    gas_consumed: 23000,
    hash: "0xa3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b",
    signer: "0xad7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    status: 1,
    timestamp: 1739465700000,
    transaction_fee: 0.00046
  },
  {
    amount: 3.5,
    block_hash: "0xe5f2a3b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f",
    gas_consumed: 47000,
    hash: "0xb4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c",
    signer: "0xbe8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    status: 1,
    timestamp: 1739465600000,
    transaction_fee: 0.00094
  },
  {
    amount: 0.7,
    block_hash: "0xf6a3b4c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a",
    gas_consumed: 26000,
    hash: "0xc5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
    signer: "0xcf9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
    status: 0,
    timestamp: 1739465500000,
    transaction_fee: 0.00052
  },
  {
    amount: 2.0,
    block_hash: "0xa7b4c5d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b",
    gas_consumed: 42000,
    hash: "0xd6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e",
    signer: "0xda0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    status: 1,
    timestamp: 1739465400000,
    transaction_fee: 0.00084
  },
  {
    amount: 0.9,
    block_hash: "0xb8c5d6e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c",
    gas_consumed: 29000,
    hash: "0xe7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f",
    signer: "0xeb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c",
    status: 1,
    timestamp: 1739465300000,
    transaction_fee: 0.00058
  },
  {
    amount: 4.0,
    block_hash: "0xc9d6e7f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d",
    gas_consumed: 55000,
    hash: "0xf8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
    signer: "0xfc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d",
    status: 1,
    timestamp: 1739465200000,
    transaction_fee: 0.0011
  },
  {
    amount: 0.4,
    block_hash: "0xdae7f8a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e",
    gas_consumed: 24000,
    hash: "0xa9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    signer: "0xad3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e",
    status: 0,
    timestamp: 1739465100000,
    transaction_fee: 0.00048
  },
  {
    amount: 1.5,
    block_hash: "0xebf8a9b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f",
    gas_consumed: 36000,
    hash: "0xb0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
    signer: "0xbe4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f",
    status: 1,
    timestamp: 1739465000000,
    transaction_fee: 0.00072
  },
  {
    amount: 2.8,
    block_hash: "0xfca9b0c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a",
    gas_consumed: 48000,
    hash: "0xc1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d",
    signer: "0xcf5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a",
    status: 1,
    timestamp: 1739464900000,
    transaction_fee: 0.00096
  },
  {
    amount: 0.2,
    block_hash: "0xadb0c1d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b",
    gas_consumed: 21000,
    hash: "0xd2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
    signer: "0xda6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    status: 1,
    timestamp: 1739464800000,
    transaction_fee: 0.00042
  },
  {
    amount: 5.0,
    block_hash: "0xbec1d2e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c",
    gas_consumed: 60000,
    hash: "0xe3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
    signer: "0xeb7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
    status: 1,
    timestamp: 1739464700000,
    transaction_fee: 0.0012
  },
  {
    amount: 1.2,
    block_hash: "0xcfd2e3f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    gas_consumed: 34000,
    hash: "0xf4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a",
    signer: "0xfc8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    status: 0,
    timestamp: 1739464600000,
    transaction_fee: 0.00068
  },
  {
    amount: 3.2,
    block_hash: "0xdae3f4a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e",
    gas_consumed: 50000,
    hash: "0xa5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b",
    signer: "0xad9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
    status: 1,
    timestamp: 1739464500000,
    transaction_fee: 0.001
  },
  {
    amount: 0.6,
    block_hash: "0xebf4a5b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f",
    gas_consumed: 27000,
    hash: "0xb6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c",
    signer: "0xbe0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    status: 1,
    timestamp: 1739464400000,
    transaction_fee: 0.00054
  },
  {
    amount: 2.4,
    block_hash: "0xfca5b6c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a",
    gas_consumed: 43000,
    hash: "0xc7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d",
    signer: "0xcf1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    status: 1,
    timestamp: 1739464300000,
    transaction_fee: 0.00086
  }
];