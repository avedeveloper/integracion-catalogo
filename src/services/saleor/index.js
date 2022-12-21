import axios from 'axios';
export default class SaleorService {
  constructor() {
    this.client = {
      link: axios.create({
        baseURL: 'https://ave.saleor.cloud/graphql/',
        headers:{
          'Content-Type': 'application/json',
        },
      }),
    };
  };

  async getToken() {
    const email = "davidfa9718@gmail.com"
    const password = "Saleor123+"
    const query = `
      mutation {
        tokenCreate(email: "${email}", password: "${password}") {
          token
          refreshToken
          csrfToken
          user {
            email
          }
          errors {
            field
            message
          }
        }
      }
    `;
    let token = await this.client.link.post('', { query }).then((response) => { return response.data.data.tokenCreate.token; })
    this.client.link.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return token;
  }
  async getProducts() {
    const query = `
    query{
      products(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    `;
    /*agregarle un header al axios */
    const response = await this.client.link.post('',{ query });
    const { data } = response;
    return data;
  }
  async getProduct(id) {
    const query = `
    query{
      product(id:"${id}") {
        id
        name
        thumbnail{
          url
        }
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getCategories() {
    const query = `
    query{
      categories(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getCategory(id) {
    const query = `
    query{
      category(id:"${id}") {
        id
        name
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getCollection(id) {
    const query = `
    query{
      collection(id:"${id}") {
        id
        name
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getCollections() {
    const query = `
    query{
      collections(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getAttribute(id) {
    const query = `
    query{
      attribute(id:"${id}") {
        id
        name
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getAttributes() {
    const query = `
    query{
      attributes(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getAttributeValues(id) {
    const query = `
    query{
      attribute(id:"${id}") {
        id
        name
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }

  async setProduct(product) {
    const query = `
    mutation { 
      productCreate(
                input: {
                      category: "${product.category}"
                      collections: "${product.collections}"
                      name: "${product.name}"
                      rating: ${product.rating}
                      metadata: ${product.metadata}
                      privateMetadata: ${product.privateMetadata}
                      productType: "${product.productType}"
                }) 
      {
        product {
            id
          }
        errors{
          field
          message
        }
        }
}
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async setCategory(category) {
    const query = `
    mutation { 
      categoryCreate(
                input: {
                      name: "${category.name}"
                }) 
      {
        category {
            id
          }
        errors{
          field
          message
        }
        }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async setCollection(collection) {
    const query = `
    mutation { 
      collectionCreate(
                input: {
                      name: "${collection.name}"
                }) 
      {
        collection {
            id
          }
        errors{
          field
          message
        }
        }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async setImageProduct(image) {
    const query = `
    productMediaCreate(input:{
      product:"${image.product}"
      mediaUrl:"${image.mediaUrl}"
    }){
  errors{
    field
    message
  }
  product{
    id
    name
  }
}`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async setChannel(channel) {
    const query = `mutation {
      channelCreate(
        input: {
          currencyCode: "${channel.currencyCode}"
          defaultCountry: ${channel.defaultCountry}
          name: "${channel.name}"
          slug: "${channel.slug}"
          stockSettings: ${channel.stockSettings}
        }
      ) {
        channel {
          id
          isActive
          name
          slug
          currencyCode
          defaultCountry {
            code
            country
          }
          stockSettings {
            allocationStrategy
          }
        }
        errors {
          code
          field
          message
        }
      }
    }`

    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async setVariantProduct(variant) {
    const query = `
    mutation { 
      productVariantCreate(
                input: {
                      product: "${variant.product}"
                      sku: "${variant.sku}"
                      stocks: ${variant.stocks}
                      trackInventory: ${variant.trackInventory}
                      weight: ${variant.weight}
                      metadata: ${variant.metadata}
                      privateMetadata: ${variant.privateMetadata}

                }) 
      {
        productVariant {
            id
          }
        errors{
          field
          message
        }
      }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    }
    async setPriceProduct(product) {
    const query = `{
      productVariant(id: "${product.id}", channel: "${product.channel}") {
        pricing(address: { country: ${product.country}) {
          price {
            net {
              ${product.amount}
            }
            gross {
              ${product.amount}
            }
            tax {
              ${product.amount}
            }
          }
        }
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }

}
