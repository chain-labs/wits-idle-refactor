export interface NFTUserDataGQL {
  users: {
    items: {
      ownedNfts: { items: { nftTokenId: string }[] };
      address: string;
      stakes: {
        items: {
          endTime: string;
          nft: { tokenId: string };
          contractStakeId: string;
          unstakeTxId: string;
        }[];
      };
    }[];
  };
}
