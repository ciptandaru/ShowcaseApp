import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      id
      name
      slug
      description
      price
      mainImg
      CategoryId
      AuthorMongoId
      Category {
        name
      }
      Images {
        imgUrl
      }
    }
  }
`;

export const GET_ONE_PRODUCT = gql`
  query Query($slug: String!) {
    getProduct(slug: $slug) {
      id
      name
      slug
      description
      price
      mainImg
      CategoryId
      AuthorMongoId
      Category {
        name
      }
      Images {
        imgUrl
      }
    }
  }
`;
