export async function loadHTML(container, path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    container.innerHTML = await res.text();
  } catch (e) {
    console.error(e);
    container.innerHTML = `<div>Failed to load ${path}</div>`;
  }
}