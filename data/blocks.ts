type Block = {
  base_fee: number;
  block_hash: string;
  gas_used: number;
  height: number;
  proposer: string;
  timestamp: number;
  tx_count: number;
}

export const placeholderBlocks: Block[] = [
  {
    base_fee: 20.5,
    block_hash: "0x4b9a8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8",
    gas_used: 12500000,
    height: 1000000,
    proposer: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    timestamp: Date.now(),
    tx_count: 150
  },
  {
    base_fee: 18.2,
    block_hash: "0x5c0b9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9",
    gas_used: 11000000,
    height: 1000001,
    proposer: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    timestamp: Date.now() - 10000,
    tx_count: 120
  },
  {
    base_fee: 22.0,
    block_hash: "0x6d1c0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0",
    gas_used: 14000000,
    height: 1000002,
    proposer: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    timestamp: Date.now() - 20000,
    tx_count: 180
  },
  {
    base_fee: 19.8,
    block_hash: "0x7e2d1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1",
    gas_used: 10500000,
    height: 1000003,
    proposer: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    timestamp: Date.now() - 30000,
    tx_count: 100
  },
  {
    base_fee: 21.3,
    block_hash: "0x8f3e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2",
    gas_used: 13000000,
    height: 1000004,
    proposer: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
    timestamp: Date.now() - 40000,
    tx_count: 160
  },
  {
    base_fee: 17.5,
    block_hash: "0x9a4f3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
    gas_used: 9500000,
    height: 1000005,
    proposer: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a",
    timestamp: Date.now() - 50000,
    tx_count: 90
  },
  {
    base_fee: 23.1,
    block_hash: "0xab5a4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4",
    gas_used: 14500000,
    height: 1000006,
    proposer: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    timestamp: Date.now() - 60000,
    tx_count: 200
  },
  {
    base_fee: 20.0,
    block_hash: "0xbc6b5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5",
    gas_used: 12000000,
    height: 1000007,
    proposer: "0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c",
    timestamp: 1739467130000,
    tx_count: 140
  },
  {
    base_fee: 18.9,
    block_hash: "0xcd7c6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6",
    gas_used: 10000000,
    height: 1000008,
    proposer: "0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
    timestamp: 1739467120000,
    tx_count: 110
  },
  {
    base_fee: 22.7,
    block_hash: "0xde8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7",
    gas_used: 13500000,
    height: 1000009,
    proposer: "0xad1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
    timestamp: 1739467110000,
    tx_count: 170
  },
  {
    base_fee: 19.2,
    block_hash: "0xef9e8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8",
    gas_used: 11500000,
    height: 1000010,
    proposer: "0xbe2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    timestamp: 1739467100000,
    tx_count: 130
  },
  {
    base_fee: 21.8,
    block_hash: "0xf0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b9c8d7e6f5a4b3c2d1e0f9a",
    gas_used: 12800000,
    height: 1000011,
    proposer: "0xcf3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a",
    timestamp: 1739467090000,
    tx_count: 155
  },
  {
    base_fee: 17.8,
    block_hash: "0xa1b8c9d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
    gas_used: 9800000,
    height: 1000012,
    proposer: "0xda4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    timestamp: 1739467080000,
    tx_count: 95
  },
  {
    base_fee: 23.5,
    block_hash: "0xb2c9d0e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c",
    gas_used: 15000000,
    height: 1000013,
    proposer: "0xeb5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
    timestamp: 1739467070000,
    tx_count: 210
  },
  {
    base_fee: 20.3,
    block_hash: "0xc3d0e1f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d",
    gas_used: 12200000,
    height: 1000014,
    proposer: "0xfc6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    timestamp: 1739467060000,
    tx_count: 145
  },
  {
    base_fee: 18.4,
    block_hash: "0xd4e1f2a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e",
    gas_used: 10800000,
    height: 1000015,
    proposer: "0xad7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    timestamp: 1739467050000,
    tx_count: 115
  },
  {
    base_fee: 22.2,
    block_hash: "0xe5f2a3b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f",
    gas_used: 13200000,
    height: 1000016,
    proposer: "0xbe8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    timestamp: 1739467040000,
    tx_count: 165
  },
  {
    base_fee: 19.0,
    block_hash: "0xf6a3b4c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a",
    gas_used: 10300000,
    height: 1000017,
    proposer: "0xcf9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a",
    timestamp: 1739467030000,
    tx_count: 105
  },
  {
    base_fee: 21.0,
    block_hash: "0xa7b4c5d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b",
    gas_used: 12700000,
    height: 1000018,
    proposer: "0xda0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    timestamp: 1739467020000,
    tx_count: 150
  },
  {
    base_fee: 18.0,
    block_hash: "0xb8c5d6e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c",
    gas_used: 9900000,
    height: 1000019,
    proposer: "0xeb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c",
    timestamp: 1739467010000,
    tx_count: 100
  },
  {
    base_fee: 23.0,
    block_hash: "0xc9d6e7f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d",
    gas_used: 14800000,
    height: 1000020,
    proposer: "0xfc2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d",
    timestamp: 1739467000000,
    tx_count: 195
  },
  {
    base_fee: 20.8,
    block_hash: "0xdae7f8a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e",
    gas_used: 12300000,
    height: 1000021,
    proposer: "0xad3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e",
    timestamp: 1739466990000,
    tx_count: 140
  },
  {
    base_fee: 19.5,
    block_hash: "0xebf8a9b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f",
    gas_used: 10900000,
    height: 1000022,
    proposer: "0xbe4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f",
    timestamp: 1739466980000,
    tx_count: 120
  },
  {
    base_fee: 22.5,
    block_hash: "0xfca9b0c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a",
    gas_used: 13400000,
    height: 1000023,
    proposer: "0xcf5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a",
    timestamp: 1739466970000,
    tx_count: 170
  },
  {
    base_fee: 18.7,
    block_hash: "0xadb0c1d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b",
    gas_used: 10100000,
    height: 1000024,
    proposer: "0xda6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    timestamp: 1739466960000,
    tx_count: 110
  },
  {
    base_fee: 21.5,
    block_hash: "0xbec1d2e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c",
    gas_used: 12900000,
    height: 1000025,
    proposer: "0xeb7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
    timestamp: 1739466950000,
    tx_count: 160
  },
  {
    base_fee: 19.3,
    block_hash: "0xcfd2e3f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    gas_used: 11400000,
    height: 1000026,
    proposer: "0xfc8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    timestamp: 1739466940000,
    tx_count: 130
  },
  {
    base_fee: 22.8,
    block_hash: "0xdae3f4a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e",
    gas_used: 13600000,
    height: 1000027,
    proposer: "0xad9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
    timestamp: 1739466930000,
    tx_count: 175
  },
  {
    base_fee: 20.1,
    block_hash: "0xebf4a5b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f",
    gas_used: 12100000,
    height: 1000028,
    proposer: "0xbe0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    timestamp: 1739466920000,
    tx_count: 145
  },
  {
    base_fee: 18.5,
    block_hash: "0xfca5b6c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a",
    gas_used: 10700000,
    height: 1000029,
    proposer: "0xcf1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    timestamp: 1739466910000,
    tx_count: 115
  }
];