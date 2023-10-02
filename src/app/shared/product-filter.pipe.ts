import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: any[], searchTerm: string, filterField: string): any[] {
    if (!searchTerm) {
      return products;
    } 
    searchTerm = searchTerm.toLowerCase();
    return products.filter(product => product[filterField].toLowerCase().includes(searchTerm));
  }
}

// export class ProductFilterPipe implements PipeTransform {
//   transform(products: any[], searchTerm: string, selectedCategory: string): any[] {
//     if (!searchTerm && !selectedCategory) {
//       return products;
//     }
    
//     searchTerm = searchTerm.toLowerCase();
//     return products.filter(product => {
//       const isInCategory = !selectedCategory || product.category === selectedCategory;
//       const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm);
//       return isInCategory && matchesSearch;
//     });
//   }
// }