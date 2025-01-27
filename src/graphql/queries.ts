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
        stakes(orderDirection: "desc", orderBy: "endTime") {
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

export const GET_ADVENTURE_DATA = gql`
  query Query(
    $where: userFilter
    $limit: Int
    $orderDirection: String
    $orderBy: String
    $after: String
    $stakesWhere2: stakeFilter
  ) {
    users(where: $where) {
      items {
        stakes(
          limit: $limit
          orderDirection: $orderDirection
          orderBy: $orderBy
          after: $after
          where: $stakesWhere2
        ) {
          items {
            startTime
            duration {
              duration
            }
            unstakeTxId
          }
          pageInfo {
            endCursor
          }
          totalCount
        }
      }
    }
  }
`;
