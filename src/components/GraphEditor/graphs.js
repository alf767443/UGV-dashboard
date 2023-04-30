export var graphs = (graph = "") => JSON.stringify(
  {
    "dataSource": "CeDRI",
    "database": "CeDRI_UGV_dashboard",
    "collection": "graphs",
    "pipeline": [
      {
        '$match': {
          'name': graph
        }
      }, {
        '$limit': 1
      }
    ]
  }
);
