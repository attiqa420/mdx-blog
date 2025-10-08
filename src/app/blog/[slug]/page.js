import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import ClientMDX from '../../components/ClientMDX';


export async function generateStaticParams() {
  const files = fs.readdirSync('posts');
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

export default async function PostPage({ params }) {
  const slug = params.slug;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(fileContent);

  const mdxSource = await serialize(content);

  return (
    <div className="max-w-3xl mx-auto p-6 prose">
      <h1 className="text-4xl mb-4">{data.title}</h1>
      <ClientMDX source={mdxSource} />
    </div>
  );
}
