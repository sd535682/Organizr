const rows = [
  { id: 1, c1: "Alpha", c2: "Bravo", c3: "Charlie", c4: "Delta", c5: "Echo" },
  { id: 2, c1: "Foxtrot", c2: "Golf", c3: "Hotel", c4: "India", c5: "Juliet" },
  { id: 3, c1: "Kilo", c2: "Lima", c3: "Mike", c4: "November", c5: "Oscar" },
  { id: 4, c1: "Papa", c2: "Quebec", c3: "Romeo", c4: "Sierra", c5: "Tango" },
  {
    id: 5,
    c1: "Uniform",
    c2: "Victor",
    c3: "Whiskey",
    c4: "X-ray",
    c5: "Yankee",
  },
];

export default function ResponsiveTable() {
  return (
    /* `overflow-x-auto` lets the table scroll on very narrow viewports */
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      {/* `divide-y` draws horizontal borders only; no vertical borders */}
      <table className="min-w-full table-auto text-sm divide-y divide-gray-200">
        {/* --- Table Head -------------------------------------------------- */}
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold tracking-wide">
              Board Name
            </th>
            <th className="px-4 py-3 font-semibold tracking-wide">
              Created by
            </th>
            <th className="px-4 py-3 font-semibold tracking-wide">
              Created on
            </th>
            <th className="px-4 py-3 font-semibold tracking-wide">Columns</th>
            <th className="px-4 py-3 font-semibold tracking-wide">Actions</th>
          </tr>
        </thead>

        {/* --- Table Body -------------------------------------------------- */}
        <tbody className="divide-y divide-gray-200">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">{r.c1}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.c2}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.c3}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.c4}</td>
              <td className="px-4 py-3 whitespace-nowrap">{r.c5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
