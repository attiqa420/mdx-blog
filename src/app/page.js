// /src/app/page.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">📚 Blog Posts</h1>
      <main>
        {posts.map((post) => (
          <div key={post.slug} className="mb-6">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl text-blue-600 hover:underline">
                {post.frontMatter.title}
              </h2>
            </Link>
            <p className="text-gray-600">{post.frontMatter.excerpt}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

async function getPosts() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir);

  return files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter } = matter(fileContent);

    return {
      slug,
      frontMatter,
    };
  });
}
