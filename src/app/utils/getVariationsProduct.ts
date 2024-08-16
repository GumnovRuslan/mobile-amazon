import { IProduct } from "../types/productType"

interface IProductName {
  [brandName: string]: {
    name: string
    variations: string[]
    products: IProduct[]
  }
}

export const getVariationsProduct = (productsCategory: IProduct[]) => {
  const products = productsCategory
  let newArrayProduct: IProductName = {}
  const FindVariationRegex = /\d+\s?(GB|TB|Gb)/g
  const FingNameRegex = /\d+\s?(GB|TB|Gb)/g
  products.forEach((product: any) => {
    const productName = product.FullName.replace(FingNameRegex, '$')
    const variation = product.FullName.match(FindVariationRegex)

    if(!newArrayProduct[productName]) {
      newArrayProduct[productName] = {name: productName, variations: [variation], products: [product]}
    } else {
      newArrayProduct[productName].variations.push(variation)
      newArrayProduct[productName].products.push(product)
    }
  })
  const Array = []
  for (let item in newArrayProduct) {
    Array.push(newArrayProduct[item])
  }
  return Array
}