import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

export default class SaleorService {
  constructor() {
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: 'http://localhost:8000/graphql/',
        credentials: 'include',
      }),
      cache: new InMemoryCache(),
    });
  }
  // ...
}