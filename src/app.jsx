import React, { useState, useEffect } from "react";

import Datatable from "./datatable";

require("es6-promise").polyfill();
require("isomorphic-fetch");

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["firstName", "lastName"]);

  useEffect(() => {
    fetch("https://devmentor.live/api/examples/contacts?api_key=b7c58b")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <div>
      <div>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column]
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
}
