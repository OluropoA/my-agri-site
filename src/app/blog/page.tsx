// components/Blog/BlogList.tsx
import React from 'react';

export function BlogList({ posts }) {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post.id} className="border-b pb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-sm text-gray-500">{post.category}</p>
          <div className="my-2">{post.content.slice(0, 150)}…</div>
          <a href={`/blog/${post.slug}`} className="text-blue-700 underline">Read more</a>
        </div>
      ))}
    </div>
  );
}
