export function CatchRun(comp: any) {
  try {
    return comp();
  } catch (error) {
    console.error(error);
    return <div style={{ padding: "10px" }}>{String(error)}</div>;
  }
}
