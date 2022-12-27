export default class Product {
  constructor({ name = String, category = String, collection = Array, productType = String, discount = Number, currency = String, id = String, raiting = Number, description = String, mediaUrl = String, variants = Array, channelId = String }) {
  this.name = name;
  this.category = category;
  this.collection = collection;
  this.productType = productType;
  this.discount = discount;
  this.currency = currency;
  this.productType = productType;
  this.raiting = raiting;
  this.description = description;
  this.mediaUrl = mediaUrl;
  this.variants = variants.length>0?variants:[];
  this.id = id;
  this.channelId = channelId
}
}