export interface NFTUserDataGQL {
  users: {
    items: {
      ownedNfts: {
        items: { nftTokenId: string; nftContractAddress: `0x${string}` }[];
      };
      address: string;
      stakes: {
        items: {
          endTime: string;
          nft: { tokenId: string };
          contractStakeId: string;
          unstakeTxId: string;
          nftContract: {
            contract: string;
          };
          duration: {
            duration: string;
          };
        }[];
      };
    }[];
  };
}
