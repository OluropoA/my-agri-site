'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogEditor from '@/components/Admin/BlogEditor';
import AdminLayout from '@/components/Admin/AdminLayout';

export default function EditBlogPostPage() {
    const params = useParams();
    const postId = params.id as string;
    const [postData, setPostData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`/api/blog/${postId}`);
                if (!response.ok) throw new Error('Failed to fetch post');
                const data = await response.json();
                setPostData(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPost();
    }, [postId]);

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </AdminLayout>
        );
    }

    if (!postData) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-500">Post not found</div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <BlogEditor postId={postId} initialData={postData} />
        </AdminLayout>
    );
}
