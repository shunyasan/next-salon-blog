export default async function fetcher(url: string) {
  const changed = encodeURI(url);
  const response = await fetch(changed);
  return response.json();
}
