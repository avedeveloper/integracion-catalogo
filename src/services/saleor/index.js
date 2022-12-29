import axios from 'axios';
export default class SaleorService {
  constructor() {
    this.client = {
      link: axios.create({
        baseURL: 'https://ave.saleor.cloud/graphql/',
        headers: {
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
  async getProducts(size,address,cursor) {
    const query = `
    query{
      products(first:${size} ${cursor ==''? ``:`after:"${cursor}"`}){
        edges{
          node{
            id
            name
            isAvailable
            channel
            seoDescription
            description
            thumbnail{
              url
              alt
            }
            productType{
              id
              name
            }
            isAvailableForPurchase
            collections{
              id
              name
            }
            variants{
              id
              name
              stocks{
                id
                warehouse{
                  name
                  id
                }
                quantity
              }
              sku
              pricing(address:{city:"${address}"}){
                price{
                  currency
                  tax{
                    currency
                    amount
                  }
                  gross{
                    currency
                    amount
                  }
                  net{
                    currency
                    amount
                  }
                }
              }
            }
          }
          cursor
        }
        pageInfo{
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
    `;
    console.log(query)
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getProductsWithChannel(channel, size,address,cursor) {
    const query = `
    query{
      products(first:${size}  channel:"${channel}" ${cursor ==''? ``:`after:"${cursor}"`}){
        edges{
          node{
            id
            name
            isAvailable
            channel
            seoDescription
            description
            thumbnail{
              url
              alt
            }
            productType{
              id
              name
            }
            isAvailableForPurchase
            collections{
              id
              name
            }
            variants{
              id
              name
              stocks{
                id
                warehouse{
                  name
                  id
                }
                quantity
              }
              sku
              pricing(address:{city:"${address}"}){
                price{
                  currency
                  tax{
                    currency
                    amount
                  }
                  gross{
                    currency
                    amount
                  }
                  net{
                    currency
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
    `;
    console.log(query)
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getProduct(id,channel,address) {
    const query = `
    query{
      product(id: "${id}", channel: "${channel}") {
        id
        name
        thumbnail {
          url
          alt
        }
        description
        isAvailableForPurchase
        availableForPurchaseAt
        collections {
          id
          channel
          name
        }
        media {
          url
          alt
        }
        variants {
          id
          sku
          name
          stocks {
            id
            warehouse {
              id
              name
            }
            quantity
            quantityAllocated
          }
          media {
            url
            alt
          }
          pricing(address: {country: ${address}}) {
            price {
              currency
              gross {
                amount
              }
              net {
                amount
              }
              tax {
                amount
              }
            }
            onSale
          }
        }
      }
    }
    `;
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async isAvailableProductsByAddress(product) {
    const query = `
    query{
      product(id: "${product.id}", channel: "${product.channel}") {
        name
        isAvailable(address: { country: ${product.country} })
      }
    }
    `
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
                      collections: [${product.collection.map(e=>{return `"${e}"`})}]
                      name: "${product.name}"
                      rating: ${product.raiting}
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
    try {
      const response = await this.client.link.post('', { query });
      const { data } = response;
      return data;
    } catch (e) {
      console.log(e)
      return e;
    }
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
      product:"${image.id}"
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
  async setVariantProduct(variant,id) {
    const query = `
    mutation {
      productVariantCreate(input:{
        product:"${id}"
        name:"${variant.name}"
        sku:"${variant.sku}"
        attributes:[${variant.attributes.map(e=>`{id:"${e.id}" plainText:"${e.plainText}"}`)}]
        stocks:[${variant.stocks.map(e=>`{warehouse:"${e.warehouse}" quantity:${e.quantity}}`)}]
      }){
      productVariant{
        id
        name
      }
      errors{
        field
        message
      }
    }
  }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }

  async getProductsVariants(channel, size) {
    const query = `
    query{
      productVariants(first: ${size} channel:"${channel}"){
        edges{
          node{
            id
            name
            sku
            pricing{
              price{
                currency
                gross{
                  currency
                  amount
                }
                net{
                  currency
                  amount
                }
                tax{
                  currency
                  amount
                }
              }
            }
           
          }
        }
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }

  async setProductChannelListing(product) {
    const query =`
    mutation {
      productChannelListingUpdate(id: "${product.id}", input: 
        {updateChannels: 
          {channelId: "${product.channelId}"
            isAvailableForPurchase:true
            isPublished:true
          }
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
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }

  async setProductVariantChannelListing(variant,channelId) {
    const query =`
    mutation{
      productVariantChannelListingUpdate(id:"${variant.id}" input:{
        channelId:"${channelId}"
        price:${variant.price}
      })
      {
        variant{
          id
          name
        }
        errors{
          field
          message
        }
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
}
