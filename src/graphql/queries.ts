import { gql } from "graphql-request";

export const GET_USER_NFTS = gql`
  query MyQuery($address: String) {
    users(where: { address_contains: $address }) {
      items {
        ownedNfts {
          items {
            nftTokenId
          }
        }
        address
        stakes {
          items {
            endTime
            nft {
              tokenId
            }
            contractStakeId
            unstakeTxId
          }
        }
      }
    }
  }
`;
