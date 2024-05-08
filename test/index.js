const Parser = require('js-sql-parser');

function replaceFieldNames(query, fieldReplacements, tableReplacements) {
  const ast = typeof query === 'string' ? Parser.parse(query) : query;

  // console.log(JSON.stringify(ast));
  const tableAliasMap = {};

  function traverseTableName(node) {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'SubQuery') {
      // console.log(JSON.stringify(node));
      node.value = replaceFieldNames(node.value, fieldReplacements, tableReplacements)
    }

    // 处理表别名
    if (node.type === 'TableFactor') {
      if (node.alias && node.alias.value) {
        tableAliasMap[node.alias.value] = node.value.value;
        node.value.value = tableReplacements[node.value.value] || node.value.value;
      } else {
        tableAliasMap[node.value.value] = node.value.value;
        node.value.value = tableReplacements[node.value.value] || node.value.value;
      }
    }


    // 遍历子节点
    Object.keys(node).forEach(key => {
      if (typeof node[key] === 'object') {
        traverseTableName(node[key], node);
      }
    });
  }

  function traverse(node) {
    if (!node || typeof node !== 'object') return;

    // 处理表别名
    if (node.type === 'TableFactor') {
      return;
    }

    // 处理字段名
    if (node.type === 'Identifier') {
      // console.log(node);
      if (node.value.includes('.')) {
        const [tableAlias, columnName] = node.value.split('.');
        const actualTable = tableAliasMap[tableAlias];
        const newColumnName = fieldReplacements[actualTable] && fieldReplacements[actualTable][columnName];
        // console.log(JSON.stringify({ tableAlias, columnName, actualTable, newColumnName, node }));
        if (newColumnName) {
          const tableMap = tableReplacements[tableAlias] || tableAlias;
          node.value = `${tableMap}.${newColumnName}`;
        }
      } else {
        Object.keys(fieldReplacements).some(table => {
          const mapTable = tableReplacements[table] || table;
          const newColumnName = fieldReplacements[table][node.value];
          if (newColumnName) {
            node.value = `${mapTable}.${newColumnName}`;
            return true;
          }
        });
      }
    }

    // 遍历子节点
    Object.keys(node).forEach(key => {
      if (typeof node[key] === 'object') {
        traverse(node[key]);
      }
    });
  }

  traverseTableName(ast)
  // console.log(JSON.stringify(ast));
  traverse(ast);

  return ast;
}

{
  const query = 'SELECT t.field1, t.field2 FROM (select table1.field1, table1.field2 from table1 where table1.field1 = "22") as t';
  const fieldReplacements = {
    'table1': {
      'field1': 'fa1',
      'field2': 'fa2',
    },
    'table2': {
      'field1': 'fb1',
      'field2': 'fb2'
    }
  };

  const tableNameReplacements = {
    'table1': 't1',
    'table2': 't2'
  }

  const modifiedQuery = replaceFieldNames(query, fieldReplacements, tableNameReplacements);
  console.log(Parser.stringify(modifiedQuery));
}

// {
//   const query = 'SELECT a.field2, b.field2 FROM table1 as a join table2 as b on a.field1 = b.field1';
//   const fieldReplacements = {
//     'table1': {
//       'field1': 'fa1',
//       'field2': 'fa2',
//     },
//     'table2': {
//       'field1': 'fb1',
//       'field2': 'fb2'
//     }
//   };

//   const tableNameReplacements = {
//     'table1': 't1',
//     'table2': 't2'
//   }

//   const modifiedQuery = replaceFieldNames(query, fieldReplacements, tableNameReplacements);
//   console.log(modifiedQuery);
// }

// {
//   const query = 'SELECT a.field2, b.field2 FROM table1 as a, table2 as b WHERE a.field1 = b.field1';
//   const fieldReplacements = {
//     'table1': {
//       'field1': 'fa1',
//       'field2': 'fa2',
//     },
//     'table2': {
//       'field1': 'fb1',
//       'field2': 'fb2'
//     }
//   };

//   const tableNameReplacements = {
//     'table1': 't1',
//     'table2': 't2'
//   }

//   const modifiedQuery = replaceFieldNames(query, fieldReplacements, tableNameReplacements);
//   console.log(modifiedQuery);
// }

// {
//   const query = 'SELECT table1.field2, table2.field2 FROM table1, table2 WHERE table1.field1 = table2.field1';
//   const fieldReplacements = {
//     'table1': {
//       'field1': 'fa1',
//       'field2': 'fa2',
//     },
//     'table2': {
//       'field1': 'fb1',
//       'field2': 'fb2'
//     }
//   };

//   const tableNameReplacements = {
//     'table1': 't1',
//     'table2': 't2'
//   }

//   const modifiedQuery = replaceFieldNames(query, fieldReplacements, tableNameReplacements);
//   console.log(modifiedQuery);
// }

// {
//   const query = 'SELECT 查询, field2 FROM table1 WHERE field1 = "22"';
//   const fieldReplacements = {
//     'table1': {
//       '查询': 'fa1',
//       'field2': 'fa2',
//     },
//     'table2': {
//       'field1': 'fb1',
//       'field2': 'fb2'
//     }
//   };

//   const tableNameReplacements = {
//     'table1': 't1',
//     'table2': 't2'
//   }

//   const modifiedQuery = replaceFieldNames(query, fieldReplacements, tableNameReplacements);
//   console.log(modifiedQuery);
// }

// {
//   const query = 'select 地址 from tbl5vY3odqyXy5fs';
//   const fieldReplacements = {
//     'tbl5vY3odqyXy5fs': {
//       '地址': 'fa1',
//     }
//   };

//   const tableNameReplacements = {
//     'table1': 't1',
//   }

//   const modifiedQuery = replaceFieldNames(query, fieldReplacements, tableNameReplacements);
//   console.log(modifiedQuery);
// }