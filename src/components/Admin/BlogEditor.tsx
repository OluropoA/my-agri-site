'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import slugify from 'slugify';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';

// Dynamically import markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface BlogEditorProps {
    postId?: string;
    initialData?: {
        title: string;
        content: string;
        slug: string;
        category: string;
        tags: string;
        coverImage?: string;
        published: boolean;
    };
}

const categories = [
    'Diary',
    'Sustainability',
    'Climate Change',
    'Technology',
    'Research',
    'Education',
    'Uncategorized',
];

export default function BlogEditor({ postId, initialData }: BlogEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [category, setCategory] = useState(initialData?.category || 'Uncategorized');
    const [tags, setTags] = useState(initialData?.tags || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [isSaving, setIsSaving] = useState(false);
    const [autoSlug, setAutoSlug] = useState(!initialData?.slug);

    // Auto-generate slug from title
    useEffect(() => {
        if (autoSlug && title) {
            setSlug(slugify(title, { lower: true, strict: true }));
        }
    }, [title, autoSlug]);

    const handleSave = async (shouldPublish: boolean) => {
        setIsSaving(true);

        try {
            const postData = {
                title,
                content,
                slug,
                category,
                tags,
                coverImage,
                published: shouldPublish,
            };

            const url = postId ? `/api/blog/${postId}` : '/api/blog';
            const method = postId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('API Error:', error);
                throw new Error(error.error || error.message || 'Failed to save post');
            }

            await response.json(); // Post saved successfully

            // Redirect to blog admin page
            router.push('/admin/blog');
            router.refresh();
        } catch (error) {
            console.error('Error saving post:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to save post';
            alert(`Error: ${errorMessage}\n\nCheck the browser console for more details.`);
        } finally {
            setIsSaving(false);
        }
    };



    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/admin/blog">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Posts
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {postId ? 'Edit Post' : 'New Post'}
                    </h1>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleSave(false)}
                        disabled={isSaving || !title || !content}
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                    </Button>
                    <Button
                        onClick={() => handleSave(true)}
                        disabled={isSaving || !title || !content}
                        className="bg-brand-green hover:bg-brand-green/90 text-white"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Publish
                    </Button>
                </div>
            </div>

            {/* Editor Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent text-lg font-semibold"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setAutoSlug(false);
                            }}
                            placeholder="post-url-slug"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent font-mono text-sm"
                        />
                        <Button
                            variant="outline"
                            onClick={() => {
                                setAutoSlug(true);
                                setSlug(slugify(title, { lower: true, strict: true }));
                            }}
                            disabled={!title}
                        >
                            Auto-generate
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        URL: /blog/{slug || 'your-post-slug'}
                    </p>
                </div>

                {/* Category & Tags */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="farming, sustainability, climate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
                    </div>
                </div>

                {/* Cover Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image URL
                    </label>
                    <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                </div>

                {/* Content Editor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content * (Markdown supported)
                    </label>
                    <div data-color-mode="light">
                        <MDEditor
                            value={content}
                            onChange={(val) => setContent(val || '')}
                            preview="edit"
                            height={400}
                            visibleDragbar={false}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Supports Markdown: **bold**, *italic*, # headers, - lists, [links](url), etc.
                    </p>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-3 pt-4 border-t">
                    <input
                        type="checkbox"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-4 h-4 text-brand-green focus:ring-brand-green border-gray-300 rounded"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-gray-700">
                        Publish immediately
                    </label>
                </div>
            </div>
        </div>
    );
}
