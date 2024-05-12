export function tranBIData(tables: any[]) {
  return tables.map((table) => {
    return {
      value: table.id,
      label: table.name,
    };
  });
}
