import fs from 'fs';
import Role from '../model/Roles.js';
import Category from '../model/Categories.js';
import SubCategories from '../model/SubCategories.js';

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'moderator' }).save(),
      new Role({ name: 'admin' }).save(),
      new Role({ name: 'guest' }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
}

export const createCategories = async () => {
  try {
    const dictionary = JSON.parse(fs.readFileSync('./dictionary.json', 'utf8'));
    let actualCategory = null;
    let categories = [{
      category: null,
      subCategories: []
    }]
    for (let i = 0; i < dictionary.length; i++) {
      if (dictionary[i]['CATEGORIA AVE'] !== actualCategory) {
        actualCategory = dictionary[i]['CATEGORIA AVE'];
        categories.push({
          category: actualCategory,
          subCategories: []
        })
      }
      categories[categories.length - 1].subCategories.push(dictionary[i]['SUBCATEGORIA AVE'])
    }
    categories.shift();
    // console.log(categories);
    let aux = null
    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOne({ name: categories[i].category });
      if (!category) {
        const newCategory = new Category({ name: categories[i].category });

        for (let j = 0; j < categories[i].subCategories.length; j++) {
          const subCategory = await SubCategories.findOne({ name: categories[i].subCategories[j] });
          if (!subCategory) {
            await SubCategories.create({ name: categories[i].subCategories[j] });
          }
        }
        let subCategoriesfound = await SubCategories.find({ name: { $in: categories[i].subCategories } });
        newCategory.subcategories = subCategoriesfound.map(e => { if (e.name != '') { return { name: e.name, _id: e._id } } });
        await newCategory.save();

      } else {
        for (let j = 0; j < categories[i].subCategories.length; j++) {
          let subCategoryFound = await SubCategories.findOne({ name: categories[i].subCategories[j] });
          if (!subCategoryFound) {
            subCategoryFound = await SubCategories.create({ name: categories[i].subCategories[j] });
          }
          let res_db =  await Category.findOne({ subcategories: { _id:subCategoryFound._id } });
          if (!res_db && categories[i].subCategories[j] != '') {
            category.subcategories.push({ name: categories[i].subCategories[j], _id: subCategoryFound._id });
          }
        }
        await category.save();
      }
    }
  } catch (err) {
    console.error(err)
  }
}