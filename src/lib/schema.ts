export const salesTableSchema = `
TABLE: sales
- sale_id: integer (primary key)
- item_id: integer (foreign key to items)
- sale_date: date
- quantity: integer
- total_price: float

TABLE: items
- item_id: integer (primary key)
- name: text
- category: text
- price: float
`;
