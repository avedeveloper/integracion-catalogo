export default class Product {
  constructor({sku=String, reference=String,name = String, category = String, collection = Array, productType = String, discount = Number, currency = String, id = String, raiting = Number, description = String, mediaUrl = String, variants = Array, channelId = String,metadata=[],attributes=[] }) {
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
  this.reference =reference?reference:""
  this.sku = sku?sku:reference
  this.metadata=metadata
  this.attributes=attributes
}
}