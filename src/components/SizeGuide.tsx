export default function SizeGuide() {
  return (
    <div className="product-details__panel product-details__size-panel">
      <h2>Size Chart</h2>
      <SizeTable />
    </div>
  );
}

const getNumList = (start = 1, len = 43, duplicate?: number[]) => {
  let duplicateIndex = 0;
  return [...Array(len)].map((_, i) => {
    let num = start + i / 2 - duplicateIndex / 2;

    if (duplicate?.[duplicateIndex] == num - 0.5) {
      num -= 0.5;
      duplicateIndex++;
    }

    return num;
  });
};

const getNumList2 = (start = 1, len = 43, skip?: number[]) => {
  let skipIndex = 0;
  return [...Array(len)].map((_, i) => {
    let num = start + i / 2 + skipIndex / 2;

    while (skip?.[skipIndex] == num) {
      num += 0.5;
      skipIndex++;
    }

    return num;
  });
};

const SizeTable = () => {
  return (
    <div className="size-guide">
      <table>
        <thead>
          <tr>
            <th colSpan={2}></th>
            <th>Little Kids</th>
            <th colSpan={4}></th>
            <th>Big Kids</th>
            <th>Women</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" rowSpan={3}>
              US
            </th>
            <th scope="row">Men</th>
            {getNumList().map((num, i) => (
              <td key={"men:" + num + i}>{num}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">Women</th>
            {getNumList(2.5).map((num, i) => (
              <td key={"women:" + num + i}>{num}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">Kids</th>
            {getNumList(1, 19).map((num, i) => (
              <td key={"kids:" + num + i}>{num}Y</td>
            ))}
            {[...Array(24)].map((_) => (
              <td key={"kids:" + (20 + _)}></td>
            ))}
          </tr>
          <tr>
            <th scope="row">UK</th>
            <th
              scope="row"
              rowSpan={3}
              className="hidden-cell"
            ></th>
            {getNumList(0.5, undefined, [6]).map((num, i) => (
              <td key={"uk:" + num + i}>{num}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">JP</th>
            {getNumList(20, undefined, [23.5, 24]).map((num, i) => (
              <td key={"jp:" + num + i}>{num}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">EU</th>
            {getNumList2(
              32.5,
              undefined,
              [34.5, 37, 39.5, 41.5, 43.5, 46.5]
            ).map((num, i) => (
              <td key={"uk:" + num + i}>{num}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
