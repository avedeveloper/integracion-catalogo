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
    const email = "castanolagustin@gmail.com"
    const password = "49sL3T4cASRLB6Y"
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
  async getProducts(size, address, cursor) {
    const query = `
    query{
      products(first:${size} ${cursor == '' ? `` : `after:"${cursor}"`}){
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
            metadata{
              key
              value
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

    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getProductsWithChannel(channel, size, address, cursor) {
    const query = `
    query{
      products(first:${size}  channel:"${channel}" ${cursor == '' ? `` : `after:"${cursor}"`}){
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
  
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getProduct(id, channel, address) {
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
        metadata{
          key
          value
        }
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
          metadata{
            key
            value
          }
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
      collection(slug:"${id}") {
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
                      collections: [${product.collection.map(e => { return `"${e}"` })}]
                      name: "${product.name}"
                      rating: ${product.raiting}
                      productType: "${product.productType}"
                     ${product.description ? `description: ${product.description}` : ``}
                      ${product.seoDescription ? `seoDescription: "${product.seoDescription}"` : ``}
                      ${product.seoTitle ? `seoTitle: "${product.seoTitle}"` : ``}
                      ${product.metadata ? `metadata: [${product.metadata.map(e => { return `{key:"${e.key}" value:"${e.value}"}` })}]` : ``}
                      ${product.attributes? `attributes:[${product.attributes.map(e=>{return `{id:"${e.id}" plainText:"${e.plainText}"}`})}]`:``}
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
      // console.log(query)
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
  async setVariantProduct(variant, id) {
    const query = `
    mutation {
      productVariantCreate(input:{
        product:"${id}"
        name:"${variant.name}"
        sku:"${variant.sku}"
        attributes:[${variant.attributes.map(e => `{id:"${e.id}" plainText:"${e.plainText}"}`)}]
        stocks:[${variant.stocks.map(e => `{warehouse:"${e.warehouse}" quantity:${e.quantity}}`)}]
        metadata:[${variant.metadata.map(e => `{key:"${e.key}" value:"${e.value}"}`)}]
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
    const query = `
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

  async setProductVariantChannelListing(variant, channelId) {
    const query = `
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
  async updateProduct(id, newProduct) {
    const query = `
    mutation {
      productUpdate(id:"${id}" input:{
        ${newProduct.name ? `name:"${newProduct.name}"` : ``}
        ${newProduct.description ? `description:"${newProduct.description}"` : ``}
        ${newProduct.category ? `category:"${newProduct.category}"` :``}
        ${newProduct.collection ? `collections:[${newProduct.collection.map(e => { return `"${e}"` })}]` : ``}
        ${newProduct.weight ? `weight:${newProduct.weight}` : ``}
        ${newProduct.slug ? `slug:"${newProduct.slug}"` : ``}
        ${newProduct.chargeTaxes ? `chargeTaxes:${newProduct.chargeTaxes}` : ``}
        ${newProduct.raiting ? `rating:${newProduct.raiting}` : ``}
      })
      {
        product{
          id
          name
          description
        }
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async updateVariantProduct(id, newVariant) {
  const query = `
  mutation{
    productVariantUpdate(id:"${id}" input:{
      ${newVariant.name ? `name:"${newVariant.name}"` : ``}
      ${newVariant.sku ? `sku:"${newVariant.sku}"` : ``}
      ${newVariant.attributes ? `attributes:[${newVariant.attributes.map(e => { return `{id:"${e.id}" plainText:"${e.plainText}"}` })}]` : ``}
      ${newVariant.stocks ? `stocks:[${newVariant.stocks.map(e => { return `{warehouse:"${e.warehouse}" quantity:${e.quantity}}` })}]` : ``}
      ${newVariant.weight ? `weight:${newVariant.weight}` : ``}
    }){
      productVariant{
        product{
          name
        }
      }
    }
  }`
  const response = await this.client.link.post('', { query });
  const { data } = response;
  return data;
}
  async createMediaProduct(product){
    const query=`
    mutation{
      productMediaCreate(input:{
        image:"${product.mediaUrl}"
        alt:"${product.name}"
        product:"${product.id}"
      }){
        product{
          id
          name
        }
        errors{
          message
          field
        }
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;

  }
  async getCategorieBySlug(slug){
    const query=`
    query{
      category(slug:"${slug}"){
        id
        name
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data;
  }
  async getProductByReference(ref){
    const query=`
    {
      products(first:10 filter:{metadata:{key:"referencia" value: "${ref}"}}){
        edges{
          node{
            id
            name
            metadata{
              key
              value
            }
          }
        }
      }
    }
    `
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data
  }
  async getProductVariantBySKU(sku){
    const query = `
    {
      productVariant(sku:"${sku}"){
        id
        name
      }
    }`
    const response = await this.client.link.post('', { query });
    const { data } = response;
    return data
  }
}

