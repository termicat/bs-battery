export function tranBIData(tables: any[]) {
  return tables.map((table) => {
    return {
      value: table.id,
      label: table.name,
      type: table.type,
      icon: table.type ? `icons/fts/${table.type}.svg` : "icons/table.svg",
      raw: table,
    };
  });
}
