export const ROUTE_PATHS = { 

   products: 'products', // страница для справочника товаров 
    
   individuals: 'individuals', // страница для справочника физ. лиц 
    
   organizations: 'organizations', // страница для справочника организаций 
    
   proxy: { 
    
    list: 'proxy',// страница списка документов доверенность 
    
    proxy: 'proxy/:id', // страница конкретного документа доверенности со списком товаров  
    
   }, 
    
   create: 'create', // страница записи документа авансовый отчёт

   adrep: { 
    
      list2: 'adrep',// страница списка документов авансовый отчёт
      
      adrep: 'adrep/:id', // страница конкретного документа авансового отчёта 
      
   }, 
      
   create2: 'create2', // страница записи документа авансового отчёта 
    
 } 