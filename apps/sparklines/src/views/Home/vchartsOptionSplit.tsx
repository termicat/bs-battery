import deepmerge from "deepmerge";

export function vchartsOptionSplit(options: any) {
  const catesMap: any = {};
  let count = 0;
  const colors = options.color || [];
  for (let i = 0; i < options.data.values.length; i++) {
    const v = options.data.values[i];
    let ref = catesMap[v.cate];
    if (!ref) {
      const color = colors[count % colors.length] || "#000";
      count += 1;
      ref = deepmerge({}, options);
      console.log("ref", ref);

      ref.data.values = [];
      ref.color = [color];
      catesMap[v.cate] = ref;
    }
    ref.data.values.push(v);
  }
  return Object.keys(catesMap).map((k) => {
    return {
      title: k,
      option: catesMap[k],
    };
  });
}
