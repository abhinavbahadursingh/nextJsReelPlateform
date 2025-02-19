export default async function Page() {
  const res = await fetch('https://api.vercel.app/blog', {
    next: { revalidate: 10 }, // Enables caching and revalidation (optional)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts'); // Handles fetch errors properly
  }

  const posts: { id: number; title: string }[] = await res.json(); // Type safety

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
