import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

export default class SaleorService {
  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://ave.saleor.cloud/graphql/',
        credentials: 'include',
      }),
      cache: new InMemoryCache(),
    });
  }

  async getProducts() {
    const { data } = await this.client.query({
      query: gql`
        query {
          products(first: 10) {
            edges {
              node {
                id
                name
                pricing {
                  priceRange {
                    start {
                      gross {
                        amount
                        currency
                      }
                    }
                  }
                }
                thumbnail {
                  url
                }
              }
            }
          }
        }
      `,
    });
    return data.products.edges;
  }
}